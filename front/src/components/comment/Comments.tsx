import { CommentGetResponse } from "api/response/comment/CommentGetResponse";
import { useEffect, useState } from "react"
import { getComments } from "../../api/Comment";
import { CommentContent } from "./CommentContent";
import { CommentInputForm } from "./CommentInputForm";
import style from "./Comments.module.scss";

interface Props {
  postId: string;
}

export const Comments = ({postId}: Props) => {
  const [comments, setComments] = useState<CommentGetResponse[]>([]);

  useEffect(() => {
    getCommentsData();
  }, [])

  const getCommentsData = async () => {
    const res = await getComments(postId);
    setComments(res);
  }

  return (
    <div className={style.commentDiv}>
      <CommentInputForm setComments={setComments} postId={postId} comments={comments}/>
      <h3>댓글목록</h3>
      <div className={style.commentsItem}>
        {comments.map((comment: CommentGetResponse, i: number) => {
          return <CommentContent comment={comment} key={i} />
        })}
      </div>
    </div>
  )
}