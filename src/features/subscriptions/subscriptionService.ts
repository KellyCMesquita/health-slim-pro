/**
 * Feature: Assinaturas
 * Serviço para gerenciamento de assinaturas e planos
 */

import { supabase } from '@/lib/supabase/client';
import { stripe } from '@/lib/payments/stripe';

export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  stripe_subscription_id?: string;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  created_at: string;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  stripe_price_id?: string;
}

/**
 * Listar planos disponíveis
 */
export async function getAvailablePlans(): Promise<Plan[]> {
  const { data, error } = await supabase
    .from('plans')
    .select('*')
    .eq('active', true)
    .order('price', { ascending: true });

  if (error) {
    console.error('Erro ao buscar planos:', error);
    return [];
  }

  return data || [];
}

/**
 * Buscar assinatura do usuário
 */
export async function getUserSubscription(
  userId: string
): Promise<Subscription | null> {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .single();

  if (error) {
    console.error('Erro ao buscar assinatura:', error);
    return null;
  }

  return data;
}

/**
 * Criar nova assinatura
 */
export async function createSubscription(
  userId: string,
  planId: string
): Promise<{ sessionUrl: string } | null> {
  try {
    // Buscar detalhes do plano
    const { data: plan } = await supabase
      .from('plans')
      .select('*')
      .eq('id', planId)
      .single();

    if (!plan || !plan.stripe_price_id) {
      throw new Error('Plano não encontrado');
    }

    // Criar sessão de checkout no Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: plan.stripe_price_id,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?canceled=true`,
      client_reference_id: userId,
      metadata: {
        user_id: userId,
        plan_id: planId,
      },
    });

    return { sessionUrl: session.url! };
  } catch (error) {
    console.error('Erro ao criar assinatura:', error);
    return null;
  }
}

/**
 * Cancelar assinatura
 */
export async function cancelSubscription(
  subscriptionId: string
): Promise<boolean> {
  try {
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('stripe_subscription_id')
      .eq('id', subscriptionId)
      .single();

    if (!subscription?.stripe_subscription_id) {
      throw new Error('Assinatura não encontrada');
    }

    // Cancelar no Stripe
    await stripe.subscriptions.update(subscription.stripe_subscription_id, {
      cancel_at_period_end: true,
    });

    // Atualizar no banco
    const { error } = await supabase
      .from('subscriptions')
      .update({ cancel_at_period_end: true })
      .eq('id', subscriptionId);

    if (error) throw error;

    return true;
  } catch (error) {
    console.error('Erro ao cancelar assinatura:', error);
    return false;
  }
}

/**
 * Reativar assinatura cancelada
 */
export async function reactivateSubscription(
  subscriptionId: string
): Promise<boolean> {
  try {
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('stripe_subscription_id')
      .eq('id', subscriptionId)
      .single();

    if (!subscription?.stripe_subscription_id) {
      throw new Error('Assinatura não encontrada');
    }

    // Reativar no Stripe
    await stripe.subscriptions.update(subscription.stripe_subscription_id, {
      cancel_at_period_end: false,
    });

    // Atualizar no banco
    const { error } = await supabase
      .from('subscriptions')
      .update({ cancel_at_period_end: false })
      .eq('id', subscriptionId);

    if (error) throw error;

    return true;
  } catch (error) {
    console.error('Erro ao reativar assinatura:', error);
    return false;
  }
}

/**
 * Verificar se usuário tem acesso premium
 */
export async function hasActivePremium(userId: string): Promise<boolean> {
  const subscription = await getUserSubscription(userId);
  return subscription?.status === 'active';
}
