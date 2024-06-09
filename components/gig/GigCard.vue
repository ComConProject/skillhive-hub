<script setup lang="ts">
interface Props {
  isFavorite: boolean
  title: string
  seller: string
  img: string
  createdAtLabel: string
  disabled: boolean
  offer: string
  reviews?: number[]
  ownerLabel: string
  to?: string
}
withDefaults(defineProps<Props>(), {
  isFavorite: false,
  title: 'title',
  seller: 'Souliya Thammavong',
  img: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  createdAtLabel: new Date().toLocaleDateString(),
  disabled: false,
  offer: 'offer',
  ownerLabel: 'I wil do a best service for you',
})
</script>

<template>
  <div>
    <NuxtLinkLocale :to="to">
      <!-- <div class="group aspect-[130/100] border rounded-lg flex flex-col justify-between overflow-hidden">  -->
      <div class="group border rounded-lg flex flex-col justify-between overflow-hidden">
        <div class="relative flex-1 bg-blue-50">
          <!-- <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="tech"> -->
          <GigImage />

          <GigOverlay />

          <button
            class="absolute top-1 right-1 opacity-25 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none"
          >
            <Icon
              name="i-fluent-bookmark-24-filled"
              class="text-black opacity-75 hover:opacity-100 transition-opacity"
            />
          </button>
        </div>
        <GigFooter
          :is-favorite="isFavorite"
          :title="title"
          :seller="seller"
          :created-at-label="createdAtLabel"
          :disabled="disabled"
          :offer="offer"
          :reviews="[1, 2, 3, 4]"
          :owner-label="ownerLabel"
        />
      </div>
    </NuxtLinkLocale>
  </div>
</template>
