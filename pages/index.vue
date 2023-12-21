<script setup lang="ts">
const { x, y } = useMouse()
const user = useSupabaseUser()

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
  </div>
</template>
