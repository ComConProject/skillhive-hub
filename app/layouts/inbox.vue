<script setup lang="ts">

</script>

<template>
  <div class="flex h-[100dvh] flex-col overflow-hidden">
    <nav class="px-4 pt-4">
      <TheNav class="hidden sm:block" />
    </nav>
    <div class="flex flex-1 border-t  overflow-auto">
      <!-- Sidebar -->
      <aside class="hidden sm:block border-r px-4 w-[300px] flex-shrink-0 py-4">
        <!-- Add your sidebar content here -->
        <InboxSidebar />
      </aside>
      <!-- Main Content -->
      <main class="flex flex-1 flex-col gap-1">
        <div class="flex-grow px-4 pt-4 text-sm md:text-base">
          <slot />
        </div>
      </main>
    </div>
    <signinModal />
  </div>
</template>
