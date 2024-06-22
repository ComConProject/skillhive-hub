import { useServerStripe } from '#stripe/server'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const stripe = await useServerStripe(event)

  const products = await stripe.products.create(
    {
      name: body.name,
      active: true,
      description: body.description,
      metadata: {
        gigId: body.packageId,
      },
    },
  )

  // create a price
  await stripe.prices.create({
    currency: 'usd',
    product: products.id,
    unit_amount: body.unit_amount,
    metadata: {
      gigId: body.packageId,
    },
  })
  return {
    products,
  }
})
