/**
 * Subscription Service
 * Serviço para gerenciar assinaturas e pagamentos
 */

export interface Subscription {
  id: string;
  userId: string;
  plan: 'free' | 'basic' | 'premium' | 'enterprise';
  status: 'active' | 'canceled' | 'expired' | 'past_due';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  stripeSubscriptionId?: string;
  createdAt: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  stripePriceId: string;
}

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Gratuito',
    price: 0,
    interval: 'month',
    features: [
      'Registro básico de peso',
      'Controle de medicações',
      '3 treinos por mês',
      'Suporte por email'
    ],
    stripePriceId: ''
  },
  {
    id: 'basic',
    name: 'Básico',
    price: 29.90,
    interval: 'month',
    features: [
      'Tudo do plano Gratuito',
      'Treinos ilimitados',
      'Dietas personalizadas',
      'Gráficos avançados',
      'Suporte prioritário'
    ],
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID || ''
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 49.90,
    interval: 'month',
    features: [
      'Tudo do plano Básico',
      'IA personalizada ilimitada',
      'Consultas com nutricionista',
      'Relatórios médicos',
      'Comunidade exclusiva',
      'Suporte 24/7'
    ],
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID || ''
  }
];

export class SubscriptionService {
  async getSubscription(userId: string): Promise<Subscription | null> {
    try {
      // TODO: Implementar busca no Supabase
      // const { data, error } = await supabase
      //   .from('subscriptions')
      //   .select('*')
      //   .eq('user_id', userId)
      //   .single();
      
      return {
        id: '1',
        userId,
        plan: 'free',
        status: 'active',
        currentPeriodStart: new Date().toISOString(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        cancelAtPeriodEnd: false,
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Get subscription error:', error);
      return null;
    }
  }

  async createCheckoutSession(userId: string, planId: string): Promise<{ url: string }> {
    try {
      // TODO: Implementar criação de sessão com Stripe
      // const response = await fetch('/api/payments', {
      //   method: 'POST',
      //   body: JSON.stringify({ action: 'create-checkout', userId, planId })
      // });
      
      return {
        url: 'https://checkout.stripe.com/example'
      };
    } catch (error) {
      console.error('Create checkout error:', error);
      throw new Error('Falha ao criar checkout');
    }
  }

  async cancelSubscription(subscriptionId: string): Promise<void> {
    try {
      // TODO: Implementar cancelamento com Stripe
      // await fetch('/api/payments', {
      //   method: 'POST',
      //   body: JSON.stringify({ action: 'cancel-subscription', subscriptionId })
      // });
      
      console.log('Subscription canceled:', subscriptionId);
    } catch (error) {
      console.error('Cancel subscription error:', error);
      throw new Error('Falha ao cancelar assinatura');
    }
  }

  getPlanById(planId: string): Plan | undefined {
    return PLANS.find(plan => plan.id === planId);
  }

  getAllPlans(): Plan[] {
    return PLANS;
  }
}

export const subscriptionService = new SubscriptionService();
