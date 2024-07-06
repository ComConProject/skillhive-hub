import type { Freelancer } from './freelancer'
import type { Term } from './term'
import type { Database } from '~/database.types'

type OriginPricing = Database['public']['Tables']['pricing']['Row']

type OriginProvidingService = Database['public']['Tables']['providing_service']['Row']

export interface ProvidingService extends Omit<OriginProvidingService, 'delivery_format'> {
  term?: Term | null
  delivery_format: any
  freelancer?: Freelancer | null
  pricing?: Pricing[]
}

export interface Pricing extends Omit<OriginPricing, 'meta_data'> {
  term?: Term | null
  providing_service?: ProvidingService | null
  meta_data: any
}

export type Rating = Database['public']['Tables']['rating']['Row']
