import Axios from "./Axios";
import { CommentCreateRequest } from "./request/comment/CommentCreateRequest";
import { CommentUpdateRequest } from "./request/comment/CommentUpdateRequest";

export const commentsSize = async () => {
  try {
    const res = await Axios.get('/comments');
    return res.data[res.data.length-1].id;
  } catch (err) {
    return err;
  }
}

export const getComments = async (postId: string) => {
  try {
    const res = await Axios.get(`/comments?postId=${postId}`);
    return res.data;
  } catch (err) {
    return err;
  }
}

export const postComment = async (req: CommentCreateRequest) => {
  try {
    const res = await Axios.post("/comments", req);
    return res.data;
  } catch (err) {
    return err;
  }
}

export const getComment = async (commentId: number) => {
  try {
    const res = await Axios.get(`/comments/${commentId}`)
    return res.data;
  } catch (err) {
    return err;
  }
}

export const patchComment = async(commentId: number, req: CommentUpdateRequest) =>{
  try {
    const res = await Axios.patch(`/comments/${commentId}`, req);
    return res.data;
  } catch (err) {
    return err;
  }
}

export const deleteComment = async(commentId: number) =>{
  try {
    const res = await Axios.delete(`/comments/${commentId}`);
    return res.data;
  } catch (err) {
    return err;
  }
}