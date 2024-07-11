<script setup lang="ts">
import type { Freelancer, Rating, Skill } from '~/types'

const { username } = useRoute('username-seller___lo').params
const { supabase: db } = useCustomSupabase()

const { seller, reviews, skills } = useInlineSeller()

function useInlineSeller() {
  const seller = shallowRef<Freelancer>()
  const reviews = shallowRef<Rating[]>([])

  async function getSeller() {
    const { data, error } = await db.from('freelancer').select('*').eq('user_id', username).single()
    if (error) {
      throw new Error(`[getSeller]: error ${error.message}`)
    }

    if (data) {
      seller.value = data
      if (seller.value) {
        getReviews(seller.value.id)
        getSkills(seller.value.id)
      }
    }
  }

  // query reviews by using username
  async function getReviews(sellerId: number) {
    const { data, error } = await db.from('rating').select('*').eq('freelancer_id', sellerId)

    if (error) {
      throw new Error(`[getReviews]: error ${error.message}`)
    }

    if (data) {
      reviews.value = data
    }
  }

  const skills = shallowRef<Skill[]>([])
  async function getSkills(sellerId: number) {
    const { data, error } = await db.from('skill').select('*, term(*)').eq('freelancer_id', sellerId)

    if (error) {
      throw new Error(`[getSkills]: error ${error.message}`)
    }

    if (data) {
      skills.value = data
    }
  }

  onMounted(() => {
    getSeller()
  })

  return {
    getSeller,
    getReviews,
    reviews,
    seller,
    skills,
  }
}
</script>

<template>
  <div>
    <div v-if="seller" class="space-y-12">
      <div class="flex flex-col sm:flex-row w-full sm:justify-center p-0 sm:p-6 md:p-16 space-x-0 sm:space-x-3 lg:space-x-16">
        <div class="w-full space-y-8 max-w-[700px]">
          <SellerCard
            :seller="seller"
            :reviews="reviews"
          />
          <div>
            <p class="font-bold text-xl">
              {{ $t('about_me') }}
            </p>
            <p>{{ seller.description }}</p>
          </div>
          <div>
            <p class="font-bold text-xl">
              {{ $t('skill') }}
            </p>
            <p class="flex gap-1 items-center">
              <UBadge
                v-for="skill in skills"
                :key="skill.id" :label="`${skill.name}`"
              />
            </p>
          </div>
        </div>
      </div>
      <SellerGigList :id="seller.id" />
      <!-- <MyGigsList
        seller-username="{params.username}"
      />

      <ReviewsStats
        reviews="{reviews}"
      />
      <Reviews
        reviews="{reviews}"
      /> -->
    </div>
  </div>
</template>
