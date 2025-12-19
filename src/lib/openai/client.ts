/**
 * OpenAI Client
 * Cliente para integração com OpenAI API
 */

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatCompletionOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  messages: ChatMessage[];
}

export class OpenAIClient {
  private apiKey: string;
  private baseURL = 'https://api.openai.com/v1';

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.OPENAI_API_KEY || '';
    
    if (!this.apiKey) {
      console.warn('OpenAI API Key não configurada');
    }
  }

  async chatCompletion(options: ChatCompletionOptions) {
    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: options.model || 'gpt-4',
          messages: options.messages,
          temperature: options.temperature || 0.7,
          max_tokens: options.maxTokens || 1000
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('OpenAI chat completion error:', error);
      throw error;
    }
  }

  async generateWorkout(userProfile: {
    goal: string;
    level: string;
    duration: number;
    equipment?: string[];
  }) {
    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: 'Você é um personal trainer especializado em criar treinos personalizados.'
      },
      {
        role: 'user',
        content: `Crie um treino personalizado com as seguintes características:
        - Objetivo: ${userProfile.goal}
        - Nível: ${userProfile.level}
        - Duração: ${userProfile.duration} minutos
        - Equipamentos disponíveis: ${userProfile.equipment?.join(', ') || 'Nenhum'}
        
        Retorne um JSON com: title, description, exercises (array com name, sets, reps, rest)`
      }
    ];

    const response = await this.chatCompletion({ messages });
    return response.choices[0].message.content;
  }

  async generateDiet(userProfile: {
    goal: string;
    restrictions?: string[];
    calories?: number;
  }) {
    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: 'Você é um nutricionista especializado em dietas para emagrecimento saudável.'
      },
      {
        role: 'user',
        content: `Crie um plano alimentar personalizado:
        - Objetivo: ${userProfile.goal}
        - Restrições: ${userProfile.restrictions?.join(', ') || 'Nenhuma'}
        - Calorias alvo: ${userProfile.calories || 'Não especificado'}
        
        Retorne um JSON com: meals (array com name, time, foods, calories)`
      }
    ];

    const response = await this.chatCompletion({ messages });
    return response.choices[0].message.content;
  }
}

export const openaiClient = new OpenAIClient();
