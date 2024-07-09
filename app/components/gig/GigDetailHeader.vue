<script setup lang="ts">
interface Props {
  category: string
  subcategory: string
  showEdit?: boolean
  gigId?: number
}
defineProps<Props>()
const user = useSupabaseUser()
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
    <NuxtLinkLocale v-if="showEdit" :to="`/${user?.id}/manage-gig/${gigId}/edit`">
      <UButton>
        {{ $t('form.edit') }}
      </UButton>
    </NuxtLinkLocale>
  </div>
</template>
