<script setup lang="ts">
interface Props {
  to?: string
  avatar?: string
  name?: string
  averageRating?: number
  totalRating?: number
}

defineProps<Props>()

const { username } = useRoute('username-gig-id-detail___lo').params
</script>

<template>
  <div class="flex space-x-4">
    <NuxtLinkLocale to="">
      <UAvatar size="lg" :src="avatar || ''" />
    </NuxtLinkLocale>
    <div class="w-[300px] flex flex-col justify-between gap-y-2">
      <div class="flex items-center">
        <NuxtLinkLocale :to="`/${username}/seller`">
          <p class="font-bold text-lg">
            {{ name }}
          </p>
        </NuxtLinkLocale>
      </div>
      <div class="flex items-center">
        <div class="flex gap-x-1 items-center">
          <Icon name="line-md:star-alt-filled" class="w-5 h-5" />
          <p class="font-semibold">
            {{ averageRating }}
          </p>
          (<p class="underline">
            {{ totalRating }}
          </p>)
        </div>
      </div>
    </div>
  </div>
</template>
