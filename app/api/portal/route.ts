export const runtime = 'nodejs';

import Stripe from 'stripe';
import { NextResponse } from 'next/server';

// Initialize Stripe here (no shared helper, no apiVersion pin)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

/**
 * POST /api/portal
 * Body options:
 *   { customerId?: string, returnUrl?: string }
 * You should pass the Stripe customer ID from your DB/session.
 */
export async function POST(req: Request) {
  try {
    const { customerId, returnUrl } = await req.json().catch(() => ({}));

    if (!customerId) {
      return NextResponse.json({ error: 'Missing customerId' }, { status: 400 });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl ?? `${process.env.NEXT_PUBLIC_APP_URL}/app/dashboard`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? 'Portal error' }, { status: 500 });
  }
}
