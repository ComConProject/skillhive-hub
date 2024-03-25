import process from 'node:process'
import { defineEventHandler } from 'h3'
import { useServerStripe } from '#stripe/server'

export default defineEventHandler(async (event) => {
  const headers = event.node.req.headers
  const signature = headers['stripe-signature']
  const stripe = await useServerStripe(event)
  console.info(signature)

  return {
    VERSION: stripe.VERSION,
    stripe: stripe.webhooks,
  }
})
