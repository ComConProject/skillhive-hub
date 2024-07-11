<script setup lang="ts">
const { id } = useRoute('inbox-id___lo').params

const idRef = computed(() => {
  return id
})
</script>

<template>
  <div class="">
    <NuxtLinkLocale to="/">
      <!-- <div class="flex items-center gap-x-6 w-full">
        <span class="font-semibold text-2xl">
          Skillhive
        </span>
      </div> -->
    </NuxtLinkLocale>
    <InboxConversationList :id="idRef" />
  </div>
</template>
