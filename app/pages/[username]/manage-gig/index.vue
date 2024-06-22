<script setup lang="ts">
import { _xl } from '#tailwind-config/theme/backdropBlur'
import type { ProvidingService } from '~/types'

const { username } = useRoute('username-manage-gig___lo').params

const { supabase } = useCustomSupabase()

const gigs = shallowRef<ProvidingService[]>([])
const page = ref(1)
const pageCount = ref(5)

function getFromAndTo() {
  const itemPerPage = 10
  const from = (page.value - 1) * itemPerPage
  const to = page.value * itemPerPage - 1
  return { from, to }
}

async function getGigs() {
  const { from, to } = getFromAndTo()
  const { data, error, count } = await supabase.from('providing_service').select(`
  *,
  term(*)
  `, { count: 'exact' }).range(from, to)
  if (error) {
    throw new Error(`[getGigs]: error ${error}`)
  }

  if (data?.length === 0) {
    throw new Error('[getGigs]: no data')
  }

  if (!count) {
    throw new Error('[getGigs]: no count')
  }

  gigs.value = data
  pageCount.value = count
}

onMounted(() => {
  getGigs()
})
</script>

<template>
  <div>
    <div class="flex items-center">
      <div class="space-y-2">
        <h1 class="text-4xl font-semibold">
          {{ $t('gig.gig') }}
        </h1>
        <p class="text-muted-foreground">
          {{ $t('gig.manage_create_edit') }}.
        </p>
      </div>
      <NuxtLinkLocale class="ml-auto" :to="`/${username}/manage-gig/create`">
        <UButton icon="i-ph-plus">
          {{ $t('form.add') }}
        </UButton>
      </NuxtLinkLocale>
    </div>
    <UDivider class="my-6" />
    <div class="flex max-w-md mb-4">
      <UInput icon="i-ph-magnifying-glass" class="w-full" placeholder="Search..." />
    </div>
    <div v-if="gigs.length" class="relative overflow-x-auto">
      <table class="min-w-full table-fixed divide-y divide-gray-300 dark:divide-gray-700">
        <thead class="relative ">
          <tr>
            <th class="text-left px-4 py-3.5 text-gray-900 dark:text-white font-semibold text-sm">
              Id
            </th>
            <th class="text-left px-4 py-3.5 text-gray-900 dark:text-white font-semibold text-sm">
              Title
            </th>
            <th class="text-left px-4 py-3.5 text-gray-900 dark:text-white font-semibold text-sm">
              Click
            </th>
            <th class="text-left px-4 py-3.5 text-gray-900 dark:text-white font-semibold text-sm">
              Orders
            </th>
            <th class="text-left px-4 py-3.5 text-gray-900 dark:text-white font-semibold text-sm">
              Revenue
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
          <tr v-for="(gig, idx) in gigs" :key="gig.id" class="hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer">
            <td class="whitespace-nowrap px-4 py-4 dark:text-gray-400 text-sm">
              {{ idx + 1 }}
            </td>
            <td class="whitespace-nowrap px-4 py-4 dark:text-gray-400 text-sm">
              <div>{{ gig.title }}</div>
              <small>{{ gig.description }}</small>
            </td>
            <td class="whitespace-nowrap px-4 py-4 dark:text-gray-400 text-sm">
              0
            </td>
            <td class="whitespace-nowrap px-4 py-4 dark:text-gray-400 text-sm">
              0
            </td>
            <td class="whitespace-nowrap px-4 py-4 dark:text-gray-400 text-sm">
              0
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
      <UPagination v-model="page" :page-count="pageCount" :total="gigs.length" />
    </div>
  </div>
</template>
