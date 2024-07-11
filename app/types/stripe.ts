export interface StripeProduct {
  id: string
  object: string
  active: boolean
  created: number
  default_price: any // could be null or a string
  description: any // could be null or a string
  images: string[]
  features: string[]
  livemode: boolean
  metadata: Record<string, any> // assuming metadata is a key-value pair object
  name: string
  package_dimensions: any // could be null or an object if specified
  shippable: any // could be null or a boolean
  statement_descriptor: any // could be null or a string
  tax_code: any // could be null or a string
  unit_label: any // could be null or a string
  updated: number
  url: any // could be null or a string
}

export interface StripePrice {
  id: string
  object: string
  active: boolean
  billing_scheme: string
  created: number
  currency: string
  custom_unit_amount: any // could be null or an object if specified
  livemode: boolean
  lookup_key: any // could be null or a string
  metadata: Record<string, any> // assuming metadata is a key-value pair object
  nickname: any // could be null or a string
  product: string
  recurring: {
    aggregate_usage: any // could be null or a string
    interval: string
    interval_count: number
    trial_period_days: any // could be null or a number
    usage_type: string
  }
  tax_behavior: string
  tiers_mode: any // could be null or a string
  transform_quantity: any // could be null or an object if specified
  type: string
  unit_amount: number
  unit_amount_decimal: string
}
