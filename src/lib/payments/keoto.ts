/**
 * Cliente de Pagamentos (Keoto)
 * Configuração centralizada da plataforma Keoto
 * 
 * Documentação: https://docs.keoto.com
 */

import axios, { AxiosInstance } from 'axios';

// Tipos Keoto
export interface KeoToCheckoutSession {
  id: string;
  url: string;
  status: 'pending' | 'completed' | 'expired';
  amount: number;
  currency: string;
  customer_id: string;
  metadata?: Record<string, any>;
}

export interface KeoToSubscription {
  id: string;
  customer_id: string;
  plan_id: string;
  status: 'active' | 'cancelled' | 'past_due' | 'trialing';
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
}

export interface KeoToPayment {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'succeeded' | 'failed' | 'refunded';
  customer_id: string;
  subscription_id?: string;
  created_at: string;
}

export interface KeoToCustomer {
  id: string;
  email: string;
  name?: string;
  metadata?: Record<string, any>;
}

/**
 * Cliente Keoto
 */
class KeoToClient {
  private client: AxiosInstance;
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.KEOTO_SECRET_KEY || '';
    this.baseUrl = process.env.KEOTO_API_URL || 'https://api.keoto.com/v1';

    if (!this.apiKey) {
      console.warn('⚠️ KEOTO_SECRET_KEY não configurada');
    }

    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });
  }

  /**
   * Criar sessão de checkout
   */
  async createCheckoutSession(params: {
    planId: string;
    userId: string;
    userEmail: string;
    successUrl: string;
    cancelUrl: string;
    metadata?: Record<string, any>;
  }): Promise<KeoToCheckoutSession> {
    try {
      const response = await this.client.post('/checkout/sessions', {
        plan_id: params.planId,
        customer_id: params.userId,
        customer_email: params.userEmail,
        success_url: params.successUrl,
        cancel_url: params.cancelUrl,
        metadata: params.metadata || {},
      });

      return response.data;
    } catch (error: any) {
      console.error('Erro ao criar sessão Keoto:', error.response?.data || error.message);
      throw new Error('Falha ao criar sessão de pagamento');
    }
  }

  /**
   * Criar cliente
   */
  async createCustomer(params: {
    email: string;
    name?: string;
    userId: string;
    metadata?: Record<string, any>;
  }): Promise<KeoToCustomer> {
    try {
      const response = await this.client.post('/customers', {
        email: params.email,
        name: params.name,
        external_id: params.userId,
        metadata: params.metadata || {},
      });

      return response.data;
    } catch (error: any) {
      console.error('Erro ao criar cliente Keoto:', error.response?.data || error.message);
      throw new Error('Falha ao criar cliente');
    }
  }

  /**
   * Obter detalhes da assinatura
   */
  async getSubscription(subscriptionId: string): Promise<KeoToSubscription> {
    try {
      const response = await this.client.get(`/subscriptions/${subscriptionId}`);
      return response.data;
    } catch (error: any) {
      console.error('Erro ao buscar assinatura:', error.response?.data || error.message);
      throw new Error('Falha ao buscar assinatura');
    }
  }

  /**
   * Cancelar assinatura
   */
  async cancelSubscription(subscriptionId: string, immediate: boolean = false): Promise<KeoToSubscription> {
    try {
      const response = await this.client.post(`/subscriptions/${subscriptionId}/cancel`, {
        immediate,
      });

      return response.data;
    } catch (error: any) {
      console.error('Erro ao cancelar assinatura:', error.response?.data || error.message);
      throw new Error('Falha ao cancelar assinatura');
    }
  }

  /**
   * Listar assinaturas do cliente
   */
  async listCustomerSubscriptions(customerId: string): Promise<KeoToSubscription[]> {
    try {
      const response = await this.client.get('/subscriptions', {
        params: { customer_id: customerId },
      });

      return response.data.data || [];
    } catch (error: any) {
      console.error('Erro ao listar assinaturas:', error.response?.data || error.message);
      throw new Error('Falha ao listar assinaturas');
    }
  }

  /**
   * Listar todos os planos disponíveis
   */
  async listPlans(): Promise<any[]> {
    try {
      const response = await this.client.get('/plans', {
        params: { active: true },
      });

      return response.data.data || [];
    } catch (error: any) {
      console.error('Erro ao listar planos:', error.response?.data || error.message);
      throw new Error('Falha ao listar planos');
    }
  }

  /**
   * Obter detalhes de um pagamento
   */
  async getPayment(paymentId: string): Promise<KeoToPayment> {
    try {
      const response = await this.client.get(`/payments/${paymentId}`);
      return response.data;
    } catch (error: any) {
      console.error('Erro ao buscar pagamento:', error.response?.data || error.message);
      throw new Error('Falha ao buscar pagamento');
    }
  }

  /**
   * Listar histórico de pagamentos do cliente
   */
  async listCustomerPayments(customerId: string, limit: number = 20): Promise<KeoToPayment[]> {
    try {
      const response = await this.client.get('/payments', {
        params: {
          customer_id: customerId,
          limit,
        },
      });

      return response.data.data || [];
    } catch (error: any) {
      console.error('Erro ao listar pagamentos:', error.response?.data || error.message);
      throw new Error('Falha ao listar pagamentos');
    }
  }

  /**
   * Criar portal do cliente (gerenciar assinaturas)
   */
  async createCustomerPortal(customerId: string, returnUrl: string): Promise<{ url: string }> {
    try {
      const response = await this.client.post('/customer-portal', {
        customer_id: customerId,
        return_url: returnUrl,
      });

      return response.data;
    } catch (error: any) {
      console.error('Erro ao criar portal:', error.response?.data || error.message);
      throw new Error('Falha ao criar portal do cliente');
    }
  }

  /**
   * Verificar assinatura do webhook
   */
  verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
    try {
      const crypto = require('crypto');
      const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('hex');

      return signature === expectedSignature;
    } catch (error) {
      console.error('Erro ao verificar assinatura:', error);
      return false;
    }
  }
}

// Exportar instância única
export const keoto = new KeoToClient();

// Funções auxiliares para compatibilidade
export async function createCheckoutSession(params: {
  priceId: string;
  userId: string;
  userEmail: string;
  successUrl: string;
  cancelUrl: string;
}) {
  return keoto.createCheckoutSession({
    planId: params.priceId,
    userId: params.userId,
    userEmail: params.userEmail,
    successUrl: params.successUrl,
    cancelUrl: params.cancelUrl,
  });
}

export async function createCustomerPortal(customerId: string, returnUrl: string) {
  return keoto.createCustomerPortal(customerId, returnUrl);
}

export async function cancelSubscription(subscriptionId: string) {
  return keoto.cancelSubscription(subscriptionId, false);
}

export async function getSubscription(subscriptionId: string) {
  return keoto.getSubscription(subscriptionId);
}

export async function listPlans() {
  return keoto.listPlans();
}

export async function getPaymentStatus(paymentId: string) {
  const payment = await keoto.getPayment(paymentId);
  return payment.status;
}
