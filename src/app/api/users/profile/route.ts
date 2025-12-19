import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get('user_id');

    if (!user_id) {
      return NextResponse.json({ error: 'user_id é obrigatório' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('users')
      .select('id, email, name, is_premium, created_at')
      .eq('id', user_id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_id, name, email } = body;

    if (!user_id) {
      return NextResponse.json({ error: 'user_id é obrigatório' }, { status: 400 });
    }

    const updateData: any = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;

    const { data, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', user_id)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      data: data[0],
      message: 'Perfil atualizado com sucesso!' 
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
