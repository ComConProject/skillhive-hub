import type { Term } from '~/types'

export function useTerm() {
  const { supabase } = useCustomSupabase()

  const terms = useState('terms', () => [] as Term[])
  const term = useState<Term>('term', () => ({
    id: 0,
    name: '',
    group_id: 0,
    parent_id: 0,
    active: false,
    created_at: '',
    updated_at: '',
  }))
  /**
   * Fetches the terms from the 'term' table asynchronously.
   *
   * @return Resolves when the terms are successfully fetched.
   * @throws If there is an error fetching the terms.
   */
  async function fetchTerms(groupId: number) {
    const { data, error } = await supabase.from('term').select('*').filter('group_id', 'eq', groupId)
    if (error)
      throw new Error(`[fetchTerms] ${error.message}`)

    terms.value = data
    return data
  }

  async function fetchTermById(id: number) {
    const { data, error } = await supabase.from('term').select('*').eq('id', id)
    if (error)
      throw new Error(`[fetchTermById] ${error.message}`)

    term.value = data[0] as Term
    return data as Term[]
  }

  return {
    terms,
    fetchTerms,
    fetchTermById,
    term,
  }
}
