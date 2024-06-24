<script setup lang="ts">
import type { Language } from '~/types'

interface Props {
  role?: string
  fullname: string
  profileUrl?: string | null
  averageRating?: number
  totalRating?: number
  description?: string | null
  location?: string | null
  joined?: Date | null
  lastDelivery?: Date | null
  languages?: Language[] | null
}
withDefaults(defineProps<Props>(), {
  averageRating: 0,
  totalRating: 0,
  profileUrl: null,
})
const user = useSupabaseUser()
</script>

<template>
  <div>
    <div class="space-y-3">
      <div class="flex space-x-4">
        <NuxtLinkLocale to="">
          <UAvatar size="lg" :src="user?.user_metadata.avatar_url" />
        </NuxtLinkLocale>
        <div class="w-fit flex flex-col space-y-2">
          <NuxtLinkLocale to="">
            <p class="font-bold text-lg">
              {{ user?.user_metadata.full_name || user?.email }}
            </p>
          </NuxtLinkLocale>
          <p class="text-md">
            {{ role }}
          </p>
          <div class="flex space-x-5">
            <div class="flex space-x-1.5">
              <Icon name="line-md:star-alt-filled" class="w-5 h-5" />
              <p class="font-semibold">
                {{ averageRating }}
              </p>
              <div class="flex">
                (<p class="underline">
                  {{ totalRating }}
                </p>)
              </div>
            </div>
          </div>
        </div>
      </div>
      <NuxtLinkLocale to="">
        <UButton>
          {{ $t('contact') }}
        </UButton>
      </NuxtLinkLocale>
      <div class="border border-black/20 p-4 space-y-3 rounded-2xl">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-4">
          <div>
            <p class="font-semibold">
              {{ $t('from') }}
            </p>
            <p>{{ location }}</p>
          </div>
          <div>
            <p class="font-semibold">
              {{ $t('joined') }}
            </p>
            <p>{{ joined ? joined.toDateString() : '-' }}</p>
          </div>

          <!-- <div>
            <p class="font-semibold">
              {{ $t('last_delivery') }}
            </p>
            <p>
              {{ lastDelivery || '-' }}
            </p>
          </div> -->
          <div>
            <p class="font-semibold">
              {{ $t('language') }}
            </p>
            <p v-if="languages">
              <span v-for="item in languages" :key="item.id">
                {{ item.name }}
              </span>
              <span v-if="languages.length > 1">,</span>
            </p>
          </div>
        </div>
        <UDivider />
        <p>
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>
