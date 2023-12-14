export function useAuth() {
  const { nhost } = useNhost()
  const { user } = useAuthUser()

  function setUser(user: any) {
    user.value = user
  }

  async function login(email: string, password: any) {
    const { error, session } = await nhost.auth.signIn({
      email,
      password,
    })
    if (error?.message)
      console.error(error)
    console.log(session)
    setUser(session?.user)
    return { error }
  }
  return { login }
}
