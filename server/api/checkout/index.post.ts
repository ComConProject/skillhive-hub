import { serverSupabaseClient } from '#supabase/server'
import { useServerStripe } from '#stripe/server'
import type { Database } from '~/database.types'

export default defineEventHandler(async (event) => {
  const stripe = await useServerStripe(event)
  const body = await readBody(event)
  const client = await serverSupabaseClient<Database>(event)
  const config = useRuntimeConfig()

  if (!body.priceId) {
    return createError({
      statusCode: 400,
      statusMessage: 'Missing priceId',
    })
  }
  // random three string
  const code = `${Math.random().toString(36).substring(2, 5).toLocaleUpperCase()}-${generateRandomNumber(6)}`
  // Insert to database
  const { data, error } = await client.from('order').insert({
    buyer_id: body.userId,
    pricing_id: body.pricingId,
    price: body.totalPrice,
    detail: `Purchase gig ${body.gigId} with price ${body.totalPrice}`,
    on_date: new Date().toISOString(),
    code,
    customer: body.customer,
    customer_email: body.email,
    freelancer_id: body.freelancerId,
  }).select('*').single()

  if (error) {
    console.error('Database insert error:', error)
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }

  const order = data

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: body.priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      payment_method_types: ['card'],
      success_url: `${config.public.baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${config.public.baseUrl}/cancel`,
      customer_email: body.email,
      metadata: {
        gigId: body.gigId,
        userId: body.userId,
        email: body.email,
        pricingId: body.pricingId,
        priceId: body.priceId,
        orderId: `${order?.id}`,
      },
    })

    console.log('Stripe session created:', session)

    return {
      url: session.url,
    }
  }
  catch (stripeError) {
    console.error('Stripe checkout session error:', stripeError)
    return createError({
      statusCode: 500,
      statusMessage: 'Stripe checkout session error',
    })
  }
})
