<script setup lang="ts">
interface Props {
  type?: 'select' | 'radio' | 'checkbox'
}

withDefaults(defineProps<Props>(), {
  type: 'select',
})
const modelValue = defineModel<any>()
const { terms, fetchTerms } = useTerm()

await fetchTerms(1)

const options = computed(() => {
  return terms.value.map(i => ({
    value: i.id,
    label: i.name,
  }))
})
</script>

<template>
  <div>
    <template v-if="type === 'select'">
      <USelectMenu v-model="modelValue" :options="options" v-bind="$attrs" />
    </template>
    <template v-if="type === 'checkbox'">
      <URadioGroup v-model="modelValue" :options="options" v-bind="$attrs" />
    </template>
  </div>
</template>
