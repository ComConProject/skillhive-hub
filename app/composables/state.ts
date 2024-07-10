import type { DirectChatAndMessage } from '~/types'

export const useConversations = () => useState<DirectChatAndMessage[]>('conversations', () => [])

export const useDirectChatId = () => useState<string>('directChatId', () => '')
