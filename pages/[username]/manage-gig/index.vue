<script setup lang="ts">
const { username } = useRoute('username-manage-gig___lo').params

const columns = ref([
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'title',
    label: 'Title',
  },
  {
    key: 'clicks',
    label: 'Clicks',
  },
  {
    key: 'orders',
    label: 'Orders',
  },
  {
    key: 'revenue',
    label: 'Revenue',
  },
])

const data = ref([
  {
    id: 1,
    title: 'I will design wordpress, wix, squarespace and webflow websites',
    clicks: 0,
    orders: 0,
    revenue: 0,
  },
  {
    id: 2,
    title: 'I will design a creative and unique website',
    clicks: 0,
    orders: 0,
    revenue: 0,
  },
  {
    id: 3,
    title: 'I will design awesome website or landing page',
    clicks: 0,
    orders: 0,
    revenue: 0,
  },
  {
    id: 4,
    title: 'I will build responsive wordpress website design',
    clicks: 0,
    orders: 0,
    revenue: 0,
  },
  {
    id: 5,
    title: 'I will create a one of a kind design for your website',
    clicks: 0,
    orders: 0,
    revenue: 0,
  },
  {
    id: 6,
    title: 'I will create a customized website design',
    clicks: 0,
    orders: 0,
    revenue: 0,
  },
  {
    id: 7,
    title: 'I will do figma design, figma website, figma design website, website ui, website ui ux',
    clicks: 0,
    orders: 0,
    revenue: 0,
  },
])

const page = ref(1)
const pageCount = ref(5)

const rows = computed(() => data.value.slice((page.value - 1) * pageCount.value, page.value * pageCount.value))
</script>

<template>
  <div>
    <div class="flex items-center">
      <div class="space-y-2">
        <h1 class="text-4xl font-semibold">
          Gigs
        </h1>
        <p class="text-muted-foreground">
          Manage, create and edit your gigs and offers.
        </p>
      </div>
      <UButton class="ml-auto">
        <NuxtLinkLocale :to="`/${username}/manage-gig/create`">
          Create
        </NuxtLinkLocale>
      </UButton>
    </div>
    <UDivider class="my-6" />
    <div class="flex max-w-md mb-4">
      <UInput icon="i-ph-magnifying-glass" class="w-full" placeholder="Search..." />
    </div>
    <UTable :rows="rows" :columns="columns" />
    <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
      <UPagination v-model="page" :page-count="pageCount" :total="data.length" />
    </div>
  </div>
</template>
