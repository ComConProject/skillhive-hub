<script setup lang="ts">
const { x, y } = useMouse()
const { nhost } = useNhost()

async function signUp() {
  const { session, error } = await nhost.auth.signUp({
    email: 'joe@example.com',
    password: 'secret-password',
  })
  if (error?.message) {
    console.error(error)
    return
  }
  console.log(session?.user)
}
</script>

<template>
  <div>
    starter template nuxt app
    x: {{ x }}, y: {{ y }}
    <UIcon name="i-ph-rocket-launch" />
    <UButton @click="signUp">
      Sign up
    </UButton>
  </div>
</template>
