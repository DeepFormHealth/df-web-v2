export const runtime = 'nodejs';

import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { priceId, successUrl, cancelUrl, customer } = await req.json();

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl ?? `${process.env.NEXT_PUBLIC_APP_URL}/app/dashboard`,
      cancel_url: cancelUrl ?? `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      customer, // optional; pass if you already have a Stripe customer id
    });

    return NextResponse.json({ id: session.id, url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? 'checkout error' }, { status: 500 });
  }
}
