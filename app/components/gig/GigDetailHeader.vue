<script setup lang="ts">
import type { ProvidingService } from '~/types'

interface Props {
  category: string
  subcategory: string
}

defineProps<Props>()
</script>

<template>
  <div
    className="
            flex
            w-full
            h-fit
            items-center
            space-x-2
            sm:space-x-1
            md:space-x-3
            text-sm
            md:text-md
            "
  >
    <NuxtLinkLocale to="/">
      <Icon name="line-md:home" class="w-5 h-5" />
    </NuxtLinkLocale>
    <p className="text-muted-foreground cursor-default">
      /
    </p>
    <p className="cursor-default">
      {{ category }}
    </p>
    <p className="text-muted-foreground cursor-default">
      /
    </p>
    <div className="font-medium cursor-pointer">
      {{ subcategory }}
    </div>
    <NuxtLinkLocale to="">
      <UButton>
        {{ $t('form.edit') }}
      </UButton>
    </NuxtLinkLocale>
  </div>
</template>
