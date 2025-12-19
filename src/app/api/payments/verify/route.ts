import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { transaction_id, status } = body;

    if (!transaction_id) {
      return NextResponse.json({ error: 'transaction_id é obrigatório' }, { status: 400 });
    }

    // Buscar pagamento
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .select('*')
      .eq('transaction_id', transaction_id)
      .single();

    if (paymentError || !payment) {
      return NextResponse.json({ error: 'Pagamento não encontrado' }, { status: 404 });
    }

    // Atualizar status do pagamento
    const { error: updateError } = await supabase
      .from('payments')
      .update({ status })
      .eq('transaction_id', transaction_id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 400 });
    }

    // Se pagamento aprovado, ativar premium
    if (status === 'approved' || status === 'paid') {
      // Atualizar usuário para premium
      const { error: userError } = await supabase
        .from('users')
        .update({ is_premium: true })
        .eq('id', payment.user_id);

      if (userError) {
        return NextResponse.json({ error: userError.message }, { status: 400 });
      }

      // Criar/atualizar assinatura
      const { data: existingSub } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', payment.user_id)
        .single();

      if (existingSub) {
        // Atualizar assinatura existente
        await supabase
          .from('subscriptions')
          .update({ ativo: true })
          .eq('user_id', payment.user_id);
      } else {
        // Criar nova assinatura
        await supabase
          .from('subscriptions')
          .insert([
            {
              user_id: payment.user_id,
              ativo: true
            }
          ]);
      }

      return NextResponse.json({ 
        success: true, 
        message: 'Pagamento aprovado! Usuário agora é premium.',
        premium_activated: true
      }, { status: 200 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Status do pagamento atualizado',
      status
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const transaction_id = searchParams.get('transaction_id');

    if (!transaction_id) {
      return NextResponse.json({ error: 'transaction_id é obrigatório' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('transaction_id', transaction_id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
