<script setup lang="ts">

</script>

<template>
  <div class="flex h-[100dvh] flex-col overflow-hidden">
    <nav class=" py-4 sm:px-28">
      <section class="flex items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <h1 class="font-semibold text-lg">
            Skillhive
          </h1>
        </div>
      </section>
    </nav>
    <main class="flex flex-1 flex-col overflow-auto gap-1">
      <div class="flex-grow  sm:px-28 pt-4 text-sm md:text-base">
        <slot />
      </div>
    </main>
    <signinModal />
  </div>
</template>
