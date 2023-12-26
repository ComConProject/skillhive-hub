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

async function signIn(provider?: 'google' | 'github' | 'facebook' | 'email') {
  loading.value = true
  if (provider === 'google' || provider === 'github' || provider === 'facebook') {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: 'http://localhost:3000',
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })
    if (error?.message) {
      loading.value = false
      return console.error(error.message)
    }
  }
  else {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: state.value.email,
      password: state.value.password,
    })
    if (error?.message) {
      loading.value = false
      return console.error(error.message)
    }
    if (data.user)
      navigateTo('/')
  }

  loading.value = false
}
</script>

<template>
  <div class="flex min-h-screen w-full items-center justify-center">
    <UCard class="sm:w-full sm:max-w-xl">
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
          <UButton :loading="loading" @click="signIn('email')">
            Login
          </UButton>
        </div>
        <div class="text-center">
          <ULink to="/signup">
            Don't have an account? Sign up
          </ULink>
        </div>
        <UDivider label="Or continue with" />
        <div class=" flex justify-center gap-3">
          <UButton variant="outline" @click="signIn('google')">
            <UIcon name="i-mdi-google" class="text-xl" />
          </UButton>
        </div>
      </section>
    </UCard>
  </div>
</template>
