import Stripe from 'stripe'

let _stripe: Stripe | undefined

export function getStripe(): Stripe {
  if (_stripe) return _stripe
  _stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? 'sk_placeholder', {
    apiVersion: '2026-02-25.clover',
  })
  return _stripe
}

// Keep named export for backward compat
export const stripe = {
  get checkout() {
    return getStripe().checkout
  },
  get webhooks() {
    return getStripe().webhooks
  },
}
