<script setup lang="ts">

</script>

<template>
  <div class="flex h-[100dvh] flex-col overflow-hidden">
    <nav class="py-4">
      <SellerNavbar class="hidden sm:block" />
    </nav>
    <!-- <section>
      <TheCategory />
    </section> -->
    <main class="flex flex-1 flex-col overflow-auto gap-1">
      <div class="flex-grow text-sm md:text-base">
        <slot />
      </div>
    </main>
    <signinModal />
  </div>
</template>
