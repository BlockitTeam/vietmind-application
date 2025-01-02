export type tConversationItem = {
  messageId: number
  conversationId: number
  senderId: string
  receiverId: string
  isRead: boolean
  encryptedMessage: string
  createdAt: string
}
