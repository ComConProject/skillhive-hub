export function useAuth() {
  const supabase = useSupabaseClient()
  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error?.message)
      return console.error(error.message)
  }
  return {
    signOut,
  }
}
