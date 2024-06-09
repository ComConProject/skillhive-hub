<script setup lang="ts">
const user = useSupabaseUser()
</script>

<template>
  <div class="flex space-x-4">
    <NuxtLinkLocale to="">
      <UAvatar size="lg" :src="user?.user_metadata.avatar_url" />
    </NuxtLinkLocale>
    <div class="w-[300px] flex flex-col justify-between gap-y-2">
      <div class="flex items-center">
        <NuxtLinkLocale to="">
          <p class="font-bold text-lg">
            {{ user?.user_metadata.full_name || user?.email }}
          </p>
        </NuxtLinkLocale>
        <div class="bg-yellow-100 text-red-900 font-semibold p-1 ml-auto">
          Tag
        </div>
      </div>
      <div class="flex items-center">
        <div class="flex gap-x-1">
          <Icon name="line-md:star" class="w-5 h-5" />
          <p class="font-semibold">
            4.9
          </p>
          (<p class="underline">
            200
          </p>)
        </div>
      </div>
    </div>
  </div>
</template>
