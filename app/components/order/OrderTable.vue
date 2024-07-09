<script setup lang="ts">
import type { Order } from '~/types'

interface Props {
  orders: Order[]
  loading: boolean
}

defineProps<Props>()

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
  <div class="overflow-x-auto rounded-md">
    <table class="min-w-full bg-white ">
      <thead class="bg-gray-100 text-sm text-gray-500 uppercase">
        <tr>
          <!-- <th class="w-10" /> -->
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
          <!-- <td class="p-3">
            <div>
              <UCheckbox class="mr-2" />
            </div>
          </td> -->
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
            <UBadge :color="getStatus(`${i.status?.name}`)" size="md" variant="subtle">
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
            <UPopover>
              <UButton color="gray" variant="ghost" icon="i-fluent-more-16-filled" />
              <template #panel>
                <div class="p-4">
                  <!-- <UButton
                    v-if="i.payment"
                    :to="`/order/${i.code}`"
                    color="gray"
                    variant="ghost"
                    icon="i-fluent-credit-card-20-regular"
                  >
                    {{ $t('payment') }}
                  </UButton> -->
                </div>
              </template>
            </UPopover>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="loading">
      <div class="p-3 text-gray-500 text-center text-lg">
        <Icon name="svg-spinners:180-ring" /> {{ $t('loading') }}
      </div>
    </div>
    <div title="pagination" class="flex items-center justify-center p-3" />
    <!-- <div class="p-3 text-gray-500 text-sm">
      {{ orders.length }} {{ $t('results') }}
    </div> -->
  </div>
</template>
