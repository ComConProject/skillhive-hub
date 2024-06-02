<script setup lang="ts">
import { object, string } from 'yup'

const schema = object({
  review: string().notRequired(),
})

const state = useState<any>('review-add-state', () => ({
  review: undefined,
}))

function onSubmit() {}
</script>

<template>
  <div>
    <h1 className="text-3xl font-bold text-neutral-700">
      Add review
    </h1>
    <UForm :schema="schema" :state="state" @submit="onSubmit">
      <UFormGroup name="review">
        <UTextarea v-model="state.review" />
      </UFormGroup>
      <UButton class="mt-2" type="submit">
        Submit
      </UButton>
    </UForm>
  </div>
</template>
