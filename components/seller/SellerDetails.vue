<script setup lang="ts">
const user = useSupabaseUser()
</script>

<template>
  <div>
    <div class="space-y-3">
      <div class="flex space-x-4">
        <NuxtLink to="">
          <UAvatar size="lg" :src="user?.user_metadata.avatar_url" />
        </NuxtLink>
        <div class="w-fit flex flex-col space-y-2">
          <NuxtLink to="">
            <p class="font-bold text-lg">
              Micheal Schwartz
            </p>
          </NuxtLink>
          <p class="text-md">
            Software Engineer
          </p>
          <div class="flex space-x-5">
            <div class="flex space-x-1.5">
              <Icon name="line-md:star" class="w-5 h-5" />
              <p class="font-semibold">
                4.9
              </p>
              <div class="flex">
                (<p class="underline">
                  200
                </p>)
              </div>
            </div>
            <div class="bg-yellow-100 text-red-900 font-semibold p-1">
              tag
            </div>
          </div>
        </div>
      </div>
      <UButton>
        Contact me
      </UButton>
      <div class="border border-black/20 p-4 space-y-3 rounded-2xl">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-4">
          <div>
            <p class="font-semibold">
              From
            </p>
            <p>1428 Gofno Grove</p>
          </div>
          <div>
            <p class="font-semibold">
              Joined
            </p>
            <p>11/02/2024 03:43:15</p>
          </div>

          <div>
            <p class="font-semibold">
              Last delivery
            </p>
            <p>
              11/02/2024 03:43:15
            </p>
          </div>
          <div>
            <p class="font-semibold">
              Languages
            </p>
            <p>English, Lao</p>
          </div>
        </div>
        <UDivider />
        <p>
          I'm a professional UI/UX engineer and Web developer. I have over 5 years of experience in the web development industry. I make designs with great user experience and modern techniques. I trust my skills and hope you will get the best designs. I love to work and want to make my clients happy.
        </p>
      </div>
    </div>
  </div>
</template>
