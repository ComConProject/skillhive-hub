export function useAuthUser() {
  const nhost = useNhost()
  const user = useState('user', () => nhost.auth.getUser())
  return { user }
}
