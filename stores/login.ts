export const useLogin = defineStore('login-store', () => {
  const showModal = ref(false)

  const open = () => showModal.value = !showModal.value

  return {
    showModal,
    open,
  }
})
