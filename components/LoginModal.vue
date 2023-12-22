<script setup lang="ts">
const supabase = useSupabaseClient()
const login = useLogin()

const state = ref({
  email: '',
  password: '',
})
const loading = ref(false)
const status = ref<'Google' | 'Email' | ''>('')

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
  <UModal v-model="login.showModal">
    <UCard class="max-w-xl w-full">
      <TransitionGroup name="slide-left">
        <div key="1" class="">
          <h1 class="text-center font-semibold text-xl">
            Welcome to Skillhive!
          </h1>

          <div class="flex flex-col gap-2">
            <UButton leading-icon="i-mdi-google" block @click="status = 'Google'">
              <div class="flex text-center">
                Continue with Google
              </div>
            </UButton>
            <UButton icon="i-mdi-google" block @click="status = 'Email'">
              Continue with Email
            </UButton>
          </div>
        </div>
        <UForm v-if="status === 'Email'" key="2" :state="state" class="space-y-3">
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
        </UForm>
      </TransitionGroup>
    </UCard>
  </UModal>
</template>
