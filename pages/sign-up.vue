<script setup lang="ts">
definePageMeta({
  layout: 'blank',
})
const { nhost } = useNhost()
const { user } = useAuthUser()

const isCheck = shallowRef(false)
const loading = shallowRef(false)
const state = reactive({
  email: '',
  password: '',
})

const checkType = computed(() => {
  return isCheck.value ? 'text' : 'password'
})

async function signIn() {
  loading.value = true
  const { error } = await nhost.auth.signIn({
    email: state.email,
    password: state.password,
  })
  if (error?.message) {
    loading.value = false
    console.error(error)
    return
  }
  loading.value = false
}
watchEffect(() => {
  if (user.value)
    navigateTo('/')
})
</script>

<template>
  <div class="h-full flex flex-col items-center justify-center">
    <UCard class="flex flex-col max-w-xl w-full">
      <section class="space-y-3">
        <h1>Sign in</h1>
        <UFormGroup label="Email">
          <UInput v-model="state.email" type="email" placeholder="your email" />
        </UFormGroup>
        <UFormGroup label="Password">
          <UInput v-model="state.password" :type="checkType" placeholder="your password" />
        </UFormGroup>
        <UCheckbox v-model="isCheck" label="Show password" />
        <UButton :loading="loading" @click="signIn">
          Sign in
        </UButton>
      </section>
    </UCard>
  </div>
</template>
