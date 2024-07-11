import { useServerStripe } from '#stripe/server'

export default defineEventHandler(async (event) => {
  const stripe = await useServerStripe(event)

  const products = await stripe.products.list(
    {
      limit: 10,
      expand: ['data.price'],
    },
  )

  return {
    products: products.data,
  }
})
