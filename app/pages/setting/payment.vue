<script setup>
import { computed, ref } from 'vue'

const columns = [
  { key: 'date', label: 'Date', sortable: true },
  { key: 'description', label: 'Description', sortable: true },
  { key: 'amount', label: 'Amount', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
]

const payments = ref([
  { date: '2024-08-01', description: 'Monthly subscription', amount: 29.99, status: 'Paid' },
  { date: '2024-07-01', description: 'Monthly subscription', amount: 29.99, status: 'Paid' },
  { date: '2024-06-01', description: 'Monthly subscription', amount: 29.99, status: 'Paid' },
  // Add more payment data as needed
])

const currentPage = ref(1)
const itemsPerPage = 10
const totalPages = computed(() => Math.ceil(payments.value.length / itemsPerPage))

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString()
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">
      {{ $t('payment_history_report') }}
    </h1>

    <UCard class="mb-4">
      <UTable :columns="columns" :rows="payments" :sort="{ column: 'date', direction: 'desc' }">
        <template #date-data="{ row }">
          {{ formatDate(row.date) }}
        </template>
        <template #amount-data="{ row }">
          {{ formatCurrency(row.amount) }}
        </template>
      </UTable>
    </UCard>

    <UPagination
      v-model="currentPage"
      class="flex justify-end"
      :total="totalPages"
    />
  </div>
</template>
