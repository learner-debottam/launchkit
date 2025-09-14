import { NextRequest } from 'next/server';
import { POST } from '@/app/api/stripe/webhook/route';
import { createClient } from '@/lib/supabase/server';

// Mock dependencies
jest.mock('@/lib/supabase/server', () => ({
  createClient: jest.fn(),
}));

jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => ({
    webhooks: {
      constructEvent: jest.fn(),
    },
    subscriptions: {
      retrieve: jest.fn(),
    },
  }));
});

describe('Stripe Webhook Handler', () => {
  let mockSupabase: any;
  let mockStripe: any;

  beforeEach(() => {
    mockSupabase = {
      from: jest.fn().mockReturnThis(),
      upsert: jest.fn().mockResolvedValue({}),
      update: jest.fn().mockResolvedValue({}),
      eq: jest.fn().mockResolvedValue({}),
    };

    mockStripe = {
      webhooks: {
        constructEvent: jest.fn(),
      },
      subscriptions: {
        retrieve: jest.fn(),
      },
    };

    (createClient as jest.Mock).mockReturnValue(mockSupabase);
    require('stripe').mockImplementation(() => mockStripe);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if stripe-signature header is missing', async () => {
    const request = {
      headers: new Headers({}),
      text: jest.fn().mockResolvedValue('{}'),
    } as unknown as NextRequest;

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Missing stripe-signature header');
  });

  it('should return 400 if signature verification fails', async () => {
    const request = {
      headers: new Headers({ 'stripe-signature': 'invalid-signature' }),
      text: jest.fn().mockResolvedValue('{}'),
    } as unknown as NextRequest;

    mockStripe.webhooks.constructEvent.mockImplementation(() => {
      throw new Error('Invalid signature');
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid signature');
  });

  it('should handle checkout.session.completed event successfully', async () => {
    const request = {
      headers: new Headers({ 'stripe-signature': 'valid-signature' }),
      text: jest.fn().mockResolvedValue(JSON.stringify({
        type: 'checkout.session.completed',
        data: {
          object: {
            mode: 'subscription',
            subscription: 'sub_123',
            metadata: { userId: 'user_123' },
          },
        },
      })),
    } as unknown as NextRequest;

    mockStripe.webhooks.constructEvent.mockReturnValue({
      type: 'checkout.session.completed',
      data: {
        object: {
          mode: 'subscription',
          subscription: 'sub_123',
          metadata: { userId: 'user_123' },
        },
      },
    });

    mockStripe.subscriptions.retrieve.mockResolvedValue({
      id: 'sub_123',
      customer: 'cus_123',
      status: 'active',
      current_period_start: 1609459200,
      current_period_end: 1612137600,
      cancel_at_period_end: false,
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.received).toBe(true);
    expect(mockStripe.subscriptions.retrieve).toHaveBeenCalledWith('sub_123');
    expect(mockSupabase.from).toHaveBeenCalledWith('subscriptions');
    expect(mockSupabase.upsert).toHaveBeenCalled();
  });

  it('should handle invoice.payment_succeeded event successfully', async () => {
    const request = {
      headers: new Headers({ 'stripe-signature': 'valid-signature' }),
      text: jest.fn().mockResolvedValue(JSON.stringify({
        type: 'invoice.payment_succeeded',
        data: {
          object: {
            subscription: 'sub_123',
          },
        },
      })),
    } as unknown as NextRequest;

    mockStripe.webhooks.constructEvent.mockReturnValue({
      type: 'invoice.payment_succeeded',
      data: {
        object: {
          subscription: 'sub_123',
        },
      },
    });

    mockStripe.subscriptions.retrieve.mockResolvedValue({
      id: 'sub_123',
      status: 'active',
      current_period_start: 1609459200,
      current_period_end: 1612137600,
      cancel_at_period_end: false,
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.received).toBe(true);
    expect(mockStripe.subscriptions.retrieve).toHaveBeenCalledWith('sub_123');
    expect(mockSupabase.from).toHaveBeenCalledWith('subscriptions');
    expect(mockSupabase.update).toHaveBeenCalled();
  });

  it('should handle customer.subscription.updated event successfully', async () => {
    const request = {
      headers: new Headers({ 'stripe-signature': 'valid-signature' }),
      text: jest.fn().mockResolvedValue(JSON.stringify({
        type: 'customer.subscription.updated',
        data: {
          object: {
            id: 'sub_123',
            status: 'active',
            current_period_start: 1609459200,
            current_period_end: 1612137600,
            cancel_at_period_end: false,
          },
        },
      })),
    } as unknown as NextRequest;

    mockStripe.webhooks.constructEvent.mockReturnValue({
      type: 'customer.subscription.updated',
      data: {
        object: {
          id: 'sub_123',
          status: 'active',
          current_period_start: 1609459200,
          current_period_end: 1612137600,
          cancel_at_period_end: false,
        },
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.received).toBe(true);
    expect(mockSupabase.from).toHaveBeenCalledWith('subscriptions');
    expect(mockSupabase.update).toHaveBeenCalled();
  });

  it('should handle customer.subscription.deleted event successfully', async () => {
    const request = {
      headers: new Headers({ 'stripe-signature': 'valid-signature' }),
      text: jest.fn().mockResolvedValue(JSON.stringify({
        type: 'customer.subscription.deleted',
        data: {
          object: {
            id: 'sub_123',
            status: 'canceled',
          },
        },
      })),
    } as unknown as NextRequest;

    mockStripe.webhooks.constructEvent.mockReturnValue({
      type: 'customer.subscription.deleted',
      data: {
        object: {
          id: 'sub_123',
          status: 'canceled',
        },
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.received).toBe(true);
    expect(mockSupabase.from).toHaveBeenCalledWith('subscriptions');
    expect(mockSupabase.update).toHaveBeenCalled();
  });

  it('should handle unknown event types gracefully', async () => {
    const request = {
      headers: new Headers({ 'stripe-signature': 'valid-signature' }),
      text: jest.fn().mockResolvedValue(JSON.stringify({
        type: 'unknown.event.type',
        data: { object: {} },
      })),
    } as unknown as NextRequest;

    mockStripe.webhooks.constructEvent.mockReturnValue({
      type: 'unknown.event.type',
      data: { object: {} },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.received).toBe(true);
  });

  it('should return 500 if webhook handler fails', async () => {
    const request = {
      headers: new Headers({ 'stripe-signature': 'valid-signature' }),
      text: jest.fn().mockResolvedValue(JSON.stringify({
        type: 'checkout.session.completed',
        data: {
          object: {
            mode: 'subscription',
            subscription: 'sub_123',
            metadata: { userId: 'user_123' },
          },
        },
      })),
    } as unknown as NextRequest;

    mockStripe.webhooks.constructEvent.mockReturnValue({
      type: 'checkout.session.completed',
      data: {
        object: {
          mode: 'subscription',
          subscription: 'sub_123',
          metadata: { userId: 'user_123' },
        },
      },
    });

    mockStripe.subscriptions.retrieve.mockRejectedValue(new Error('Subscription not found'));

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Webhook handler failed');
  });
});
