<script setup lang="ts">
definePageMeta({
  layout: 'blank',
})
const nhost = useNhost()
const { login } = useAuth()

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
  const { error } = await login(state.email, state.password)

  if (!error?.message)
    navigateTo('/')

  loading.value = false
}

async function signOut() {
  const { error } = await nhost.auth.signOut()
  if (error?.message)
    console.error(error)
  alert('Sign out success')
}
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
        <div class="flex gap-2 items-center">
          <UButton :loading="loading" @click="signIn">
            Sign in
          </UButton>
          <UButton @click="signOut">
            Logout
          </UButton>
        </div>
      </section>
    </UCard>
  </div>
</template>
