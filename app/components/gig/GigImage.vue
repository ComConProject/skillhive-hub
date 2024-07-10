<script lang="ts" setup>
defineProps<{
  src: string
}>()
</script>

<template>
  <div className="aspect-video relative">
    <NuxtImg
      :src="src" alt="tech"
      class="object-cover"
    />
  </div>
</template>
