<script setup lang="ts">
import type { Message } from '~/types'

const { roomId, id: inboxId } = useRoute('inbox-id-roomId___lo').params
const { supabase: db } = useCustomSupabase()
const { sendMessage, fetchMessages } = useMessage()
const route = useRoute('inbox-id-roomId___lo')
const { id } = route.query

const message = ref('')
const user = useSupabaseUser()

async function handleSendMassage() {
  if (!message.value) {
    return
  }
  const obj = {
    content: message.value,
    directChatId: roomId as string,
    userId: user.value?.id as any,
  }
  await sendMessage(obj)
  message.value = ''
}

const messages = shallowRef<Message[]>([])
async function getMessages() {
  const data = await fetchMessages(roomId as string)
  messages.value = data
}

const channels = db.channel('custom-all-channel')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'messages' },
    (_) => {
      getMessages()
    },
  )
  .subscribe()

const { fetchConversations } = useMessage()

const conversations = useConversations()
const chatId = useDirectChatId()
async function fetchChats() {
  if (!id)
    return
  const data = await fetchConversations(inboxId)
  chatId.value = inboxId
  if (data) {
    conversations.value = data
  }
}

watchEffect(() => {
  if (inboxId) {
    fetchChats()
  }
})

onMounted(() => {
  getMessages()
})

onUnmounted(() => {
  channels.unsubscribe()
})
</script>

<template>
  <div class="flex flex-col h-screen rounded-md dark:bg-slate-800">
    <!-- Header -->
    <header class="bg-primary-600 dark:bg-primary-900 rounded-md text-white p-4 shadow-md flex items-center gap-1">
      <Icon name="heroicons:arrow-left" class="w-6 h-6 cursor-pointer" @click="$router.back()" />
      <h1 class="text-xl font-bold">
        {{ id }}
      </h1>
    </header>
    <div class="flex-1 overflow-y-auto p-4 space-y-4">
      <div
        v-for="(i, index) in messages"
        :key="index"
        class="flex items-end space-x-2"
        :class="{ 'flex-row-reverse space-x-reverse': i.user_id === user?.id }"
      >
        <div class="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
          <UAvatar
            :src="i.user_id === user?.id ? user?.user_metadata?.full_name : id"
            :alt="i.user_id === user?.id ? user?.user_metadata?.full_name : id"
            class="w-full h-full object-cover"
          />
        </div>
        <div
          class="max-w-xs p-3 rounded-lg"
          :class="[
            i.user_id === user?.id
              ? 'bg-primary-500 text-white'
              : 'bg-white dark:bg-slate-700 dark:text-white',
          ]"
        >
          <p>{{ i.content || '-' }}</p>
          <span class="text-xs opacity-50">{{ $d(new Date(i.created_at || '')) }}, {{ new Date(i.created_at || '').toLocaleTimeString() }}</span>
        </div>
      </div>
    </div>

    <!-- Input area -->
    <div class="bg-white dark:bg-slate-800 border-t dark:border-slate-700 border-gray-200 px-4 py-3">
      <div class="flex space-x-3 items-center">
        <UInput
          v-model="message"
          type="text"
          placeholder="Type a message..."
          class="flex-1"
          @keyup.enter="handleSendMassage"
        />
        <UButton @click="handleSendMassage">
          {{ $t('send') }}
        </UButton>
      </div>
    </div>
  </div>
</template>
