<script setup lang="ts">
definePageMeta({
  layout: 'blank',
})

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
  <div class="flex h-full w-full  flex-col items-center justify-center">
    <UCard class="max-w-xl w-full">
      <section class="space-y-3">
        <h1 class="text-center font-semibold text-xl">
          Welcome to Skillhive!
        </h1>
        <div>
          <UFormGroup label="Email">
            <UInput v-model="state.email" type="email" />
          </UFormGroup>
        </div>
        <div>
          <UFormGroup label="Password">
            <UInput v-model="state.password" type="password" />
          </UFormGroup>
        </div>
        <div>
          <UButton :loading="loading" @click="signIn">
            Login
          </UButton>
        </div>
      </section>
    </UCard>
  </div>
</template>
