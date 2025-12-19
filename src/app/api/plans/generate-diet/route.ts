import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_id, objetivo } = body;

    // Buscar dados do quiz do usuário
    const { data: quizData } = await supabase
      .from('quiz_results')
      .select('*')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    const prompt = `
Você é um nutricionista especializado em pessoas que usam medicações para emagrecimento (Ozempic, Semaglutida, Wegovy, Saxenda, Mounjaro, Tirzepatida).

Crie um plano alimentar personalizado para:
- Objetivo: ${objetivo}
- Idade: ${quizData?.idade || 'não informado'}
- Peso atual: ${quizData?.peso || 'não informado'}kg
- Altura: ${quizData?.altura || 'não informado'}cm
- IMC: ${quizData?.imc || 'não informado'}
- Medicação: ${quizData?.caneta_usada || 'não informado'}
- Efeitos colaterais: ${quizData?.efeitos || 'não informado'}

IMPORTANTE: 
- Considere que a pessoa pode ter náuseas e perda de apetite
- Priorize alimentos leves e de fácil digestão
- Inclua proteínas para preservar massa muscular
- Evite alimentos muito gordurosos

Retorne um JSON com esta estrutura:
{
  "calorias_diarias": 1500,
  "macros": {
    "proteinas": "120g",
    "carboidratos": "150g",
    "gorduras": "50g"
  },
  "refeicoes": [
    {
      "horario": "07:00",
      "nome": "Café da manhã",
      "alimentos": [
        {
          "item": "Ovo mexido",
          "quantidade": "2 unidades",
          "calorias": 140
        }
      ],
      "total_calorias": 350,
      "dicas": "Coma devagar e mastigue bem"
    }
  ],
  "suplementos": ["Vitamina D", "Ômega 3"],
  "hidratacao": "2-3 litros de água por dia",
  "dicas_gerais": ["dica 1", "dica 2", "dica 3"],
  "alimentos_evitar": ["alimento 1", "alimento 2"]
}
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const dieta = JSON.parse(completion.choices[0].message.content || '{}');

    // Salvar no Supabase
    const { data, error } = await supabase
      .from('plans_diet')
      .insert([
        {
          user_id,
          objetivo,
          dieta
        }
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      data: data[0],
      dieta,
      message: 'Plano alimentar gerado com sucesso!' 
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
      .from('plans_diet')
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
