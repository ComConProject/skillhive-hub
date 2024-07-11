<script setup lang="ts">
import { PackageType } from '~/constants'
import type { Pricing, ProvidingService, Rating } from '~/types'

const user = useSupabaseUser()
const { d } = useI18n()
const { supabase } = useCustomSupabase()

const search = useSearchGigs()
const categoryId = useCategoryId()

function formatGigForCard(gigs: ProvidingService[], rating: Rating[]) {
  const formattedGigs = gigs.map((gig) => {
    return {
      id: gig.id as number,
      isFavorite: false,
      title: `${gig?.title}`,
      seller: `${gig?.delivery_format.owner.fullname}`,
      img: getImageUrl(gig?.delivery_format?.images?.filesPaths[0] || ''),
      createdAtLabel: d(new Date(gig.created_at)),
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
  const filterCondition = categoryId.value ? `term_id.eq.${categoryId.value}` : ''
  let query = supabase.from('providing_service').select('*, pricing(*)')
  if (filterCondition) {
    query = query.or(filterCondition)
  }
  const { data, error } = await query
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

function clearFilter() {
  categoryId.value = null
  search.value = ''
  getGigsByPricing()
}

const formattedGigs = computed(() => {
  if (!search.value) {
    return formatGigForCard(gigs.value, rating.value)
  }
  const filterGigs = gigs.value.filter((i) => {
    return i.title.toLowerCase().includes(search.value.toLowerCase())
  })
  return formatGigForCard(filterGigs, rating.value)
},
)
onMounted(() => {
  getGigsByPricing()
})

watch(categoryId, () => {
  if (categoryId.value) {
    getGigsByPricing()
  }
})
</script>

<template>
  <div>
    <div v-if="formattedGigs.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-5">
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
      <section title="action">
        <NuxtLinkLocale to="/">
          <UButton @click="clearFilter">
            {{ $t('clear_filter') }}
          </UButton>
        </NuxtLinkLocale>
      </section>
    </div>
  </div>
</template>
