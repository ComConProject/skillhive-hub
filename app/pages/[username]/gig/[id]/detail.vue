<script setup lang="ts">
import type { ProvidingService, Rating } from '~/types'

const route = useRoute('username-gig-id-detail___lo')

const { id } = route.params

const { supabase } = useCustomSupabase()
const { getAvatarUrl } = useUpload()
const { term, fetchTermById } = useTerm()
const { gig, avatarUrl, averageRating, reviews } = useInlineGig()

function useInlineGig() {
  const gig = shallowRef<ProvidingService>()
  const stars = shallowRef<number[]>([])
  const reviews = shallowRef<Rating[]>([])
  const avatarUrl = shallowRef<string>('')
  async function getGig() {
    const { data, error } = await supabase.from('providing_service').select('*, term(*), pricing(*), freelancer(*)').eq('id', id)

    if (error) {
      throw new Error(`[getGig]: error ${error}`)
    }
    if (data) {
      gig.value = data[0] as any
      console.log(gig.value)
      if (gig.value) {
        avatarUrl.value = getAvatarUrl(gig.value.delivery_format.owner.profileUrl)
        await fetchTermById(gig.value.term!.parent_id!)
        const { data } = await supabase.from('rating').select('*').eq('service_id', gig.value.id)
        if (data) {
          reviews.value = data
          stars.value = data.map(r => r.star)
        }
      }
    }
  }

  const averageRating = computed(() => {
    if (stars.value.length === 0) {
      return 0
    }
    return stars.value.reduce((a, b) => a + b, 0) / stars.value.length
  })

  onMounted(() => {
    getGig()
  })

  return {
    gig,
    stars,
    reviews,
    getGig,
    avatarUrl,
    averageRating,
  }
}
</script>

<template>
  <div v-if="gig">
    <div class="flex flex-col sm:flex-row w-full sm:justify-center space-x-0 sm:space-x-3 lg:space-x-16">
      <div class="w-full space-y-8 mb-2">
        <GigDetailHeader :category="term?.name" :subcategory="gig.term?.name || ''" />
        <h1 class="text-3xl font-bold break-words text-[#3F3F3F]">
          {{ gig.title }}
        </h1>
        <SellerDetail :avatar="avatarUrl" :name="`${gig.freelancer?.firstname} ${gig.freelancer?.lastname}`" :average-rating="averageRating" :total-rating="reviews.length" />
        <GigImages />
        <GigDescription />
        <UAlert icon="i-line-md-alert-square" title="Delivery preferences">
          <template #description>
            <p>Please communicate any preferences or concerns regarding the utilization of AI tools in the fulfillment and/or delivery of your request.</p>
          </template>
        </UAlert>
        <SellerDetails />
        <ReviewAdd />
      </div>
      <TheOffers />
    </div>
  </div>
</template>
