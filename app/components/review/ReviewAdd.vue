<script setup lang="ts">
const props = withDefaults(defineProps<{
  freelancerId: number
  isReviewGig: boolean
}>(), {
  isReviewGig: true,
})

const { id, username } = useRoute('username-gig-id-detail___lo').params

const state = useState<any>('review-add-state', () => ({
  review: '',
  star: 0,
}))

const user = useSupabaseUser()
const { insertReview } = useReview()

async function onSubmit() {
  const obj = {
    buyer_id: user.value?.id as string,
    service_id: Number(id),
    buyer_name: username as string,
    star: 5,
    freelancer_id: props.isReviewGig ? null : props.freelancerId,
    description: state.value.review,
    picture: {},
  }
  await insertReview(obj)
  state.value.review = ''
  state.value.star = 0
}
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-neutral-700">
      {{ $t('review.add') }}
    </h1>
    <UFormGroup name="review">
      <UTextarea v-model="state.review" />
    </UFormGroup>
    <UButton class="mt-2" @click="onSubmit">
      {{ $t('save') }}
    </UButton>
  </div>
</template>
