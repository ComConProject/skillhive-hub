import { serverSupabaseClient } from '#supabase/server'
import { useServerStripe } from '#stripe/server'
import type { Database } from '~/database.types'

export default defineEventHandler(async (event) => {
  const stripe = await useServerStripe(event)
  const query = getQuery(event)
  const client = await serverSupabaseClient<Database>(event)

  // get session
  const session = await stripe.checkout.sessions.retrieve(query.session_id as string)

  if (!session) {
    throw createError({ statusCode: 404, statusMessage: 'Session not found' })
  }

  // get order

  const obj: any = {
    method: session.payment_method_types[0],
    on_date: new Date(session.created * 1000),
    order_id: session.metadata?.orderId,
    metadata: {
      ...session,
    },
    amount: session.amount_total as number,
    status: session.payment_status,
    description: `Payment for order ${session.metadata?.orderId}`,
  }

  const { error } = await client.from('payment').insert({
    ...obj,
  })

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  const isPaid = session.payment_status === 'paid'

  return {
    session,
    isPaid,
  }
})
