import type { DirectChatAndMessage } from '~/types'

export const useConversations = () => useState<DirectChatAndMessage[]>('conversations', () => [])

export const useDirectChatId = () => useState<string>('directChatId', () => '')

export const useCategoryId = () => useState<number | null>('categoryId', () => null)

export const useSearchGigs = () => useState<string>('searchGigs', () => '')

export const useSettingTitle = () => useState<string>('settingTitle', () => '')
