<script setup lang="ts">
import type { Freelancer, Language, Rating, Village } from '~/types'

interface Props {
  seller: Freelancer
  reviews: Rating[]
}

const props = defineProps<Props>()

const { supabase: db } = useCustomSupabase()

const { languages, village, profileUrl } = useInlineSeller()
const { fetchVillages } = useLocation()

const averageReview = computed(() => {
  const star = props.reviews.reduce((a, b) => a + b.star, 0) / props.reviews.length

  return star
})

function useInlineSeller() {
  const languages = shallowRef<Language[]>([])
  const village = shallowRef<Village>()
  const profileUrl = shallowRef('')

  async function getLanguages() {
    const { data, error } = await db.from('language').select('*').eq('freelancer_id', props.seller.id)

    if (error) {
      throw new Error(`[getLanguages]: error ${error.message}`)
    }

    if (data) {
      languages.value = data
      const villageData = await fetchVillages(`id.eq.${props.seller.village_id}`)

      if (villageData) {
        village.value = villageData[0]
      }
    }
  }

  profileUrl.value = getImageUrl(`${props.seller.profile_url}`)

  onMounted(() => {
    getLanguages()
  })

  return {
    languages,
    village,
    profileUrl,
  }
}
</script>

<template>
  <div>
    <div class="flex space-x-4">
      <NuxtImg class="w-36 h-36 rounded-full object-cover" :src="profileUrl || ''" alt="Souliya" />
      <div class="w-[300px] flex flex-col justify-between gap-y-1">
        <div class="flex items-center space-x-3">
          <p class="font-bold text-xl">
            {{ seller.firstname }} {{ seller.lastname }}
          </p>
          <p class="text-md">
            @{{ seller.username }}
          </p>
        </div>
        <div class="flex items-center gap-x-1">
          <Icon name="line-md:star-alt-filled" class="w-5 h-5" />
          <p class="font-semibold">
            {{ reviews.length }}
          </p>
          (<p class="underline">
            {{ averageReview }}
          </p>)
        </div>
        <div class="flex text-md font-semibold items-center gap-x-3">
          <div class="flex items-center gap-x-1">
            <Icon name="heroicons:chat-bubble-oval-left" class="w-5 h-5" />
            <p>{{ languages.map((item) => item.name).join(', ') }}</p>
          </div>
          <div class="flex items-center gap-x-1">
            <Icon name="heroicons:map-pin" class="w-5 h-5" />
            <p>{{ village?.lo }}, {{ village?.districts?.lo }}, {{ village?.districts?.provinces?.lo }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
