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
  <div>
    <UPopover>
      <UButton icon="i-fluent-filter-12-regular" color="gray" variant="ghost" />
      <template #panel>
        <div class="p-4 w-96">
          <p v-for="i in category" :key="i.id">
            {{ i.name }}
          </p>
        </div>
      </template>
    </UPopover>
  </div>
</template>
