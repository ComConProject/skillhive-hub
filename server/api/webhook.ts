import process from 'node:process'
import type Stripe from 'stripe'
import { serverSupabaseClient } from '#supabase/server'
import { useServerStripe } from '#stripe/server'
import type { Database } from '~/database.types'
// https://github.com/vercel/next.js/blob/canary/examples/with-stripe-typescript/pages/api/webhooks/index.ts

export default defineEventHandler(async (event) => {
  const stripe = await useServerStripe(event)
  const client = await serverSupabaseClient<Database>(event)
  const headers = event.node.req.headers
  const config = useRuntimeConfig()

  const body = await readRawBody(event)
  const sig = headers['stripe-signature']
  let hookEvent: Stripe.Event

  try {
    hookEvent = stripe.webhooks.constructEvent(
      body as string,
      sig as string,
      config.stripeWebhookKey,
    )
  }
  catch (err) {
    throw createError({ statusCode: 400, message: (err as Error).message })
  }

  switch (hookEvent.type) {
    case 'payment_intent.created': {
      console.log('payment_intent.created')
      break
    }
    case 'payment_intent.succeeded': {
      const intentSucceeded = hookEvent.data.object as Stripe.PaymentIntent

      //   insert to database
      console.log('payment_intent was successful!', intentSucceeded)

      const obj = {
        receipt_email: intentSucceeded.receipt_email,
        data: {
          payment_intent: JSON.stringify(intentSucceeded),
        },
      }

      await client.from('stripe_webhook').insert({
        ...obj,
      })

      break
    }
    case 'charge.succeeded': {
      const chargeSucceeded = hookEvent.data.object as Stripe.Charge
      console.log('charge was successful!', chargeSucceeded)
      break
    }
    //   // ... handle other event types
    default:
      console.log(`Unhandled event type ${hookEvent.type}`)
  }
})
