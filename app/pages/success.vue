<script setup lang="ts">
const route = useRoute()

async function getStripeSession() {
  const { session } = await $fetch('/api/checkout', {
    method: 'GET',
    query: {
      session_id: route.query.session_id,
    },
  })

  if (session) {
    navigateTo(`/?email=${session.metadata?.email}`)
  }
}

if (route.query.session_id) {
  await getStripeSession()
}
</script>

<template>
  <UCard class="mx-auto max-w-3xl">
    <section class="text-center flex items-center justify-center flex-col space-y-3">
      <div>
        <NuxtImg src="/successful_purchase.svg" alt="Successful purchase" width="300" height="300" />
      </div>
      <div>
        <Icon name="material-symbols:check-circle-outline" size="50" class="text-green-500" />
      </div>
      <h1 class="text-3xl font-bold">
        {{ $t('successful_purchase') }}
      </h1>

      <!-- button to go to order page -->
      <div>
        <UButton to="/orders" icon="i-heroicons-arrow-up-right">
          {{ $t('go_to_orders') }}
        </UButton>
      </div>
    </section>
  </UCard>
</template>
