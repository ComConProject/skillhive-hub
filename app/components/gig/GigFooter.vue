<script setup lang="ts">
interface FooterProps {
  isFavorite: boolean
  title: string
  ownerLabel: string
  createdAtLabel: string
  onClick?: () => void
  disabled: boolean
  offer: string
  reviews: number[]
  seller: string
};

defineProps<FooterProps>()

function handleClick() {

}
</script>

<template>
  <div class="relative bg-white  dark:bg-slate-800 p-3 space-y-2">
    <h3 class="font-bold">
      {{ seller }}
    </h3>
    <p class="text-[14px] font-medium max-w-[calc(100%-20px)]">
      {{ title }}
    </p>
    <div class="flex gap-x-1.5 text-md font-normal">
      <Icon name="line-md:star" class="font-semibold" />
      <p class="underline">
        4.9
      </p>
      <p class="font-normal">
        200
      </p>
      (<p class="font-normal">
        0
      </p>)
    </div>
    <p class="font-semibold">
      From ${{ offer }}
    </p>
    <p class="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate">
      <span>{{ ownerLabel }}</span>, <span>{{ $d(new Date()) }}</span>
    </p>
    <button
      :disabled="disabled"
      class="opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-muted-foreground hover:text-blue-600"
      :class="
        {
          'cursor-not-allowed opacity-75': disabled,
        }
      "
      @click="handleClick"
    >
      <Icon
        name="line-md:star" class="h-4 w-4" :class="{
          'fill-primary-600 text-primary-500': isFavorite,
        }"
      />
    </button>
  </div>
</template>
