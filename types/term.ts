export interface Term {
  active: boolean
  created_at: string | null
  group_id: number | null
  id: number
  name: string
  parent_id: number | null
  updated_at: string | null
}

export interface CustomTerm extends Term {
  children?: Term[]
}
