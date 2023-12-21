<script setup lang="ts">
const { x, y } = useMouse()
const user = useSupabaseUser()
const supabase = useSupabaseClient()

const isSignOut = ref(false)

console.log(user.value)

async function signOut() {
  isSignOut.value = true
  const { error } = await supabase.auth.signOut()
  if (error?.message) {
    isSignOut.value = false
    return console.error(error.message)
  }
  isSignOut.value = false
  navigateTo('/login')
}
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
  </div>
</template>
