<script setup lang="ts">

</script>

<template>
  <div class="flex h-[100dvh] flex-col overflow-hidden">
    <nav class="pt-4 px-1">
      <TheNav class="hidden sm:block" />
    </nav>
    <div class="flex flex-1 px-1 border-slate-100 dark:border-slate-700 overflow-auto">
      <!-- Sidebar -->
      <aside class="hidden sm:block border-r pr-2 border-slate-100 dark:border-slate-700 w-[300px] flex-shrink-0 py-4">
        <!-- Add your sidebar content here -->
        <InboxSidebar />
      </aside>
      <!-- Main Content -->
      <main class="flex flex-1 pt-4 flex-col gap-1 pl-2">
        <div class="flex-grow text-sm md:text-base">
          <slot />
        </div>
      </main>
    </div>
    <signinModal />
  </div>
</template>
