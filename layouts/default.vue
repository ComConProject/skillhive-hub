<script setup lang="ts">

</script>

<template>
  <div class="flex h-screen flex-col overflow-hidden">
    <nav class="text-sm sm:mt-4 sm:px-6 sm:text-base xl:pt-0 2xl:pt-0">
      <TheNav class="hidden sm:block" />
    </nav>
    <main class="flex flex-1 flex-col overflow-auto">
      <div class="text-sm sm:mt-4 sm:px-6 sm:text-base xl:pt-0 2xl:pt-0">
        <slot />
      </div>
    </main>
    <LoginModal />
  </div>
</template>
