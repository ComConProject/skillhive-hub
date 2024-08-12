<script setup lang="ts">
import { PackageType } from '~/constants'
import type { Language, ProvidingService, Rating, StripePrice, Village } from '~/types'

const route = useRoute('username-gig-id-detail___lo')

const { id } = route.params
const user = useSupabaseUser()
const { t } = useI18n()

const { supabase } = useCustomSupabase()
const { getAvatarUrl } = useUpload()
const { term, fetchTermById } = useTerm()
const { gig, avatarUrl, averageRating, reviews, languages, basicPricing, standardPricing, premiumPricing } = useInlineGig()
const { fetchVillages } = useLocation()
const village = shallowRef<Village>()
function useInlineGig() {
  const gig = shallowRef<ProvidingService>()
  const stars = shallowRef<number[]>([])
  const reviews = shallowRef<Rating[]>([])
  const avatarUrl = shallowRef<string>('')
  const languages = shallowRef<Language[]>([])
  async function getGig() {
    const { data, error } = await supabase.from('providing_service').select('*, term(*), pricing(*), freelancer(*))').eq('id', id)

    if (error) {
      throw new Error(`[getGig]: error ${error}`)
    }
    if (data) {
      gig.value = data[0] as any
      if (gig.value) {
        // fetch products
        await getAllPriceWithProducts()

        const villageData = await fetchVillages(`id.eq.${gig.value.freelancer?.village_id}`)
        village.value = villageData[0]

        avatarUrl.value = getAvatarUrl(gig.value.delivery_format.owner.profileUrl)
        await fetchTermById(gig.value.term!.parent_id!)
        const { data } = await supabase.from('rating').select('*').eq('service_id', gig.value.id)
        if (data) {
          reviews.value = data
          stars.value = data.map(r => r.star)
        }

        const { data: languageData } = await supabase.from('language').select('*, term(*), freelancer(*)').eq('freelancer_id', gig.value.freelancer_id!)
        if (languageData) {
          languages.value = languageData
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
  const prices = shallowRef<StripePrice[]>([])
  async function getAllPriceWithProducts() {
    if (!gig.value?.pricing) {
      return null
    }
    const stripeId = gig.value?.pricing.map(p => p.stripe_price_id)
    if (stripeId) {
      const priceItems = await Promise.all(
        stripeId.map(async (id) => {
          const { price } = await $fetch<any>(`/api/price/${id}`)
          return price as StripePrice
        }),
      )
      prices.value = priceItems
    }
  }

  const formatPricing = computed(() => {
    if (!gig.value?.pricing)
      return null
    const formatForOffer = gig.value.pricing.map((p) => {
      return {
        id: `${p.id}`,
        price: prices.value.find(pp => pp.id === p.stripe_price_id)?.unit_amount || 0,
        description: `${p.description}`,
        deliveryDays: p.meta_data?.deliveryTime,
        revisions: p.meta_data?.revisions,
        revisionText: t('gig.revisions'),
        title: `${p.package_name}`,
        type: p.type_id,
        stripePriceId: `${p.stripe_price_id}`,
        gigId: `${p.service_id}`,
        freelancerId: gig.value!.freelancer_id,
        freelancerUuid: gig.value!.freelancer!.user_id!,
        isOwner: user.value?.id === gig.value!.freelancer!.user_id!,
      }
    })
    return formatForOffer
  })

  const basicPricing = computed(() => {
    if (!gig.value)
      return null
    const basicPricing = formatPricing.value?.find(p => p.type === PackageType.BASIC)
    return basicPricing!
  })

  const standardPricing = computed(() => {
    if (!gig.value)
      return null
    const standardPricing = formatPricing.value?.find(p => p.type === PackageType.STANDARD)
    return standardPricing!
  })

  const premiumPricing = computed(() => {
    if (!gig.value)
      return null
    const premiumPricing = formatPricing.value?.find(p => p.type === PackageType.PREMIUM)
    return premiumPricing!
  })

  onMounted(() => {
    getGig()
  })

  return {
    gig,
    stars,
    reviews,
    languages,
    getGig,
    avatarUrl,
    averageRating,
    formatPricing,
    basicPricing,
    standardPricing,
    premiumPricing,
  }
}
</script>

<template>
  <div>
    <div v-if="gig" class="flex flex-col sm:flex-row w-full sm:justify-center space-x-0 sm:space-x-3 lg:space-x-16">
      <div class="w-full space-y-8 mb-2">
        <GigDetailHeader :gig-id="gig.id" :show-edit="gig.freelancer?.user_id === user?.id" :category="term?.name" :subcategory="gig.term?.name || ''" />
        <h1 class="text-3xl font-bold break-words text-[#3F3F3F]">
          {{ gig.title }}
        </h1>
        <SellerDetail :avatar="avatarUrl" :name="`${gig.freelancer?.firstname} ${gig.freelancer?.lastname}`" :average-rating="averageRating" :total-rating="reviews.length" />
        <GigImages :items="gig.delivery_format.images.filesPaths" />
        <GigDescription :description="gig.description" />
        <!-- <UAlert icon="i-line-md-alert-square" title="Delivery preferences">
          <template #description>
            <p>Please communicate any preferences or concerns regarding the utilization of AI tools in the fulfillment and/or delivery of your request.</p>
          </template>
        </UAlert> -->
        <SellerDetails
          :role="gig.freelancer?.freelancer_role"
          :profile-url="avatarUrl" :fullname="`${gig.freelancer?.firstname} ${gig.freelancer?.lastname}`"
          :average-rating="averageRating"
          :total-rating="reviews.length"
          :joined="new Date(gig.freelancer?.created_at!)"
          :location="`${village?.lo}, ${village?.districts?.lo}, ${village?.districts?.provinces?.lo}`"
          :description="gig.freelancer?.description"
          :languages="languages"
          :freelancer-id="gig.freelancer_id!"
          :is-owner="user?.id === gig.freelancer?.user_id"
        />
        <ReviewAdd :freelancer-id="gig.freelancer_id!" />
      </div>

      <template v-if="basicPricing && standardPricing && premiumPricing">
        <TheOffers :basic="basicPricing" :standard="standardPricing" :premium="premiumPricing" :is-owner="user?.id === gig.freelancer?.user_id" />
      </template>
    </div>
  </div>
</template>
