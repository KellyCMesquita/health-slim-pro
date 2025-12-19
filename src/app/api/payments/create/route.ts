import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_id, valor, transaction_id } = body;

    // Criar registro de pagamento
    const { data: paymentData, error: paymentError } = await supabase
      .from('payments')
      .insert([
        {
          user_id,
          status: 'pending',
          valor,
          transaction_id
        }
      ])
      .select();

    if (paymentError) {
      return NextResponse.json({ error: paymentError.message }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      data: paymentData[0],
      message: 'Pagamento criado com sucesso!' 
    }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
