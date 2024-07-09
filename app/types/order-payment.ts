import type { Pricing } from './providing-service'
import type { Term } from './term'
import type { Database } from '~/database.types'

type OriginalOrder = Database['public']['Tables']['order']['Row']

type OriginalPayment = Database['public']['Tables']['payment']['Row']

export interface Payment extends Omit<OriginalPayment, 'metadata'> {
  metadata?: any
  order?: Order | null
}

export interface Order extends Omit<OriginalOrder, 'metadata'> {
  metadata?: any
  payment?: Payment[] | null
  status?: Term | null
  pricing?: Pricing | null
}
