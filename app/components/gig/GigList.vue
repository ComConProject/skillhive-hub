<script setup lang="ts">
import { PackageType } from '~/constants'
import type { Pricing, ProvidingService, Rating } from '~/types'

const user = useSupabaseUser()
const { d } = useI18n()
const { supabase } = useCustomSupabase()

function formatGigForCard(gigs: ProvidingService[], rating: Rating[]) {
  const formattedGigs = gigs.map((gig) => {
    return {
      id: gig.id as number,
      isFavorite: false,
      title: `${gig?.title}`,
      seller: `${gig?.delivery_format.owner.fullname}`,
      img: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      createdAtLabel: d(new Date(gig.created_at), 'short'),
      disabled: false,
      offer: `${gig.pricing?.find(i => i.term?.id === PackageType.BASIC)?.price || 0}`,
      ownerLabel: `${gig?.description}`,
      reviews: rating.length ? rating.filter(r => r.service_id === gig.id).map(r => r.star) : [],
    }
  })
  return formattedGigs
}
const gigs = shallowRef<ProvidingService[]>([])
const rating = shallowRef<Rating[]>([])
async function getGigsByPricing() {
  const { data, error } = await supabase.from('providing_service').select('*, pricing(*)')
  if (error) {
    throw new Error(`[getGigsByPricing]: error ${error}`)
  }

  if (data) {
    gigs.value = data
    const { data: ratingData, error } = await supabase.from('rating').select('*')

    if (error) {
      console.error(error.message)
    }
    if (ratingData) {
      rating.value = ratingData
    }
  }
}

const formattedGigs = computed(() => formatGigForCard(gigs.value, rating.value))

onMounted(() => {
  getGigsByPricing()
})
</script>

<template>
  <div>
    <div v-if="formattedGigs" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-5">
      <GigCard
        v-for="item in formattedGigs" :key="item.id"
        v-bind="item"
        :to="`/${user?.id}/gig/${item.id}/detail`"
      />
    </div>
    <div v-else class="flex justify-center flex-col items-center space-y-3">
      <NuxtImg src="/empty-package.svg" alt="Empty" width="300" height="300" />
      <p class="text-lg font-semibold">
        {{ $t('no_data') }}
      </p>
    </div>
  </div>
</template>
