<script setup lang="ts">
import type { InferType } from 'yup'
import { TermGroup } from '../../constants'
import type { Term } from '@/types'
import type { FormSubmitEvent } from '#ui/types'

const { t } = useI18n()

const { supabase } = useCustomSupabase()
const { deliveryTimes, pagesOptions, revisions: revisionsOptions, state, schema, getTypes } = useGig()
const { subcategories, getSubcategory, onSubmit, loading: creating, onUpload } = useInlineGig()
const toast = useToast()
const { handleUpload, filePaths } = useUpload()
// define type
type GigSchema = InferType<typeof schema>

const step = ref(1)
const maxlength = shallowRef(260)

function handleNext() {
  step.value++
}

function useInlineGig() {
  const subcategories = ref<Term[]>([])
  const loading = ref(false)

  async function getSubcategory() {
    if (!state.value.categoryId)
      return
    const { data, error } = await supabase.from('term').select('*').eq('parent_id', state.value.categoryId)

    if (error)
      throw new Error(`[getSubcategory] ${error.message}`)

    subcategories.value = data
  }

  const packageTypes = shallowRef<{
    basic: number | null
    standard: number | null
    premium: number | null
  }>(
    {
      basic: null,
      standard: null,
      premium: null,
    },

  )
  async function fetchTypes() {
    const data = await getTypes()

    packageTypes.value.basic = data.find(i => i.name === 'basic')?.id as number
    packageTypes.value.standard = data.find(i => i.name === 'standard')?.id as number
    packageTypes.value.premium = data.find(i => i.name === 'premium')?.id as number
  }

  async function onUpload(e: FileList) {
    Array.from(e).forEach(async (file) => {
      const path = await handleUpload(file)
      if (path) {
        filePaths.value.push(path)
      }
    })
  }

  async function onSubmit(e: FormSubmitEvent<GigSchema>) {
    loading.value = true
    toast.add({
      id: 'inserting',
      title: t('form.inserting'),
    })
    // insert providing_service table
    const { data: serviceData, error } = await supabase.from('providing_service').insert({
      title: e.data.title,
      description: e.data.description,
      term_id: e.data.subCategoryId,
      delivery_format: {
        basic: {
          ...e.data.basic,
          categoryId: e.data.categoryId,
          subcategoryId: e.data.subCategoryId,
        },
        standard: {
          ...e.data.standard,
          categoryId: e.data.categoryId,
          subcategoryId: e.data.subCategoryId,
        },
        premium: {
          ...e.data.premium,
          categoryId: e.data.categoryId,
          subcategoryId: e.data.subCategoryId,
        },
        images: {
          filesPaths: filePaths.value,
        },
      },
    }).select('*')
    if (error?.message) {
      loading.value = false
      throw new Error(`[onSubmit] providing_service table ${error.message}`)
    }

    if (!serviceData) {
      loading.value = false
      throw new Error(`[onSubmit] providing_service table`)
    }

    // insert pricing
    const serviceId = serviceData[0]?.id as number

    const objPricing = [
      {
        service_id: serviceId,
        type_id: packageTypes.value.basic,
        price: e.data.basic.price,
        delivery_timeframe: `${e.data.basic.deliveryTime}`,
        package_name: e.data.basic.title,
        description: e.data.basic.description,
        meta_data: {
          ...e.data.basic,
        },
      },
      {
        service_id: serviceId,
        type_id: packageTypes.value.standard,
        price: e.data.standard.price,
        delivery_timeframe: `${e.data.standard.deliveryTime}`,
        package_name: e.data.standard.title,
        description: e.data.standard.description,
        meta_data: {
          ...e.data.standard,
        },
      },
      {
        service_id: serviceId,
        type_id: packageTypes.value.premium,
        price: e.data.premium.price,
        delivery_timeframe: `${e.data.premium.deliveryTime}`,
        package_name: e.data.premium.title,
        description: e.data.premium.description,
        meta_data: {
          ...e.data.premium,
        },
      },
    ]

    const { data: pricingData, error: pricingError } = await supabase.from('pricing').insert([...objPricing]).select('*')

    if (pricingError?.message) {
      loading.value = false
      throw new Error(`[onSubmit] pricing table ${pricingError.message}`)
    }

    if (!pricingData || pricingData.length === 0) {
      loading.value = false
      throw new Error(`[onSubmit] pricing table`)
    }
    const objsStripe = pricingData.map((item) => {
      return {
        ...item,
      }
    })
    if (!objsStripe) {
      loading.value = false
      throw new Error(`[onSubmit] pricing table`)
    }
    // insert pricing into stripe
    objsStripe.forEach(async (item) => {
      await $fetch<any>('/api/products', {
        method: 'POST',
        body: {
          name: item.package_name,
          description: item.description,
          unit_amount: (item.price || 0) * 100,
          packageId: item.id,
        },
      })
    })

    toast.add({
      title: t('form.success'),
      color: 'green',
      icon: 'i-carbon-checkmark',
    })
    loading.value = false
    useRouter().back()
  }

  onMounted(() => {
    fetchTypes()
  })

  return { subcategories, getSubcategory, onSubmit, loading, onUpload }
}
</script>

