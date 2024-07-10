import type { DirectChatAndMessage } from '~/types'

export const useConversations = () => useState<DirectChatAndMessage[]>('conversations', () => [])
