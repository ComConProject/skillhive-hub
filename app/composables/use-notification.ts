export function useNotification() {
  const { supabase: db } = useCustomSupabase()

  async function insertNotification(notification: any) {
    const { data, error } = await db.from('notification').insert(notification).select()

    if (error) {
      throw new Error(`[insertNotification] ${error.message}`)
    }

    return data
  }

  return {
    insertNotification,
  }
}