<template>
  <div>
    <UCard class="mx-auto max-w-4xl">
      <UForm :schema="schema" :state="state" @submit="onSubmit">
        <TransitionGroup name="slide-left">
          <section v-show="step === 1" key="1" class="space-y-3">
            <UFormGroup name="title" :label="$t('title')" required>
              <UInput v-model="state.title" placeholder="Please input your title" />
            </UFormGroup>
            <UFormGroup required name="description" :label="`${$t('description')} (${`${state.description || ''}`.length || 0}/${maxlength})`">
              <UTextarea v-model="state.description" :maxlength="maxlength" placeholder="Please input your description" />
            </UFormGroup>
            <div class="flex gap-2 items-center">
              <UFormGroup
                name="categoryId" :label="$t('category')" class="flex-1"
              >
                <TermInput v-model="state.categoryId" type="select" :term-group="TermGroup.CATEGORY" is-parent placeholder="Choose a category" @update:model-value="getSubcategory" />
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
              {{ $t('gig.package') }}
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
                    {{ $t('gig.basic') }}
                  </th>
                  <th class="px-2 py-1.5">
                    {{ $t('gig.standard') }}
                  </th>
                  <th class="px-2 py-1.5">
                    {{ $t('gig.premium') }}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                <tr>
                  <td class="px-2 py-1.5">
                   &nbsp;
                  </td>
                  <td class="px-2 py-1.5">
                    <UFormGroup name="basic.title">
                      <UInput v-model="state.basic.title" placeholder="Name of your package" />
                    </UFormGroup>
                  </td>
                  <td class="px-2 py-1.5">
                    <UFormGroup name="standard.title">
                      <UInput v-model="state.standard.title" placeholder="Name of your package" />
                    </UFormGroup>
                  </td>
                  <td class="px-2 py-1.5">
                    <UFormGroup name="premium.title">
                      <UInput v-model="state.premium.title" placeholder="Name of your package" />
                    </UFormGroup>
                  </td>
                </tr>
                <tr>
                  <td class="px-2 py-1.5">
                   &nbsp;
                  </td>
                  <td class="px-2 py-1.5">
                    <UFormGroup name="basic.description">
                      <UTextarea v-model="state.basic.description" placeholder="Describe the details of your offering" />
                    </UFormGroup>
                  </td>
                  <td class="px-2 py-1.5">
                    <UFormGroup name="standard.description">
                      <UTextarea v-model="state.standard.description" placeholder="Describe the details of your offering" />
                    </UFormGroup>
                  </td>
                  <td class="px-2 py-1.5">
                    <UFormGroup name="premium.description">
                      <UTextarea v-model="state.premium.description" placeholder="Describe the details of your offering" />
                    </UFormGroup>
                  </td>
                </tr>
                <tr>
                  <td class="px-2 py-1.5">
                   &nbsp;
                  </td>
                  <td class="px-2 py-1.5">
                    <UFormGroup name="basic.deliveryTime">
                      <USelect v-model="state.basic.deliveryTime" placeholder="Delivery time" :options="deliveryTimes" option-attribute="label" value-attribute="value" />
                    </UFormGroup>
                  </td>
                  <td class="px-2 py-1.5">
                    <UFormGroup name="standard.deliveryTime">
                      <USelect v-model="state.standard.deliveryTime" placeholder="Delivery time" :options="deliveryTimes" option-attribute="label" value-attribute="value" />
                    </UFormGroup>
                  </td>
                  <td class="px-2 py-1.5">
                    <UFormGroup name="premium.deliveryTime">
                      <USelect v-model="state.premium.deliveryTime" placeholder="Delivery time" :options="deliveryTimes" option-attribute="label" value-attribute="value" />
                    </UFormGroup>
                  </td>
                </tr>
                <tr>
                  <td class="px-2 py-1.5">
                    {{ $t('gig.number_of_pages') }}
                  </td>
                  <td class="px-2 py-1.5">
                    <UFormGroup name="basic.page">
                      <USelect v-model="state.basic.page" placeholder="Select" :options="pagesOptions" />
                    </UFormGroup>
                  </td>
                  <td class="px-2 py-1.5">
                    <UFormGroup name="standard.page">
                      <USelect v-model="state.standard.page" placeholder="Select" :options="pagesOptions" />
                    </UFormGroup>
                  </td>
                  <td class="px-2 py-1.5">
                    <UFormGroup name="premium.page">
                      <USelect v-model="state.premium.page" placeholder="Select" :options="pagesOptions" />
                    </UFormGroup>
                  </td>
                </tr>
                <tr>
                  <td class="px-2 py-1.5">
                    {{ $t('gig.design_customization') }}
                  </td>
                  <td class="px-2  py-1.5">
                    <div class="flex justify-center w-full">
                      <UFormGroup name="basic.customDesign">
                        <UCheckbox v-model="state.basic.customDesign" />
                      </UFormGroup>
                    </div>
                  </td>
                  <td class="px-2  py-1.5">
                    <div class="flex justify-center w-full">
                      <UFormGroup name="standard.customDesign">
                        <UCheckbox v-model="state.standard.customDesign" />
                      </UFormGroup>
                    </div>
                  </td>
                  <td class="px-2  py-1.5">
                    <div class="flex justify-center w-full">
                      <UFormGroup name="premium.customDesign">
                        <UCheckbox v-model="state.premium.customDesign" />
                      </UFormGroup>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="px-2 py-1.5">
                    {{ $t('gig.revisions') }}
                  </td>
                  <td class="px-2  py-1.5">
                    <UFormGroup name="basic.revisions">
                      <USelect v-model="state.basic.revisions" :options="revisionsOptions" :placeholder="$t('gig.revisions')" />
                    </UFormGroup>
                  </td>
                  <td class="px-2  py-1.5">
                    <UFormGroup name="standard.revisions">
                      <USelect v-model="state.standard.revisions" :options="revisionsOptions" :placeholder="$t('gig.revisions')" />
                    </UFormGroup>
                  </td>
                  <td class="px-2  py-1.5">
                    <UFormGroup name="premium.revisions">
                      <USelect v-model="state.premium.revisions" :options="revisionsOptions" :placeholder="$t('gig.revisions')" />
                    </UFormGroup>
                  </td>
                </tr>
                <tr>
                  <td class="px-2 py-1.5">
                    {{ $t('price') }}
                  </td>
                  <td class="px-2  py-1.5">
                    <UFormGroup name="basic.price">
                      <UInput v-model="state.basic.price" type="number" :placeholder="$t('price')" />
                    </UFormGroup>
                  </td>
                  <td class="px-2  py-1.5">
                    <UFormGroup name="standard.price">
                      <UInput v-model="state.standard.price" type="number" :placeholder="$t('price')" />
                    </UFormGroup>
                  </td>
                  <td class="px-2  py-1.5">
                    <UFormGroup name="premium.price">
                      <UInput v-model="state.premium.price" type="number" :placeholder="$t('price')" />
                    </UFormGroup>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
          <section v-if="step === 3" key="3">
            <h1 class="mb-2 text-xl font-semibold">
              {{ $t('gig.briefly_description') }}
            </h1>
            <div>
              <UTextarea :rows="10" :placeholder="$t('gig.briefly_description')" />
            </div>
            <UDivider class="my-2" />

            <h1 class="mb-2 text-xl font-semibold">
              {{ $t('upload_images') }}
            </h1>
            <div class="flex gap-1">
              <UInput type="file" class="flex-1" multiple @change="onUpload" />
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
          <UButton v-if="step < 3" @click="handleNext">
            {{ $t('next') }}
          </UButton>
          <UButton v-if="step === 3" type="submit" :loading="creating">
            {{ $t('form.submit') }}
          </UButton>
        </div>
      </UForm>
    </UCard>
  </div>
</template>
