import { useServerStripe } from '#stripe/server'

export default defineEventHandler(async (event) => {
  const stripe = await useServerStripe(event)
  const id = getRouterParam(event, 'id')
  if (!id)
    return
  const price = await stripe.prices.retrieve(id)
  return {
    price,
  }
})
