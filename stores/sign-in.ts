export const useSignIn = defineStore('signin-store', () => {
  const showModal = ref(false)

  const open = () => showModal.value = !showModal.value

  return {
    showModal,
    open,
  }
})
