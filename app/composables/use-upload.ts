import { v4 as uuid } from 'uuid'

export function useUpload() {
  const { supabase } = useCustomSupabase()
  const user = useSupabaseUser()
  const filePaths = useState('filePaths', () => [] as string[])

  async function handleUpload(file: File, serviceId: string) {
    if (!user.value)
      return

    const { data, error } = await supabase.storage.from('default').upload(`${user.value?.id}/${serviceId}/${uuid()}`, file)

    if (error) {
      console.error(error)
      return
    }
    if (data)
      filePaths.value.push(data.path as any)
  }

  return {
    handleUpload,
    filePaths,
  }
}
