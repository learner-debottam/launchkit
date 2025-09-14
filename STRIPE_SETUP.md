# Stripe Subscription Setup Guide

## Environment Variables Required

Add the following to your `.env.local` file:

```bash
# Stripe Keys
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Stripe Price ID (after creating product)
STRIPE_PRICE_ID=price_your_price_id_here
```

## Stripe CLI Commands

If you have the Stripe CLI installed, run these commands to create a product and price:

```bash
# Install Stripe CLI first (if not installed)
# See: https://stripe.com/docs/stripe-cli

# Create a product
stripe products create --name="Premium Subscription" --description="Monthly premium plan"

# Create a price for the product (replace prod_XXX with your product ID)
stripe prices create \
  --product=prod_XXX \
  --unit-amount=999 \
  --currency=usd \
  --recurring="interval=month"

# Listen for webhooks locally (for testing)
stripe listen --forward-to http://localhost:3000/api/stripe/webhook
```

## Webhook Signature Verification

To test webhooks locally with the Stripe CLI:

```bash
# Install Stripe CLI
# Then run:
stripe login
stripe listen --forward-to http://localhost:3000/api/stripe/webhook

# The CLI will provide a webhook secret for local testing
# Copy the webhook secret and add it to your .env.local as STRIPE_WEBHOOK_SECRET
```

## Testing the Implementation

1. Start your development server:
```bash
npm run dev
```

2. In a separate terminal, start Stripe webhook forwarding:
```bash
stripe listen --forward-to http://localhost:3000/api/stripe/webhook
```

3. Use the provided webhook secret in your `.env.local` file.

4. Visit `/dashboard` and click "Subscribe Now" to test the checkout flow.
