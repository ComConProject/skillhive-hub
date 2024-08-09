<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
const settingMenus = [
  {
    name: 'settings.your_account',
    path: '/setting/',
    icon: 'line-md:account',
  },
  {
    name: 'settings.application',
    path: '/setting/application',
    icon: 'line-md:laptop',
  },
  {
    name: 'settings.security',
    path: '/setting/security',
    icon: 'fluent:shield-lock-28-filled',
  },
  {
    name: 'settings.payment',
    path: '/setting/payment',
    icon: 'fluent:money-24-filled',
  },
  {
    name: 'settings.about',
    path: '/setting/about',
    icon: 'line-md:question-circle',
  },
]
const settingTitle = useSettingTitle()
settingTitle.value = 'settings.your_account'
function handleSetTitle(title: string) {
  settingTitle.value = title
}
</script>

<template>
  <div class="flex min-h-screen w-full flex-col">
    <main class="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 md:gap-8 md:py-2">
      <div class="mx-auto grid w-full max-w-6xl gap-2">
        <div class="grid grid-cols-2">
          <h1 class="text-3xl font-semibold">
            {{ $t('settings.setting') }}
          </h1>
        </div>
      </div>
      <div class="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav class="grid gap-4 text-sm">
          <NuxtLinkLocale v-for="item in settingMenus" :key="item.path" active-class="font-semibold text-primary underline" :to="`${item.path}`" exact-active-class="font-semibold text-primary underline" class="text-base" @click="handleSetTitle(item.name)">
            <div class="flex items-center gap-2">
              <Icon :name="`${item.icon}`" class="w-5 h-5" />
              {{ $t(item.name) }}
            </div>
          </NuxtLinkLocale>
        </nav>
        <div class="grid gap-6">
          <NuxtPage />
        </div>
      </div>
    </main>
  </div>
</template>
