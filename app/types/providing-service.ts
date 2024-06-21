import type { Database } from '~/database.types'

export type ProvidingService = Database['public']['Tables']['providing_service']['Row']

export type Pricing = Database['public']['Tables']['pricing']['Row']
