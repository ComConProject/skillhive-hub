export function getImageUrl(path: string) {
  const { supabase: db } = useCustomSupabase()

  return db.storage.from('default').getPublicUrl(path).data.publicUrl
}
