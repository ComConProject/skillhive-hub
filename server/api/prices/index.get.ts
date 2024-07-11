import { useServerStripe } from '#stripe/server'

export default defineEventHandler(async (event) => {
  const stripe = await useServerStripe(event)
  const prices = await stripe.prices.list(
    {
      expand: ['data.product'],
    },
  )

  return {
    prices: prices.data,
  }
})
