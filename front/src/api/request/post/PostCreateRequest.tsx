export interface PostCreateRequest {
  id: number;
  title: string;
  content: string;
  isMe: boolean;
  createdAt: string;
  updatedAt?: string;
}