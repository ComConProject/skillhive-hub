<script setup lang="ts">
const supabase = useSupabaseClient()

const state = ref({
  email: '',
  password: '',
})
const loading = ref(false)

async function signIn() {
  loading.value = true
  const { data, error } = await supabase.auth.signInWithPassword({
    email: state.value.email,
    password: state.value.password,
  })
  if (error?.message) {
    loading.value = false
    return console.error(error.message)
  }

  loading.value = false
  if (data.user)
    navigateTo('/')
}
</script>

<template>
  <div class="flex gap-2 items-center justify-center">
    <UFormGroup label="Email">
      <UInput v-model="state.email" type="email" />
    </UFormGroup>
    <UFormGroup label="Password">
      <UInput v-model="state.password" type="password" />
    </UFormGroup>
    <UButton :loading="loading" @click="signIn">
      Sign In
    </UButton>
  </div>
</template>
