import { CommentGetResponse } from "api/response/comment/CommentGetResponse";
import { Button } from "../../components/common/Button";
import { useState } from "react";
import { Input } from "../../components/common/Input";
import { deleteComment, patchComment } from "../../api/Comment";
import { CommentUpdateRequest } from "../../api/request/comment/CommentUpdateRequest";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import style from "./CommentContent.module.scss";
import { FaStar } from "react-icons/fa";

type Props =  {
  comment: CommentGetResponse;
}

export const CommentContent = ({comment}: Props) => {
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [commentContent, setCommentContent] = useState<CommentGetResponse>(comment);
  const navigate = useNavigate();

  const updateComment = async () => {
    const updateReq: CommentUpdateRequest = {
      content,
      updatedAt: moment(new Date()).format('YYYY-MM-DD'),
    }  
    const result = await patchComment(comment.id, updateReq)
    alert('수정되었습니다.')
    setCommentContent(result);
    setContent("");
  }

  const commentDelete = async () => {
    alert('삭제 되었습니다.');
    await deleteComment(comment.id)
    navigate(0);
  }

  return (
    <div className={style.commentDiv}>
      <p>내용: {commentContent.content}</p>
      <p>작성일: {commentContent.createdAt}</p>
      <p>평점: {commentContent.rating === undefined ? 0 : commentContent.rating }</p>
      {Array.from({length: 5}).map((_, index: number) => {
        return (
          <FaStar key={index} className={index < commentContent.rating ? style.yellowStar : style.noneStar} />
        )
      })}
      {commentContent.isMe && (
        <>
          {isUpdated && (
            <>
              <Input type="text" title="내용" propValue={content} onChange={(e) => setContent(e.target.value)}/>
              <Button title="수정" onClick={updateComment}/>
            </>
          )}
          <div>
            <Button title={isUpdated === true ? "취소": "수정"} onClick={()=> setIsUpdated(!isUpdated)}/>
            <Button title="삭제" onClick={commentDelete}/>
          </div>
        </>
      )}
    </div>
  )
}