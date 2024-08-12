<script setup lang="ts">
const conversations = useConversations()
const id = useDirectChatId()
const search = ref('')

const filterConversations = computed(() => {
  if (!search.value)
    return conversations.value

  return conversations.value.filter(i => i.otherUserId.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()))
})
</script>

<template>
  <div>
    <div class="pb-2">
      <UInput v-model="search" :placeholder="$t('inbox.search_conversatons')" trailing-icon="i-carbon-search" />
    </div>
    <p class="text-xs text-slate-500">
      {{ $t('inbox.all_messages') }}
    </p>
    <div class="my-2" />
    <div class="w-full">
      <ul class="flex flex-col gap-y-1">
        <li
          v-for="i in filterConversations" :key="i.chatRoom.id"
        >
          <NuxtLinkLocale active-class="bg-slate-200 dark:bg-slate-800" class="py-2 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all duration-150 rounded-lg px-1 flex justify-between" :to="`/inbox/${id}/${i.chatRoom.id}?id=${i.otherUserId}`">
            <div>
              <p class="font-medium">
                {{ i.otherUserId }}
              </p>
              <small>
                {{ i.lastMessage.content || 'no message yet' }}
              </small>
            </div>
            <div>
              <small v-if="i.lastMessage.created_at">
                <!-- {{ $d(new Date(i.lastMessage.created_at as string)) }} -->
                {{ $d(new Date(i.lastMessage.created_at || '')) }}, {{ new Date(i.lastMessage.created_at || '').toLocaleTimeString() }}
              </small>
            </div>
          </NuxtLinkLocale>
        </li>
      </ul>
    </div>
  </div>
</template>
