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
  <div class="flex h-full flex-col items-center justify-center">
    <article class="w-full">
      <article class="mx-auto w-full min-w-min max-w-md px-4">
        <div class="mb-4 flex items-center justify-center">
          <!-- <img src="/logo.png" width="100"> -->
        </div>
        <h1 class="mb-4 text-center text-xl font-bold">
          {{
            $t('auth.sign_in')
          }}
        </h1>
        <div class="flex flex-col gap-3">
          <figure class="flex flex-col gap-3">
            <div>
              <p class="text-sm">
                {{ $t('email') }}
              </p>
              <UInput
                v-model="state.email"
                type="text"
                :placeholder="$t('email')"
                icon="i-line-md-email"
              >
                <template #prefix>
                  <Icon name="line-md:email" />
                </template>
              </UInput>
            </div>
            <div>
              <p class="text-sm">
                {{ $t('password') }}
              </p>
              <UInput
                v-model:value="state.password"
                type="password"
                :placeholder="$t('password')"
                show-password-on="click"
                icon="i-carbon-password"
                @keyup.enter="signIn('email')"
              />
              <!-- <NuxtLink to="/forgot" class="mt-1 block text-gray-500 underline">
                {{ $t('forgot_password') }}
              </NuxtLink> -->
            </div>
            <UButton
              type="primary"
              :loading="loading"
              block
              icon="i-heroicons-arrow-right-20-solid"
              trailing
              @click="signIn('email')"
            >
              {{ $t('auth.sign_in') }}
            </UButton>
            <div class="text-sm text-gray-500">
              {{ $t('accounts.not') }}
              <NuxtLink to="/signup" class="underline">
                {{ $t('auth.sign_up') }}
              </NuxtLink>
            </div>
          </figure>

          <h2 class="mt-4 text-center">
            {{ $t('auth.sign_in_with') }}
          </h2>

          <UButton
            block
            variant="outline"
            icon="i-logos-google-icon"
            @click.prevent="signIn('google')"
          >
            Google
          </UButton>
        </div>
      </article>
    </article>
  </div>
</template>
