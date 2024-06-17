<script setup lang="ts">
import type { Term } from '~/types'

interface Props {
  type?: 'select' | 'radio' | 'checkbox'
  termGroup: number
}

const props = withDefaults(defineProps<Props>(), {
  type: 'select',
})
const modelValue = defineModel<any>()
const { fetchTerms } = useTerm()
const { options } = useInlineTerm()

function useInlineTerm() {
  const terms = shallowRef<Term[]>([])
  async function getTerm() {
    terms.value = await fetchTerms(props.termGroup)
  }

  const options = computed(() => {
    return terms.value.map(i => ({
      value: i.id,
      label: i.name,
    }))
  })

  onMounted(() => {
    getTerm()
  })

  return {
    options,
    terms,
  }
}
</script>

<template>
  <div>
    <template v-if="type === 'select'">
      <USelectMenu v-model="modelValue" :options="options" value-attribute="value" option-attribute="label" v-bind="$attrs" />
    </template>
    <template v-if="type === 'checkbox'">
      <URadioGroup v-model="modelValue" :options="options" v-bind="$attrs" />
    </template>
  </div>
</template>
