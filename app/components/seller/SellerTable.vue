<script setup lang="ts">
import type { Order } from '~/types'

interface Props {
  orders: Order[]
  loading: boolean
}
defineProps<Props>()
const { supabase: db } = useCustomSupabase()

const isEdit = ref(false)
const selectedOrder = ref<Order>()
const status = ref<number | null>()
const loading = ref(false)
function setItem(i: Order) {
  isEdit.value = true
  selectedOrder.value = i
  status.value = i.status?.id
}
const { t } = useI18n()
async function updateStatus() {
  if (!selectedOrder.value || !status.value) {
    return
  }
  loading.value = true

  // insert notification for buyer
  await db.from('notification').insert({
    action_user_id: selectedOrder.value.buyer_id,
    message: t('your_order_has_been_updated'),
    type_app: 'order',
    url: `/orders/?order=${selectedOrder.value.id}&code=${selectedOrder.value.code}`,
    title: 'Order updated',
  })

  const { error } = await db
    .from('order')
    .update({ status_id: status.value })
    .eq('id', selectedOrder.value.id)

  if (error) {
    loading.value = false
    throw new Error(`[updateStatus] ${error.message}`)
  }

  loading.value = false
  isEdit.value = false
}

function getStatus(name: string) {
  switch (name) {
    case 'completed':
      return 'green'
    case 'pending':
      return 'orange'
    case 'canceled':
      return 'red'
    case 'paid':
      return 'green'
    default:
      return 'gray'
  }
}
</script>

<template>
  <div class="rounded-md">
    <table class="min-w-full bg-white overflow-auto">
      <thead class="bg-gray-100 text-sm text-gray-500 uppercase">
        <tr>
          <th class="p-3 text-left">
            {{ $t('code') }}
          </th>
          <th class="p-3 text-left">
            {{ $t('price') }}
          </th>
          <th class="p-3 text-left">
            {{ $t('description') }}
          </th>
          <th class="p-3 text-left">
            {{ $t('on_date') }}
          </th>
          <th class="p-3 text-left">
            {{ $t('customer') }}
          </th>
          <th class="p-3 text-left">
            {{ $t('gig.status') }}
          </th>
          <th class="p-3 text-left">
            {{ $t('payment_status') }}
          </th>
          <th class="p-3 w-10" />
        </tr>
      </thead>
      <tbody v-if="!loading" class="divide-y divide-gray-200">
        <tr v-for="(i, index) in orders" :key="index" class="hover:bg-gray-50">
          <td class="p-3">
            <NuxtLinkLocale :to="`/orders/${i.id}/detail`">
              <span class="hover:underline">{{ i.code }}</span>
            </NuxtLinkLocale>
          </td>
          <td class="p-3">
            ${{ formatToDollars(i.price) }}
          </td>
          <td class="p-3">
            {{ i.detail }}
          </td>

          <td class="p-3">
            {{ i.on_date }}
          </td>

          <td class="p-3">
            {{ i.customer }}
          </td>
          <td class="p-3">
            <UBadge :color="getStatus(`${i.status?.name}`)" size="md" variant="subtle" class="cursor-pointer" @click="setItem(i)">
              <div class="flex items-center gap-1">
                <Icon
                  :name="
                    i.status?.name === 'completed' ? 'i-fluent-checkmark-20-regular' : 'svg-spinners:clock'
                  "
                />
                <span>
                  {{ $t(`${i.status?.name}`) }}
                </span>
              </div>
            </UBadge>
          </td>
          <td v-if="i.payment" class="p-3">
            <UBadge v-if="i.payment[0]?.status === 'paid'" size="md" variant="subtle" :color="getStatus(`${i.payment[0]?.status}`)">
              <div class="flex gap-1 items-center">
                <Icon
                  :name="
                    i.payment[0]?.status === 'paid' ? 'i-fluent-checkmark-20-regular' : 'svg-spinners:clock'
                  "
                />
                <span>
                  {{ $t(`${i.payment[0]?.status}`) }}
                </span>
              </div>
            </UBadge>
          </td>
          <td class="p-3">
            <UButton icon="i-fluent-edit-16-regular" variant="ghost" color="gray" @click="() => {}" />
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="loading">
      <div class="p-3 text-gray-500 text-center text-lg">
        <Icon name="svg-spinners:180-ring" /> {{ $t('loading') }}
      </div>
    </div>

    <UModal v-model="isEdit">
      <UCard>
        <template #header>
          <h1 class="text-xl font-semibold">
            {{ $t('edit_status') }}
          </h1>
        </template>
        <div>
          <UFormGroup :label="$t('status')">
            <TermInput v-model="status" :term-group="1" />
          </UFormGroup>
        </div>
        <template #footer>
          <div class="flex gap-2">
            <UButton :loading="loading" @click="updateStatus">
              {{ $t('save') }}
            </UButton>
            <UButton variant="outline" @click="isEdit = false">
              {{ $t('cancel') }}
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>
