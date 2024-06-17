import type { Database } from '../database.types'

export type Freelancer = Database['public']['Tables']['freelancer']['Row']

export type portfolio = Database['public']['Tables']['portfolio']['Row']

export type skill = Database['public']['Tables']['skill']['Row']
