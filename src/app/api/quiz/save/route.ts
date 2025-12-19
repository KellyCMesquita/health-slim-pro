import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      user_id,
      idade,
      peso,
      altura,
      objetivo,
      nivel,
      tempo_diario,
      experiencia,
      caneta_usada,
      dose_atual,
      tempo_uso,
      efeitos
    } = body;

    // Calcular IMC
    const alturaMetros = altura / 100;
    const imc = peso / (alturaMetros * alturaMetros);

    const { data, error } = await supabase
      .from('quiz_results')
      .insert([
        {
          user_id,
          idade,
          peso,
          altura,
          objetivo,
          nivel,
          tempo_diario,
          experiencia,
          caneta_usada,
          dose_atual,
          tempo_uso,
          efeitos,
          imc: parseFloat(imc.toFixed(2))
        }
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      data: data[0],
      message: 'Quiz salvo com sucesso!' 
    }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
