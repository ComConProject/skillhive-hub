<script setup lang="ts">
const { locale, setLocale } = useI18n()
const preferences = ref({
  language: locale.value,
  notifications: true,
  theme: 'light',
})

const languageOptions = [
  { label: 'Lao', value: 'lo' },
  { label: 'English', value: 'en' },
]

const themeOptions = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
]

const colorMode = useColorMode()
watch(() => preferences.value.theme, () => {
  colorMode.preference = preferences.value.theme === 'dark' ? 'dark' : 'light'
})

watch(() => preferences.value.language, () => {
  setLocale(preferences.value.language)
})

function savePreferences() {
  // Handle saving preferences
  console.log('Preferences saved:', preferences.value)
}
</script>

<template>
  <div class="container mx-auto">
    <h1 class="text-xl font-bold mb-6">
      {{ $t('settings.application') }}
    </h1>

    <UCard>
      <div class="space-y-3">
        <UFormGroup :label="$t('language')">
          <USelect v-model="preferences.language" :options="languageOptions" />
        </UFormGroup>
        <UFormGroup :label="$t('theme')">
          <USelect v-model="preferences.theme" :options="themeOptions" />
        </UFormGroup>
        <UFormGroup :label="$t('notification')">
          <UToggle v-model="preferences.notifications" />
        </UFormGroup>
        <UButton color="primary" class="mt-4" @click="savePreferences">
          {{ $t('save') }}
        </UButton>
      </div>
    </UCard>
  </div>
</template>
