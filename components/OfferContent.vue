<script setup lang="ts">
interface Offer {
  id: string
  price: number
  description: string
  deliveryDays: number
  revisions: number
  revisionText: string
  title: string
}

interface Props {
  offer: Offer
  isOwner: boolean
}

defineProps<Props>()
</script>

<template>
  <div className="space-y-4 ">
    <div className="flex pb-4 font-bold items-center">
      <h1>
        {{ offer.title }}
      </h1>
      <p className="ml-auto text-2xl">
        ${{ offer.price }}
      </p>
    </div>
    <p>{{ offer.description }}</p>
    <div className="flex flex-col font-semibold text-zinc-700 space-y-2">
      <div className="flex space-x-2">
        <Icon name="i-ph-alarm" />
        <p>{{ offer.deliveryDays }} Days Delivery</p>
      </div>
      <div className="flex space-x-2">
        <Icon name="i-ph-arrows-clockwise" />
        <p>{{ offer.revisions }} {{ offer.revisionText }}</p>
      </div>
    </div>
    <div v-if="isOwner === false" class="flex gap-2">
      <UButton>
        Order Now
      </UButton>
      <UButton variant="outline">
        Send Message
      </UButton>
    </div>
    <UButton v-else>
      <NuxtLink>
        Edit
      </NuxtLink>
    </UButton>
  </div>
</template>
