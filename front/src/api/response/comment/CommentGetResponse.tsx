export interface CommentGetResponse {
  id: number,
  content: string,
  isMe: boolean,
  createdAt: string,
  updatedAt?: string,
  rating: number
}