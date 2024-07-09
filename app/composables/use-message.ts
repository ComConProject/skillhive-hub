import type { Message } from 'yup'
import type { MessageObj } from '~/types'

export function useMessage() {
  const message = useState('message', () => '')

  const { supabase: db } = useCustomSupabase()

  async function createDirectChatRoom(sellerId: number, buyerId: string) {
    const { data, error } = await db.from('direct_chat_rooms').insert({
      seller_id: sellerId,
      buyer_id: buyerId,
    }).select('*').single()

    if (error) {
      throw new Error(`[createDirectChatRoom]: error ${error.message}`)
    }

    return data
  }

  async function fetchChatRoomBySellerIdAndUserId(sellerId: number, buyerId: string) {
    const { data, error } = await db
      .from('direct_chat_rooms')
      .select('id')
      .match({ seller_id: sellerId, buyer_id: buyerId })
      .single()

    if (error) {
      throw new Error(`[fetchChatRoomId]: error ${error.message}`)
    }

    return data
  }

  async function fetchChatRoomById(id: string | number) {
    const { data, error } = await db.from('direct_chat_rooms').select('*').eq('id', id).single()

    if (error) {
      throw new Error(`[fetchChatRoomById]: error ${error.message}`)
    }

    return data
  }

  async function fetchConversations(userId: string | number) {
    try {
    // Determine if userId is a number or a string
      const isNumber = !Number.isNaN(Number(userId))
      console.log(userId)
      // Build the appropriate filter condition
      const filterCondition = isNumber
        ? `seller_id.eq.${userId}`
        : `buyer_id.eq.${userId}`

      console.log(filterCondition)

      // Fetch all direct chat rooms where the user is involved
      const { data: chatRooms, error: chatRoomError } = await db
        .from('direct_chat_rooms')
        .select('*')
        .or(filterCondition)
        .order('created_at', { ascending: false })

      if (chatRoomError) {
        throw chatRoomError
      }

      // Fetch conversations and handle errors
      const conversations = await Promise.all(
        chatRooms.map(async (chatRoom) => {
          try {
          // Fetch the latest message for each chat room
            const { data, error: messageError } = await db
              .from('messages')
              .select('*')
              .eq('direct_chat_id', chatRoom.id)
              .order('created_at', { ascending: false })
              .limit(1)

            if (messageError) {
              throw messageError
            }
            let lastMessage: Message[] = []

            if (data.length > 0) {
              lastMessage = data
            }
            else {
              lastMessage = []
            }
            return {
              chatRoom,
              lastMessage,
              otherUserId: isNumber ? chatRoom.buyer_id : chatRoom.seller_id,
            }
          }
          catch (error) {
            console.error(`Error fetching messages for chat room ${chatRoom.id}:`, error.message)
            return null // Handle error for individual chat room query
          }
        }),
      )

      // Filter out null values (if any) due to errors in individual message queries
      const validConversations = conversations.filter(conversation => conversation !== null)

      return validConversations
    }
    catch (error) {
      console.error('Error fetching conversations:', error.message)
      return [] // Handle overall error in fetching conversations
    }
  }

  async function sendMessage(obj: MessageObj) {
    const { content, directChatId, userId } = obj

    const { error } = await db.from('messages').insert({
      direct_chat_id: directChatId,
      content,
      user_id: userId,
    })

    if (error) {
      throw new Error(`[sendMessage]: error ${error.message}`)
    }
  }

  return {
    message,
    createDirectChatRoom,
    sendMessage,
    fetchChatRoomBySellerIdAndUserId,
    fetchChatRoomById,
    fetchConversations,
  }
}
