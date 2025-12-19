/**
 * Webhooks API Route
 * Endpoint para receber webhooks de serviços externos
 * POST /api/webhooks - Processar eventos de webhooks
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const signature = request.headers.get('stripe-signature');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    // TODO: Validar assinatura do webhook
    /*
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        await request.text(),
        signature,
        webhookSecret
      );
    } catch (err) {
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      );
    }
    */

    // Processar diferentes tipos de eventos
    const eventType = body.type;

    switch (eventType) {
      case 'checkout.session.completed':
        // Pagamento concluído
        console.log('Checkout completed:', body.data);
        // TODO: Atualizar banco de dados com nova assinatura
        break;

      case 'customer.subscription.updated':
        // Assinatura atualizada
        console.log('Subscription updated:', body.data);
        // TODO: Atualizar status da assinatura no banco
        break;

      case 'customer.subscription.deleted':
        // Assinatura cancelada
        console.log('Subscription deleted:', body.data);
        // TODO: Desativar recursos premium do usuário
        break;

      case 'invoice.payment_succeeded':
        // Pagamento recorrente bem-sucedido
        console.log('Payment succeeded:', body.data);
        // TODO: Registrar pagamento no histórico
        break;

      case 'invoice.payment_failed':
        // Falha no pagamento
        console.log('Payment failed:', body.data);
        // TODO: Notificar usuário sobre falha no pagamento
        break;

      default:
        console.log('Unhandled event type:', eventType);
    }

    return NextResponse.json({
      received: true,
      eventType
    });

  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json(
      { error: 'Erro ao processar webhook' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Webhook endpoint is active'
  });
}
