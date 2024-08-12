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
      <template #header>
        <h2 class="text-xl font-semibold">
          Preferences
        </h2>
      </template>

      <div class="space-y-3">
        <UFormGroup label="Language">
          <USelect v-model="preferences.language" :options="languageOptions" />
        </UFormGroup>
        <UFormGroup label="Theme">
          <USelect v-model="preferences.theme" :options="themeOptions" />
        </UFormGroup>
        <UFormGroup label="Notifications">
          <UToggle v-model="preferences.notifications" />
        </UFormGroup>
        <UButton color="primary" class="mt-4" @click="savePreferences">
          Save Preferences
        </UButton>
      </div>
    </UCard>
  </div>
</template>
