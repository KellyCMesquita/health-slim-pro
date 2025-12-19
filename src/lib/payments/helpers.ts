/**
 * Payment Helpers
 * Funções auxiliares para pagamentos
 */

export function formatCurrency(amount: number, currency: string = 'BRL'): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function calculateProration(
  currentPlan: { price: number; daysRemaining: number },
  newPlan: { price: number }
): number {
  const dailyRate = currentPlan.price / 30;
  const credit = dailyRate * currentPlan.daysRemaining;
  const newCharge = newPlan.price - credit;
  return Math.max(0, newCharge);
}

export function getPlanFeatures(planId: string): string[] {
  const features: Record<string, string[]> = {
    free: [
      'Registro básico de peso',
      'Controle de medicações',
      '3 treinos por mês',
      'Suporte por email'
    ],
    basic: [
      'Tudo do plano Gratuito',
      'Treinos ilimitados',
      'Dietas personalizadas',
      'Gráficos avançados',
      'Suporte prioritário'
    ],
    premium: [
      'Tudo do plano Básico',
      'IA personalizada ilimitada',
      'Consultas com nutricionista',
      'Relatórios médicos',
      'Comunidade exclusiva',
      'Suporte 24/7'
    ]
  };

  return features[planId] || [];
}

export function isSubscriptionActive(status: string): boolean {
  return ['active', 'trialing'].includes(status);
}

export function getSubscriptionStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    active: 'Ativo',
    trialing: 'Em teste',
    canceled: 'Cancelado',
    past_due: 'Pagamento pendente',
    unpaid: 'Não pago',
    incomplete: 'Incompleto',
    incomplete_expired: 'Expirado'
  };

  return labels[status] || status;
}
