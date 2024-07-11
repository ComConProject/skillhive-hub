<script setup lang="ts">
type InputType = 'text' | 'number' | 'select'

interface Props {
  type?: InputType
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
})

const modelValue = defineModel<string | number>('search', {
  default: 'Hello default',
})

const cities = [
  {
    label: 'New York',
    value: 'new-york',
  },
  {
    label: 'London',
    value: 'london',
  },
  {
    label: 'Paris',
    value: 'paris',
  },
]
</script>

<template>
  <div>
    <template v-if="type === 'text'">
      <UInput v-model="modelValue" v-bind="$attrs" />
    </template>
    <template v-if="type === 'number'">
      <UInput v-model="modelValue" type="number" v-bind="$attrs" />
    </template>
    <template v-if="type === 'select'">
      <USelect v-model="modelValue" :options="cities" v-bind="$attrs" />
    </template>
  </div>
</template>
