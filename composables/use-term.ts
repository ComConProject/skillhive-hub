import type { Database } from '~/database.types'
import type { Term } from '~/types'

export function useTerm() {
  const supabase = useSupabaseClient<Database>()

  const terms = useState('terms', () => [] as Term[])

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

  return {
    terms,
    fetchTerms,
  }
}
