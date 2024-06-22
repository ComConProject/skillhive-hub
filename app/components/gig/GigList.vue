<script setup lang="ts">
import type { Pricing, ProvidingService } from '~/types'

const user = useSupabaseUser()
const { d } = useI18n()
const { supabase } = useCustomSupabase()

function formatGigForCard(gigs: Pricing[]) {
  const formattedGigs = gigs.map((gig) => {
    return {
      id: gig.id,
      isFavorite: false,
      title: `${gig.providing_service?.title}`,
      seller: `${gig.providing_service?.delivery_format.owner.fullname}`,
      img: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      createdAtLabel: d(new Date(gig.created_at), 'short'),
      disabled: false,
      offer: `$${gig.price}`,
      ownerLabel: `${gig.providing_service?.description}`,
    }
  })
  return formattedGigs
}
const gigs = shallowRef<Pricing[]>([])
async function getGigsByPricing() {
  const { data, error } = await supabase.from('pricing').select('*, providing_service(*)').eq('type_id', 41)
  if (error) {
    throw new Error(`[getGigsByPricing]: error ${error}`)
  }

  if (data) {
    gigs.value = data
  }
}

const formattedGigs = computed(() => formatGigForCard(gigs.value))

onMounted(() => {
  getGigsByPricing()
})
</script>

<template>
  <div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-5">
      <GigCard
        v-for="item in formattedGigs" :key="item.id"
        v-bind="item"
        :to="`/${user?.id}/gig/${item.id}/detail`"
      />
    </div>
  </div>
</template>
