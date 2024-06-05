export interface CommentCreateRequest {
  id: number;
  content: string;
  isMe: boolean;
  createdAt: string;
  updatedAt?: string;
  postId: number;
  rating: number;
}