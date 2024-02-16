<script setup lang="ts">
definePageMeta({
  middleware: 'is-logged',
})

const { x, y } = useMouse()
const user = useSupabaseUser()
const { signOut } = useAuth()
const signin = useSignIn()

const isSignOut = ref(false)

console.log(user.value)
</script>

<template>
  <div>
    starter template nuxt app
    x: {{ x }}, y: {{ y }}
    <UIcon name="i-ph-rocket-launch" />
    <UButton @click="() => navigateTo('/signup')">
      Sign up
    </UButton>
    <UButton :loading="isSignOut" @click="signOut">
      Sign out
    </UButton>
    <UButton @click="signin.open">
      Open modal
    </UButton>
    <UFormGroup>
      <TermInput />
    </UFormGroup>
  </div>
</template>
