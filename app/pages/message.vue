<script setup lang="ts">
import type { Database } from '~/database.types'

interface Message {
  created_at: string
  id: number
  message: string | null
  user_id: string | null
}

const supabase = useSupabaseClient<Database>()
const { sendMessage, message, messages } = useInlineMessage()

function useInlineMessage() {
  const message = ref('')
  const messages = ref<Message[]>([])
  async function fetchMessages() {
    const { data, error } = await supabase.from('messages').select('*')
    if (error)
      throw new Error(`[fetchMessages] ${error.message}`)
    messages.value = data
  }

  async function sendMessage() {
    const { error } = await supabase.from('messages').insert({
      message: message.value,
    })
    if (error)
      throw new Error(`[sendData] ${error.message}`)
    message.value = ''
  }

  const channels = supabase.channel('custom-all-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'messages' },
      (payload) => {
        console.log('Change received!', payload)
        fetchMessages()
      },
    )
    .subscribe()

  onMounted(() => {
    fetchMessages()
  })

  onUnmounted(() => {
    channels.unsubscribe()
  })

  return {
    message,
    messages,
    sendMessage,
  }
}
</script>

<template>
  <div>
    <form class="flex gap-2" @submit.prevent="sendMessage">
      <UInput v-model="message" />
      <UButton type="submit">
        Send
      </UButton>
    </form>
    <div class="mt-10">
      <p v-for="msg in messages" :key="msg.id">
        {{ msg.user_id }}: {{ msg.message }}
      </p>
    </div>
  </div>
</template>
