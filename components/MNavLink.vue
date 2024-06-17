<script setup lang="ts">
interface Item {
  name: string
  icon?: string
  to?: string
  active?: boolean
  isLast?: boolean
  separate?: boolean
  order?: number
  onClick?: () => void
}
interface Props {
  items: Item[]
  activeClass?: string
  itemClass?: string
  iconSize?: string
  isSetting?: boolean
}
defineProps<Props>()
</script>

<template>
  <div>
    <ul class="grid w-full grid-cols-2 gap-1 sm:flex sm:flex-col sm:gap-1">
      <li
        v-for="(item, index) in items"
        :key="index"
        :class="{
          'mb-2': item.isLast,
        }"
      >
        <hr v-if="item.separate" class="my-1 hidden sm:block">
        <nuxt-link-locale
          :to="item.onClick ? undefined : item.to"
          class="flex gap-2 rounded-md p-2 py-1 dark:text-slate-400"
          :class="{
            'bg-slate-100 text-primary-600 dark:bg-slate-700':
              $route.fullPath === item.to || item.active,
            'cursor-pointer': item.onClick,
          }"
          @click="item.onClick"
        >
          <Icon
            v-if="item.icon"
            :name="`${item.icon}`"
            :size="iconSize || '20'"
          />
          <span>{{ $t(item.name) }} </span>
        </nuxt-link-locale>
      </li>
    </ul>
  </div>
</template>
