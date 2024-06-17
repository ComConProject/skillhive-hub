<script setup lang="ts">
import { type InferType, object, string } from 'yup'
import { TermGroup } from '../../constants'
import type { Term } from '~/types'
import type { FormSubmitEvent } from '#ui/types'

const schema = object({
  title: string().required('Title is required'),
  description: string().required('Description is required'),
})

const state = useState<any>('gig-create-state', () => ({
  categoryId: undefined,
  subCategoryId: undefined,
  title: undefined,
  description: undefined,
}))

type Schema = InferType<typeof schema>

const { supabase } = useCustomSupabase()
const { subcategories, getSubcategory, onSubmit } = useInlineGig()

const step = ref(1)
const loading = ref(false)
const maxlength = shallowRef(260)

function useInlineGig() {
  const subcategories = ref<Term[]>([])

  async function getSubcategory() {
    if (!state.value.categoryId)
      return
    const { data, error } = await supabase.from('term').select('*').eq('parent_id', state.value.categoryId)

    if (error)
      throw new Error(`[getSubcategory] ${error.message}`)

    subcategories.value = data
  }

  function onSubmit(e: FormSubmitEvent<Schema>) {
    console.log(e.data)
  }

  return { subcategories, getSubcategory, onSubmit }
}
</script>

<template>
  <div>
    <UCard class="mx-auto max-w-4xl">
      <UForm :schema="schema" :state="state" @submit="onSubmit">
        <TransitionGroup name="slide-left">
          <section v-show="step === 1" key="1" class="space-y-3">
            <UFormGroup name="title" :label="$t('title')" required>
              <UInput placeholder="Please input your title" />
            </UFormGroup>
            <UFormGroup required name="description" :label="`${$t('description')} (${state.description?.length || 0}/${maxlength})`">
              <UTextarea v-model="state.description" :maxlength="maxlength" placeholder="Please input your description" />
            </UFormGroup>
            <div class="flex gap-2 items-center">
              <UFormGroup
                name="categoryId" :label="$t('category')" class="flex-1"
              >
                <TermInput v-model="state.categoryId" type="select" :term-group="TermGroup.CATEGORY" placeholder="Choose a category" @update:model-value="getSubcategory" />
              </UFormGroup>
              <UFormGroup
                name="subcategoryId" :label="$t('subcategory')" class="flex-1"
              >
                <USelectMenu v-model="state.subCategoryId" :disabled="!state.categoryId" :options="subcategories" value-attribute="id" option-attribute="name" placeholder="Choose a subcategory" />
              </UFormGroup>
            </div>
          </section>
          <section v-show="step === 2" key="2">
            <!-- pricing table that has basic, standard, and premium -->
            <div class=" text-3xl col-span-2 font-bold text-slate-800 mb-4">
              Package
            </div>
            <table class="table-auto w-full text-left">
              <thead
                class="border-y border-slate-100 dark:border-slate-800"
              >
                <tr>
                  <th class="px-2 py-1.5">
                    &nbsp;
                  </th>
                  <th class="px-2 py-1.5">
                    Basic
                  </th>
                  <th class="px-2 py-1.5">
                    Standard
                  </th>
                  <th class="px-2 py-1.5">
                    Premium
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                <tr>
                  <td class="px-2 py-1.5">
                   &nbsp;
                  </td>
                  <td class="px-2 py-1.5">
                    <UInput placeholder="Name of your package" />
                  </td>
                  <td class="px-2 py-1.5">
                    <UInput placeholder="Name of your package" />
                  </td>
                  <td class="px-2 py-1.5">
                    <UInput placeholder="Name of your package" />
                  </td>
                </tr>
                <tr>
                  <td class="px-2 py-1.5">
                   &nbsp;
                  </td>
                  <td class="px-2 py-1.5">
                    <UTextarea placeholder="Describe the details of your offering" />
                  </td>
                  <td class="px-2 py-1.5">
                    <UTextarea placeholder="Describe the details of your offering" />
                  </td>
                  <td class="px-2 py-1.5">
                    <UTextarea placeholder="Describe the details of your offering" />
                  </td>
                </tr>
                <tr>
                  <td class="px-2 py-1.5">
                   &nbsp;
                  </td>
                  <td class="px-2 py-1.5">
                    <USelect placeholder="Delivery time" />
                  </td>
                  <td class="px-2 py-1.5">
                    <USelect placeholder="Delivery time" />
                  </td>
                  <td class="px-2 py-1.5">
                    <USelect placeholder="Delivery time" />
                  </td>
                </tr>
                <tr>
                  <td class="px-2 py-1.5">
                    Number of pages
                  </td>
                  <td class="px-2 py-1.5">
                    <USelect placeholder="Select" />
                  </td>
                  <td class="px-2 py-1.5">
                    <USelect placeholder="Select" />
                  </td>
                  <td class="px-2 py-1.5">
                    <USelect placeholder="Select" />
                  </td>
                </tr>
                <tr>
                  <td class="px-2 py-1.5">
                    Content upload
                  </td>
                  <td class="px-2 py-1.5">
                    <div class="flex justify-center w-full">
                      <UCheckbox />
                    </div>
                  </td>
                  <td class="px-2 py-1.5">
                    <div class="flex justify-center w-full">
                      <UCheckbox />
                    </div>
                  </td>
                  <td class="px-2 py-1.5">
                    <div class="flex justify-center w-full">
                      <UCheckbox />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="px-2 py-1.5">
                    Design customization
                  </td>
                  <td class="px-2  py-1.5">
                    <div class="flex justify-center w-full">
                      <UCheckbox />
                    </div>
                  </td>
                  <td class="px-2  py-1.5">
                    <div class="flex justify-center w-full">
                      <UCheckbox />
                    </div>
                  </td>
                  <td class="px-2  py-1.5">
                    <div class="flex justify-center w-full">
                      <UCheckbox />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="px-2 py-1.5">
                    Responsive design
                  </td>
                  <td class="px-2  py-1.5">
                    <div class="flex justify-center w-full">
                      <UCheckbox />
                    </div>
                  </td>
                  <td class="px-2  py-1.5">
                    <div class="flex justify-center w-full">
                      <UCheckbox />
                    </div>
                  </td>
                  <td class="px-2  py-1.5">
                    <div class="flex justify-center w-full">
                      <UCheckbox />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="px-2 py-1.5">
                    Include source code
                  </td>
                  <td class="px-2  py-1.5">
                    <div class="flex justify-center w-full">
                      <UCheckbox />
                    </div>
                  </td>
                  <td class="px-2  py-1.5">
                    <div class="flex justify-center w-full">
                      <UCheckbox />
                    </div>
                  </td>
                  <td class="px-2  py-1.5">
                    <div class="flex justify-center w-full">
                      <UCheckbox />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="px-2 py-1.5">
                    Revisions
                  </td>
                  <td class="px-2  py-1.5">
                    <USelect placeholder="Select" />
                  </td>
                  <td class="px-2  py-1.5">
                    <USelect placeholder="Select" />
                  </td>
                  <td class="px-2  py-1.5">
                    <USelect placeholder="Select" />
                  </td>
                </tr>
                <tr>
                  <td class="px-2 py-1.5">
                    {{ $t('price') }}
                  </td>
                  <td class="px-2  py-1.5">
                    <UInput type="number" placeholder="Price" />
                  </td>
                  <td class="px-2  py-1.5">
                    <UInput type="number" placeholder="Price" />
                  </td>
                  <td class="px-2  py-1.5">
                    <UInput type="number" placeholder="Price" />
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
          <section v-if="step === 3" key="3">
            <h1 class="mb-2 text-xl font-semibold">
              {{ $t('description') }}
            </h1>
            <div>
              <UTextarea :rows="10" placeholder="Briefly Describe Your Gig" />
            </div>
            <UDivider class="my-2" />

            <h1 class="mb-2 text-xl font-semibold">
              {{ $t('upload_images') }}
            </h1>
            <div class="flex gap-1">
              <UInput type="file" class="flex-1" multiple />
              <UButton>{{ $t('upload') }}</UButton>
            </div>
          </section>
        </TransitionGroup>
        <div class="flex gap-1 mt-4 items-center col-span-2">
          <UButton v-if="step === 1" variant="outline" @click="$router.back()">
            {{ $t('go_back') }}
          </UButton>
          <UButton v-if="step > 1" variant="outline" @click="step--">
            {{ $t('go_back') }}
          </UButton>
          <UButton v-if="step < 3" @click="step++">
            {{ $t('next') }}
          </UButton>
          <UButton v-if="step === 3" type="submit" :loading="loading">
            {{ $t('form.submit') }}
          </UButton>
        </div>
      </UForm>
    </UCard>
  </div>
</template>
