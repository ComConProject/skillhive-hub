<script setup lang="ts">
const { x, y } = useMouse()
const { nhost } = useNhost()
const { user } = useAuthUser()

console.log(user.value)

onMounted(() => {
})
</script>

<template>
  <div>
    starter template nuxt app
    x: {{ x }}, y: {{ y }}
    <UIcon name="i-ph-rocket-launch" />
    <UButton @click="() => navigateTo('/sign-up')">
      Sign up
    </UButton>
  </div>
</template>
