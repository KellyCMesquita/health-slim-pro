/**
 * App Configuration
 * Configurações centralizadas da aplicação
 */

export const config = {
  app: {
    name: 'Health Pro',
    description: 'Plataforma completa para gerenciar seu tratamento de emagrecimento',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },

  api: {
    baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
    timeout: 30000,
  },

  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  },

  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
    model: 'gpt-4',
    maxTokens: 1000,
  },

  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
    secretKey: process.env.STRIPE_SECRET_KEY || '',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  },

  features: {
    enableAI: true,
    enablePayments: true,
    enableNotifications: true,
    enableAnalytics: true,
  },

  limits: {
    free: {
      workoutsPerMonth: 3,
      aiGenerationsPerMonth: 0,
    },
    basic: {
      workoutsPerMonth: -1, // unlimited
      aiGenerationsPerMonth: 10,
    },
    premium: {
      workoutsPerMonth: -1, // unlimited
      aiGenerationsPerMonth: -1, // unlimited
    },
  },
} as const;

export type AppConfig = typeof config;
