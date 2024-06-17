import type { Database } from '~~/database.types'

export function useCustomSupabase() {
  const supabase = useSupabaseClient<Database>()

  return { supabase }
}
