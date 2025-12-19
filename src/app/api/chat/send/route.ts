import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_id, mensagem } = body;

    if (!mensagem) {
      return NextResponse.json({ error: 'Mensagem é obrigatória' }, { status: 400 });
    }

    // Buscar histórico de conversas do usuário (últimas 10)
    const { data: historico } = await supabase
      .from('chat_messages')
      .select('mensagem, resposta')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false })
      .limit(10);

    // Buscar dados do usuário para contexto
    const { data: quizData } = await supabase
      .from('quiz_results')
      .select('*')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    // Construir contexto
    const contexto = `
Você é um coach de saúde especializado em pessoas que usam medicações para emagrecimento (Ozempic, Semaglutida, Wegovy, Saxenda, Mounjaro, Tirzepatida).

DADOS DO USUÁRIO:
- Medicação: ${quizData?.caneta_usada || 'não informado'}
- Dose: ${quizData?.dose_atual || 'não informado'}
- Peso: ${quizData?.peso || 'não informado'}kg
- Objetivo: ${quizData?.objetivo || 'não informado'}
- Efeitos colaterais: ${quizData?.efeitos || 'não informado'}

Seja empático, motivador e forneça orientações práticas. Responda de forma clara e objetiva.
`;

    // Construir mensagens para a API
    const messages: any[] = [
      { role: 'system', content: contexto }
    ];

    // Adicionar histórico (invertido para ordem cronológica)
    if (historico && historico.length > 0) {
      historico.reverse().forEach((msg) => {
        messages.push({ role: 'user', content: msg.mensagem });
        messages.push({ role: 'assistant', content: msg.resposta });
      });
    }

    // Adicionar mensagem atual
    messages.push({ role: 'user', content: mensagem });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages,
      temperature: 0.8,
      max_tokens: 500,
    });

    const resposta = completion.choices[0].message.content || 'Desculpe, não consegui processar sua mensagem.';

    // Salvar no Supabase
    const { data, error } = await supabase
      .from('chat_messages')
      .insert([
        {
          user_id,
          mensagem,
          resposta
        }
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      data: data[0],
      resposta,
      message: 'Mensagem enviada com sucesso!' 
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
      .from('chat_messages')
      .select('*')
      .eq('user_id', user_id)
      .order('created_at', { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
