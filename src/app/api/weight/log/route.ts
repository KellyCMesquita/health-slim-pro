import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_id, peso, data } = body;

    const { data: weightData, error } = await supabase
      .from('weight_logs')
      .insert([
        {
          user_id,
          peso,
          data: data || new Date().toISOString().split('T')[0]
        }
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      data: weightData[0],
      message: 'Peso registrado com sucesso!' 
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
      .from('weight_logs')
      .select('*')
      .eq('user_id', user_id)
      .order('data', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
