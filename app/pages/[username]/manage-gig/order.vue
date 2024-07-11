<script setup lang="ts">
import type { Freelancer, Order } from '~/types'

const { supabase: db } = useCustomSupabase()

const user = useSupabaseUser()

const { orders, loading, page, pageCount } = useInlineOrders()

function useInlineOrders() {
  const orders = shallowRef<Order[]>([])
  const loading = shallowRef(false)

  const freelancer = shallowRef<Freelancer>()
  async function fetchFreelancer() {
    const { data, error } = await db.from('freelancer').select('*').eq('user_id', `${user.value?.id}`).single()
    if (error) {
      throw new Error(`[fetchFreelancer] ${error.message}`)
    }

    if (data) {
      freelancer.value = data
    }
  }

  const page = ref(1)
  const pageCount = ref(5)
  function getFromAndTo() {
    const itemPerPage = 10
    const from = (page.value - 1) * itemPerPage
    const to = page.value * itemPerPage - 1
    return { from, to }
  }

  async function fetchOrdersByUserId() {
    loading.value = true
    await fetchFreelancer()
    const { from, to } = getFromAndTo()
    const { data, error, count } = await db.from('order').select('*, payment(*), pricing(*), status:term(*)', { count: 'exact' }).range(from, to).eq('freelancer_id', `${freelancer.value?.id}`)

    if (error) {
      loading.value = false
      throw new Error(`[fetchOrdersByUserId] ${error.message}`)
    }

    if (data) {
      orders.value = data
      loading.value = false
    }

    if (count) {
      pageCount.value = count
    }
  }

  onMounted(() => {
    fetchOrdersByUserId()
  })

  return {
    orders,
    loading,
    page,
    pageCount,
  }
}
</script>

<template>
  <div class="space-y-3">
    <h1 class="text-xl font-semibold">
      {{ $t('order') }}
    </h1>
    <div class="h-full">
      <SellerTable v-if="orders.length" :loading="loading" :orders="orders" />
    </div>
    <div v-if="orders.length" class="flex justify-end border-gray-200 dark:border-gray-700">
      <UPagination v-model="page" :page-count="pageCount" :total="orders.length" />
    </div>
    <div v-if="orders.length === 0">
      <div class="flex flex-col items-center justify-center gap-4">
        <NuxtImg src="/empty-package.svg" alt="Empty" width="300" height="300" />
        <p class="text-lg font-semibold">
          {{ $t('no_data') }}
        </p>
      </div>
    </div>
  </div>
</template>
