import type { Database } from '~/database.types'
import type { District, Province, Village } from '@/types/'

export function useLocation() {
  const supabase = useSupabaseClient<Database>()

  const provinces = useState('provinces', () => [] as Province[])
  async function fetchProvinces(where?: string) {
    let query = supabase.from('provinces').select('*')

    if (where)
      query = query.or(where)

    const { data, error } = await query

    if (error)
      throw new Error(`[fetchProvinces] ${error.message}`)

    provinces.value = data
  }
  return { provinces, fetchProvinces }
}
