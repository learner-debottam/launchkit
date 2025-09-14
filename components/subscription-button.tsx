'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function SubscriptionButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      
      // Redirect to Stripe Checkout
      const stripe = await loadStripe();
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error('Stripe checkout error:', error);
        }
      }
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadStripe = async () => {
    if (typeof window !== 'undefined' && !(window as any).Stripe) {
      const { loadStripe } = await import('@stripe/stripe-js');
      return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
    }
    return (window as any).Stripe;
  };

  return (
    <Button
      onClick={handleSubscribe}
      disabled={isLoading}
      className="w-full"
    >
      {isLoading ? 'Processing...' : 'Subscribe Now'}
    </Button>
  );
}
