import { useServerStripe } from '#stripe/server'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const stripe = await useServerStripe(event)

  const product = await stripe.products.create(
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
  const price = await stripe.prices.create({
    currency: 'usd',
    product: product.id,
    unit_amount: body.unit_amount,
    metadata: {
      gigId: body.packageId,
    },
  })
  return {
    product,
    price,
  }
})
