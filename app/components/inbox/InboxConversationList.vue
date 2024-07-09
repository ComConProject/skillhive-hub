<script setup lang="ts">
import type { DirectChatAndMessage } from '~/types'

const props = defineProps<{
  id?: string
}>()

const { fetchConversations } = useMessage()

const conversations = shallowRef<DirectChatAndMessage[]>([])
async function fetchChats() {
  if (!props.id)
    return
  const data = await fetchConversations(props.id)

  if (data) {
    conversations.value = data
  }
}

watchEffect(() => {
  if (props.id) {
    fetchChats()
    console.log(props.id)
  }
})
</script>

<template>
  <div>
    <div class="pb-2">
      <UInput :placeholder="$t('inbox.search_conversatons')" trailing-icon="i-carbon-search" />
    </div>
    <p class="text-xs text-slate-500">
      {{ $t('inbox.all_messages') }}
    </p>
    <div class="my-2" />
    <div class="w-full">
      <ul class="flex flex-col gap-y-1">
        <li
          v-for="i in conversations" :key="i.chatRoom.id" class="py-2 px-1 cursor-pointer hover:bg-slate-200 transition-all duration-150 rounded-lg"
        >
          <div class="flex justify-between">
            <div>
              <p class="font-medium">
                {{ i.otherUserId }}
              </p>
              <small>
                {{ i.lastMessage.content }}
              </small>
            </div>
            <div>
              <small>
                <!-- {{ $d(new Date(i.lastMessage.created_at as string)) }} -->
                {{ i.lastMessage.created_at }}
              </small>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
