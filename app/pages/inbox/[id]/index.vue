<script setup lang="ts">
import type { DirectChatAndMessage } from '~/types'

const { id } = useRoute('inbox-id___lo').params

const { fetchConversations } = useMessage()

const conversations = useConversations()
const chatId = useDirectChatId()
async function fetchChats() {
  if (!id)
    return
  const data = await fetchConversations(id)
  chatId.value = id
  if (data) {
    conversations.value = data
  }
}

watchEffect(() => {
  if (id) {
    fetchChats()
  }
})
</script>

<template>
  <div className="h-full flex flex-col items-center justify-center">
    <NuxtImg
      :src="conversations.length ? '/online_message.svg' : '/empty.svg'"
      alt="Empty"
      width="340"
      height="340"
    />
    <h2 className="text-2xl font-semibold mt-6 text-black dark:text-white">
      {{ $t('inbox.welcome') }}!
    </h2>
    <p v-if="!conversations.length" className="text-muted-foreground text-sm mt-2">
      {{ $t('inbox.no_conversation_yet') }}
    </p>
  </div>
</template>
