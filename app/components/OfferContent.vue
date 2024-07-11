<script setup lang="ts">
interface Offer {
  id: string
  price: number
  description: string
  deliveryDays: number
  revisions: number
  revisionText: string
  title: string
  stripePriceId: string
  gigId: string
  freelancerId: string | number | null
  freelancerUuid: string | null
}

interface Props {
  offer: Offer
  isOwner: boolean
}
const props = defineProps<Props>()
const user = useSupabaseUser()
const loading = ref(false)
async function createCheckoutSession() {
  loading.value = true
  const body = {
    priceId: props.offer.stripePriceId,
    pricingId: props.offer.id,
    userId: user.value?.id,
    email: user.value?.email,
    gigId: props.offer.gigId,
    totalPrice: props.offer.price,
    customer: user.value?.user_metadata?.full_name || user.value?.email,
    freelancerId: props.offer.freelancerId,
    freelancerUuid: props.offer.freelancerUuid,
  }
  const { url } = await $fetch<any>('/api/checkout', {
    method: 'POST',
    body,
  })
  if (url) {
    window.location.href = url
    loading.value = false
  }
  loading.value = false
}
</script>

<template>
  <div className="space-y-4 ">
    <div className="flex pb-4 font-bold items-center">
      <h1>
        {{ offer.title }}
      </h1>
      <p className="ml-auto text-2xl">
        ${{ formatToDollars(offer.price) }}
      </p>
    </div>
    <p>{{ offer.description }}</p>
    <div className="flex flex-col font-semibold text-zinc-700 space-y-2">
      <div className="flex space-x-2">
        <Icon name="i-ph-alarm" />
        <p>{{ offer.deliveryDays }} {{ $t('gig.days_delivery') }}</p>
      </div>
      <div className="flex space-x-2">
        <Icon name="i-ph-arrows-clockwise" />
        <p>{{ offer.revisions }} {{ offer.revisionText }}</p>
      </div>
    </div>
    <div v-if="isOwner === false" class="flex gap-2">
      <UButton :loading="loading" @click="createCheckoutSession">
        {{ $t('offer.order') }}
      </UButton>
      <UButton variant="outline">
        {{ $t('offer.send_message') }}
      </UButton>
    </div>
    <UButton v-else>
      <NuxtLinkLocale>
        {{ $t('form.edit') }}
      </NuxtLinkLocale>
    </UButton>
  </div>
</template>
