import { v4 as uuid } from 'uuid'

export function useUpload() {
  const { supabase } = useCustomSupabase()
  const user = useSupabaseUser()
  const filePaths = useState('filePaths', () => [] as string[])

  async function handleUpload(file: File) {
    if (!user.value)
      return

    const { data, error } = await supabase.storage.from('default').upload(`${user.value?.id}/${uuid()}`, file)

    if (error) {
      console.error(error)
      return
    }
    if (!data)
      return
    return data.path
  }

  return {
    handleUpload,
    filePaths,
  }
}
