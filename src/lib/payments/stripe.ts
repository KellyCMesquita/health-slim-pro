/**
 * Stripe Client
 * Cliente para integração com Stripe
 */

import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
});

export async function createCheckoutSession(params: {
  priceId: string;
  customerId?: string;
  customerEmail?: string;
  successUrl: string;
  cancelUrl: string;
}) {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: params.priceId,
          quantity: 1,
        },
      ],
      customer: params.customerId,
      customer_email: params.customerEmail,
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
    });

    return session;
  } catch (error) {
    console.error('Create checkout session error:', error);
    throw error;
  }
}

export async function createCustomer(params: {
  email: string;
  name?: string;
  metadata?: Record<string, string>;
}) {
  try {
    const customer = await stripe.customers.create({
      email: params.email,
      name: params.name,
      metadata: params.metadata,
    });

    return customer;
  } catch (error) {
    console.error('Create customer error:', error);
    throw error;
  }
}

export async function cancelSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });

    return subscription;
  } catch (error) {
    console.error('Cancel subscription error:', error);
    throw error;
  }
}

export async function getSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    return subscription;
  } catch (error) {
    console.error('Get subscription error:', error);
    throw error;
  }
}

export async function constructWebhookEvent(
  payload: string | Buffer,
  signature: string
) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  if (!webhookSecret) {
    throw new Error('Stripe webhook secret não configurado');
  }

  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      webhookSecret
    );
    return event;
  } catch (error) {
    console.error('Construct webhook event error:', error);
    throw error;
  }
}
