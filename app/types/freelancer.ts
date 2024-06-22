import type { Database } from '../database.types'

export type Freelancer = Database['public']['Tables']['freelancer']['Row']

export type Portfolio = Database['public']['Tables']['portfolio']['Row']

export type Skill = Database['public']['Tables']['skill']['Row']
