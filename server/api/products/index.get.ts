import process from 'node:process'
import { defineEventHandler } from 'h3'
import { Stripe } from 'stripe'

export default defineEventHandler(async (event) => {
//   const config = useRuntimeConfig()
  const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
    apiVersion: '2022-11-15',
  })

  const products = await stripe.products.list(
    {
      limit: 10,
    },
  )

  return {
    products: products.data,
  }
})
