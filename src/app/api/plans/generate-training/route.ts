import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_id, objetivo, nivel } = body;

    // Buscar dados do quiz do usuário
    const { data: quizData } = await supabase
      .from('quiz_results')
      .select('*')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    const prompt = `
Você é um personal trainer especializado em pessoas que usam medicações para emagrecimento (Ozempic, Semaglutida, Wegovy, Saxenda, Mounjaro, Tirzepatida).

Crie um plano de treino personalizado para:
- Objetivo: ${objetivo}
- Nível: ${nivel}
- Idade: ${quizData?.idade || 'não informado'}
- Peso atual: ${quizData?.peso || 'não informado'}kg
- Altura: ${quizData?.altura || 'não informado'}cm
- Medicação: ${quizData?.caneta_usada || 'não informado'}
- Tempo disponível: ${quizData?.tempo_diario || 'não informado'}

IMPORTANTE: Considere que a pessoa pode ter fadiga e náuseas devido à medicação.

Retorne um JSON com esta estrutura:
{
  "semanas": [
    {
      "semana": 1,
      "dias": [
        {
          "dia": "Segunda",
          "treino": "Nome do treino",
          "exercicios": [
            {
              "nome": "Nome do exercício",
              "series": 3,
              "repeticoes": "12-15",
              "descanso": "60s",
              "observacoes": "Dicas importantes"
            }
          ],
          "duracao": "30-40 minutos",
          "intensidade": "Moderada"
        }
      ]
    }
  ],
  "dicas": ["dica 1", "dica 2", "dica 3"],
  "observacoes": "Observações gerais importantes"
}
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const plano = JSON.parse(completion.choices[0].message.content || '{}');

    // Salvar no Supabase
    const { data, error } = await supabase
      .from('plans_training')
      .insert([
        {
          user_id,
          objetivo,
          nivel,
          plano
        }
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      data: data[0],
      plano,
      message: 'Plano de treino gerado com sucesso!' 
    }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get('user_id');

    if (!user_id) {
      return NextResponse.json({ error: 'user_id é obrigatório' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('plans_training')
      .select('*')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
