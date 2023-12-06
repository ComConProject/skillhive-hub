<script setup lang="ts">
const { x, y } = useMouse()
</script>

<template>
  <div>
    starter template nuxt app
    x: {{ x }}, y: {{ y }}
    <UIcon name="i-ph-rocket-launch" />
  </div>
</template>
