<script setup lang="ts">
const { locale } = useI18n()
</script>

<template>
  <Html :lang="locale">
    <Body :class="locale" class="bg-slate-50 text-slate-800 antialiased transition-colors duration-300 dark:bg-slate-900 dark:text-slate-400 mx-auto">
      <NuxtLayout>
        <NuxtPage />
        <UNotifications />
      </NuxtLayout>
    </Body>
  </Html>
</template>

<style>
/* bg-[#F6F7F9] */
</style>
