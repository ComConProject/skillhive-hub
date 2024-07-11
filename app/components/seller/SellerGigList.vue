<script setup lang="ts">
import type { ProvidingService } from '~/types'

const props = defineProps<{
  id: string | number
}>()

const { supabase: db } = useCustomSupabase()
const { username } = useRoute('username-seller___lo').params

const { gigs } = useInlineGigList()

function useInlineGigList() {
  const gigs = shallowRef<ProvidingService[]>([])

  async function getGigs() {
    const { data, error } = await db.from('providing_service').select('*, pricing(*)').eq('freelancer_id', props.id)

    if (error) {
      throw new Error(`[getGigs]: error ${error.message}`)
    }

    if (data) {
      gigs.value = data
    }
  }

  onMounted(() => {
    getGigs()
  })

  return {
    getGigs,
    gigs,
  }
}
</script>

<template>
  <div v-if="gigs">
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
      <UCard v-for="gig in gigs" :key="gig.id">
        <div class="flex justify-between  gap-x-1">
          <div>
            <NuxtImg :src="getImageUrl(`${gig.delivery_format?.images.filesPaths[0]}`) || ''" alt="tech" class="w-full h-16 rounded-md" />
          </div>
          <div class="flex-1">
            {{ gig.description }}
          </div>
        </div>
        <template #footer>
          <div class="flex justify-between items-center">
            <div class="flex flex-col">
              {{ $t('gig.start_at') }}
              <p v-if="gig.pricing" class="font-semibold">
                ${{ formatToDollars((gig.pricing[0]?.price || 0) * 100) }} / {{ $t('project') }}
              </p>
            </div>
            <div>
              <NuxtLinkLocale :to="`/${username}/gig/${gig.id}/detail`">
                <UButton variant="outline" color="gray">
                  <span>More info</span>
                </UButton>
              </NuxtLinkLocale>
            </div>
          </div>
        </template>
      </UCard>
    </div>
  </div>
</template>
