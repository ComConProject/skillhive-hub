<script setup lang="ts">
const supabase = useSupabaseClient()
const signIn = useSignIn()

const state = ref({
  email: '',
  password: '',
})
const loading = ref(false)

async function signInWithProvider(provider?: 'google' | 'github' | 'facebook' | 'email') {
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
    if (data.user) {
      // refresh page
      window.location.reload()
    }
  }

  loading.value = false
}
</script>

<template>
  <UModal v-model="signIn.showModal">
    <UCard>
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
          <UButton :loading="loading" @click="signInWithProvider('email')">
            signin
          </UButton>
        </div>
        <div class="text-center">
          <ULink to="/signup">
            Don't have an account? Sign up
          </ULink>
        </div>
        <UDivider label="Or continue with" />
        <div class=" flex justify-center gap-3">
          <UButton variant="outline" @click="signInWithProvider('google')">
            <UIcon name="i-mdi-google" class="text-xl" />
          </UButton>
        </div>
      </section>
    </UCard>
  </UModal>
</template>
