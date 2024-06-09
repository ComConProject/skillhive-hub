<script setup lang="ts">
const switchLocalePath = useSwitchLocalePath()
const { locale } = useI18n()

const availableLocales = [
  {
    label: 'Lao',
    iso: 'lo',
    flag: 'flag:la-4x3',
  },
  {
    label: 'English',
    iso: 'en',
    flag: 'flag:us-4x3',
  },
]
</script>

<template>
  <UPopover>
    <UButton
      color="gray"
      variant="ghost"
      aria-label="Theme"
      icon="i-fluent-globe-28-filled"
    />
    <template #panel>
      <div class="p-4">
        <ul class="flex flex-col gap-1">
          <li v-for="i in availableLocales" :key="i.iso">
            <NuxtLinkLocale
              :to="switchLocalePath(i.iso)"
              class="flex w-full cursor-pointer items-center justify-between gap-2 rounded-md p-1 px-1 transition-all duration-100"
              :class="{
                'bg-[#F3F3F5] dark:bg-slate-800': locale === i.iso,
                'hover:bg-[#F3F3F5] dark:hover:bg-slate-800': locale !== i.iso,
              }"
            >
              <span>
                {{ i.label }}
              </span>
              <Icon :name="i.flag" />
            </NuxtLinkLocale>
          </li>
        </ul>
      </div>
    </template>
  </UPopover>
</template>
