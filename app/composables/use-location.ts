import type { Database } from '~/database.types'
import type { District, Province, Village } from '@/types/'

export function useLocation() {
  const supabase = useSupabaseClient<Database>()

  const provinces = useState('provinces', () => [] as Province[])
  const districts = useState('districts', () => [] as District[])
  const villages = useState('villages', () => [] as Village[])
  async function fetchProvinces(where?: string) {
    let query = supabase.from('provinces').select('*')

    if (where)
      query = query.or(where)

    const { data, error } = await query

    if (error)
      throw new Error(`[fetchProvinces] ${error.message}`)

    provinces.value = data.sort((a, b) => a.lo.localeCompare(b.lo))
    return data
  }
  async function fetchDistricts(where?: string) {
    let query = supabase.from('districts').select('*, provinces(*)')

    if (where)
      query = query.or(where)

    const { data, error } = await query

    if (error)
      throw new Error(`[fetchDistricts] ${error.message}`)
    districts.value = data.sort((a, b) => a.lo.localeCompare(b.lo))
    return data
  }
  async function fetchVillages(where?: string) {
    let query = supabase.from('villages').select('*, districts(*, provinces(*))')

    if (where)
      query = query.or(where)

    const { data, error } = await query

    if (error)
      throw new Error(`[fetchVillages] ${error.message}`)
    villages.value = data.sort((a, b) => a.lo.localeCompare(b.lo))
    return data
  }
  return { provinces, fetchProvinces, fetchDistricts, fetchVillages, districts, villages }
}
