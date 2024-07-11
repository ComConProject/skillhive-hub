<script setup lang="ts">
import type { Order } from '~/types'

const { supabase: db } = useCustomSupabase()

const user = useSupabaseUser()

const { orders, loading, page, pageCount } = useInlineOrders()

function useInlineOrders() {
  const orders = shallowRef<Order[]>([])
  const loading = shallowRef(false)

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
    const { from, to } = getFromAndTo()
    const { data, error, count } = await db.from('order').select('*, payment(*), pricing(*), status:term(*)', { count: 'exact' }).range(from, to).eq('buyer_id', `${user.value?.id}`)

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
  <div>
    <h1 class="mb-2 text-xl font-semibold">
      {{ $t('my_orders') }}
    </h1>
    <OrderTable v-if="orders.length" :loading="loading" :orders="orders" />
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
