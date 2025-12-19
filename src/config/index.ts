/**
 * Config: Configurações da aplicação
 */

export const config = {
  app: {
    name: 'Health Slim Pro',
    description: 'Plataforma completa para saúde, fitness e bem-estar',
    version: '1.0.0',
    url: process.env.NEXT_PUBLIC_URL || 'http://localhost:3000',
  },

  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
    timeout: 30000, // 30 segundos
  },

  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  },

  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
    model: 'gpt-4',
  },

  // Configuração Keoto (plataforma de pagamento principal)
  keoto: {
    apiUrl: process.env.KEOTO_API_URL || 'https://api.keoto.com/v1',
    secretKey: process.env.KEOTO_SECRET_KEY || '',
    publishableKey: process.env.NEXT_PUBLIC_KEOTO_PUBLISHABLE_KEY || '',
    webhookSecret: process.env.KEOTO_WEBHOOK_SECRET || '',
  },

  // Stripe (mantido para compatibilidade/migração)
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
    secretKey: process.env.STRIPE_SECRET_KEY || '',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  },

  features: {
    enableAI: true,
    enablePayments: true,
    enableNotifications: true,
    enableAnalytics: false,
    paymentProvider: 'keoto', // 'keoto' ou 'stripe'
  },

  limits: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    maxWorkoutsPerDay: 10,
    maxMealsPerDay: 10,
  },

  pagination: {
    defaultLimit: 20,
    maxLimit: 100,
  },
} as const;

export type Config = typeof config;
