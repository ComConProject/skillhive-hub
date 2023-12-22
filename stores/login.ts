export const useLogin = defineStore('login-store', () => {
  const showModal = ref(false)

  const toggle = () => showModal.value = !showModal.value

  return {
    showModal,
    toggle,
  }
})
