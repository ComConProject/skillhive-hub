<script setup lang="ts">
const category = [
  {
    id: 1,
    name: 'Category 1',
  },
  {
    id: 1,
    name: 'Category 1',
  },
  {
    id: 1,
    name: 'Category 1',
  },
  {
    id: 1,
    name: 'Category 1',
  },
]
</script>

<template>
  <div class="border-y dark:border-gray-700">
    <section class="px-4 sm:px-28 py-2">
      <article>
        <ul class="flex gap-10 justify-evenly">
          <li v-for="i in category" :key="i.id">
            {{ i.name }}
          </li>
        </ul>
      </article>
    </section>
  </div>
</template>
