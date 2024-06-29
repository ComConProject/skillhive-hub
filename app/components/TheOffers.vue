<script setup lang="ts">
interface Offer {
  id: string
  price: number
  description: string
  deliveryDays: number
  revisions: number
  revisionText: string
  title: string
  type?: number | null
}
defineProps<{
  basic: Offer
  standard: Offer
  premium: Offer
}>()
const { t } = useI18n()
const items = [{
  label: t('gig.basic'),
  key: 'basic',
}, {
  label: t('gig.standard'),
  key: 'standard',
}, {
  label: t('gig.premium'),
  key: 'premium',
}]
</script>

<template>
  <div className="sticky h-fit top-4 z-[1]">
    <UCard>
      <UTabs class="w-full sm:w-[400px]" :items="items">
        <template #item="{ item }">
          <section v-if="item.key === 'basic'">
            <OfferContent :offer="basic" :is-owner="false" />
          </section>
          <section v-if="item.key === 'standard'">
            <OfferContent :offer="standard" :is-owner="false" />
          </section>
          <section v-if="item.key === 'premium'">
            <OfferContent :offer="premium" :is-owner="false" />
          </section>
        </template>
      </UTabs>
    </UCard>
  </div>
</template>
