<script setup lang="ts">
const items = [{
  label: 'Basic',
  key: 'basic',
}, {
  label: 'Standard',
  key: 'standard',
}, {
  label: 'Premium',
  key: 'premium',
}]

const offer = {
  basic: {
    id: '1',
    title: 'Basic',
    price: 10,
    description: 'Basic description',
    deliveryDays: 5,
    revisions: 10,
    revisionText: 'revisions',
  },
  standard: {
    id: '2',
    title: 'Standard',
    price: 20,
    description: 'Standard description',
    deliveryDays: 10,
    revisions: 20,
    revisionText: 'revisions',
  },
  premium: {
    id: '3',
    title: 'Premium',
    price: 30,
    description: 'Premium description',
    deliveryDays: 15,
    revisions: 30,
    revisionText: 'revisions',
  },
}
</script>

<template>
  <div className="sticky h-fit top-4 z-[1]">
    <UCard>
      <UTabs class="w-full sm:w-[400px]" :items="items">
        <template #item="{ item }">
          <section v-if="item.key === 'basic'">
            <OfferContent :offer="offer.basic" :is-owner="false" />
          </section>
          <section v-if="item.key === 'standard'">
            <OfferContent :offer="offer.standard" :is-owner="false" />
          </section>
          <section v-if="item.key === 'premium'">
            <OfferContent :offer="offer.premium" :is-owner="false" />
          </section>
        </template>
      </UTabs>
    </UCard>
  </div>
</template>
