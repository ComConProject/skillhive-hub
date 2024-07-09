import type { Database } from '~/database.types'

export interface MessageObj {
  content: string
  directChatId: string
  userId: string
}

export type Message = Database['public']['Tables']['messages']['Row']
export type DirectChatRoom = Database['public']['Tables']['direct_chat_rooms']['Row']

export interface DirectChatAndMessage {
  chatRoom: DirectChatRoom
  lastMessage: Message
  otherUserId: any
}
