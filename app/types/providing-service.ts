import type { Term } from './term'
import type { Database } from '~/database.types'

type OriginPricing = Database['public']['Tables']['pricing']['Row']

type OriginProvidingService = Database['public']['Tables']['providing_service']['Row']

export interface ProvidingService extends Omit<OriginProvidingService, 'delivery_format'> {
  term?: Term | null
  delivery_format: any
  user?: any
}

export interface Pricing extends OriginPricing {
  term?: Term | null
  providing_service?: ProvidingService | null
}
