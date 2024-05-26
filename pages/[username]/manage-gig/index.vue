<script setup lang="ts">
const { username } = useRoute('username-manage-gig___lo').params
</script>

<template>
  <div>
    <NuxtLinkLocale :to="`/${username}/manage-gig/create`">
      <UButton>
        Create Gigs
      </UButton>
    </NuxtLinkLocale>
    My gigs
  </div>
</template>
