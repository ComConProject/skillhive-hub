import type { Database } from '../database.types'
import type { Term } from './term'

export type Freelancer = Database['public']['Tables']['freelancer']['Row']

export type Portfolio = Database['public']['Tables']['portfolio']['Row']

export type OriginSkill = Database['public']['Tables']['skill']['Row']

export type OriginLanguage = Database['public']['Tables']['language']['Row']

export interface Language extends OriginLanguage {
  freelancer?: Freelancer | null
  term?: Term | null
}

export interface Skill extends OriginSkill {
  freelancer?: Freelancer | null
  term?: Term | null
}
