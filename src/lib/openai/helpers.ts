/**
 * OpenAI Helpers
 * Funções auxiliares para trabalhar com OpenAI
 */

import { openaiClient } from './client';

export async function generatePersonalizedContent(
  type: 'workout' | 'diet' | 'motivation',
  userContext: Record<string, any>
) {
  try {
    switch (type) {
      case 'workout':
        return await openaiClient.generateWorkout(userContext);
      
      case 'diet':
        return await openaiClient.generateDiet(userContext);
      
      case 'motivation':
        const response = await openaiClient.chatCompletion({
          messages: [
            {
              role: 'system',
              content: 'Você é um coach motivacional especializado em emagrecimento saudável.'
            },
            {
              role: 'user',
              content: `Crie uma mensagem motivacional personalizada para: ${JSON.stringify(userContext)}`
            }
          ]
        });
        return response.choices[0].message.content;
      
      default:
        throw new Error('Tipo de conteúdo não suportado');
    }
  } catch (error) {
    console.error('Generate content error:', error);
    throw error;
  }
}

export function parseAIResponse(response: string) {
  try {
    // Tentar extrair JSON da resposta
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return { content: response };
  } catch (error) {
    console.error('Parse AI response error:', error);
    return { content: response };
  }
}
