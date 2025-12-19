/**
 * Serviço de Assinaturas - Keoto
 * Gerenciamento de assinaturas usando a plataforma Keoto
 */

import { keoto } from '@/lib/payments/keoto';
import { createClient } from '@/lib/supabase/client';

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
}

export interface UserSubscription {
  id: string;
  userId: string;
  planId: string;
  status: 'active' | 'cancelled' | 'past_due' | 'trialing';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

/**
 * Criar sessão de checkout para nova assinatura
 */
export async function createSubscriptionCheckout(params: {
  userId: string;
  userEmail: string;
  planId: string;
  metadata?: Record<string, any>;
}): Promise<{ checkoutUrl: string; sessionId: string }> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
    
    const session = await keoto.createCheckoutSession({
      planId: params.planId,
      userId: params.userId,
      userEmail: params.userEmail,
      successUrl: `${baseUrl}/dashboard?payment=success`,
      cancelUrl: `${baseUrl}/dashboard?payment=cancelled`,
      metadata: params.metadata,
    });

    return {
      checkoutUrl: session.url,
      sessionId: session.id,
    };
  } catch (error: any) {
    console.error('Erro ao criar checkout:', error);
    throw new Error('Falha ao criar sessão de checkout');
  }
}

/**
 * Obter assinatura ativa do usuário
 */
export async function getUserSubscription(userId: string): Promise<UserSubscription | null> {
  try {
    const subscriptions = await keoto.listCustomerSubscriptions(userId);
    
    // Buscar assinatura ativa
    const activeSubscription = subscriptions.find(
      sub => sub.status === 'active' || sub.status === 'trialing'
    );

    if (!activeSubscription) {
      return null;
    }

    return {
      id: activeSubscription.id,
      userId: activeSubscription.customer_id,
      planId: activeSubscription.plan_id,
      status: activeSubscription.status,
      currentPeriodStart: activeSubscription.current_period_start,
      currentPeriodEnd: activeSubscription.current_period_end,
      cancelAtPeriodEnd: activeSubscription.cancel_at_period_end,
    };
  } catch (error: any) {
    console.error('Erro ao buscar assinatura:', error);
    return null;
  }
}

/**
 * Cancelar assinatura do usuário
 */
export async function cancelUserSubscription(
  subscriptionId: string,
  immediate: boolean = false
): Promise<boolean> {
  try {
    await keoto.cancelSubscription(subscriptionId, immediate);
    
    // Atualizar no banco local
    const supabase = createClient();
    await supabase
      .from('subscriptions')
      .update({
        status: 'cancelled',
        cancel_at_period_end: !immediate,
        cancelled_at: new Date().toISOString(),
      })
      .eq('id', subscriptionId);

    return true;
  } catch (error: any) {
    console.error('Erro ao cancelar assinatura:', error);
    throw new Error('Falha ao cancelar assinatura');
  }
}

/**
 * Listar todos os planos disponíveis
 */
export async function getAvailablePlans(): Promise<SubscriptionPlan[]> {
  try {
    const plans = await keoto.listPlans();
    
    return plans.map(plan => ({
      id: plan.id,
      name: plan.name,
      description: plan.description || '',
      price: plan.price / 100, // Converter de centavos
      currency: plan.currency || 'BRL',
      interval: plan.interval || 'month',
      features: plan.features || [],
    }));
  } catch (error: any) {
    console.error('Erro ao buscar planos:', error);
    throw new Error('Falha ao buscar planos disponíveis');
  }
}

/**
 * Verificar se usuário tem assinatura ativa
 */
export async function hasActiveSubscription(userId: string): Promise<boolean> {
  try {
    const subscription = await getUserSubscription(userId);
    return subscription !== null && subscription.status === 'active';
  } catch (error) {
    return false;
  }
}

/**
 * Criar portal do cliente para gerenciar assinatura
 */
export async function createManagementPortal(
  customerId: string
): Promise<{ portalUrl: string }> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
    const returnUrl = `${baseUrl}/dashboard/settings`;

    const portal = await keoto.createCustomerPortal(customerId, returnUrl);

    return {
      portalUrl: portal.url,
    };
  } catch (error: any) {
    console.error('Erro ao criar portal:', error);
    throw new Error('Falha ao criar portal de gerenciamento');
  }
}

/**
 * Obter histórico de pagamentos do usuário
 */
export async function getUserPaymentHistory(
  userId: string,
  limit: number = 20
): Promise<any[]> {
  try {
    const payments = await keoto.listCustomerPayments(userId, limit);
    
    return payments.map(payment => ({
      id: payment.id,
      amount: payment.amount / 100,
      currency: payment.currency,
      status: payment.status,
      date: payment.created_at,
      subscriptionId: payment.subscription_id,
    }));
  } catch (error: any) {
    console.error('Erro ao buscar histórico:', error);
    throw new Error('Falha ao buscar histórico de pagamentos');
  }
}
