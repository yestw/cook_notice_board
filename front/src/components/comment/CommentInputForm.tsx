import { useEffect, useState } from "react";
import { Input } from "../../components/common/Input"
import { Button } from "../../components/common/Button";
import { commentsSize, postComment } from "../../api/Comment";
import { CommentCreateRequest } from "../../api/request/comment/CommentCreateRequest";
import moment from "moment";
import { CommentGetResponse } from "../../api/response/comment/CommentGetResponse";
import { FaStar } from "react-icons/fa";
import style from "./CommentInputForm.module.scss";
const ARRAY= [0, 1, 2, 3, 4];

interface Props {
  setComments: React.Dispatch<React.SetStateAction<CommentGetResponse[]>>
  postId: string;
  comments: CommentGetResponse[]
}

export const settingRating = (index: number, score: boolean[]): boolean[] => {
  let star = [...score];
  for (let i = 0; i < 5; i++) {
    star[i] = i <= index ? true : false;
  }
  return star;
}

export const CommentInputForm = ({setComments, postId, comments}: Props) => {
  const [content, setContent] = useState<string>("");
  const [id, setId] = useState<number>(0);
  const [score, setScore] = useState([false, false, false, false, false]);
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    settingId();
  }, [comments])

  const settingId = async () => {
    const id: number = parseInt(await commentsSize()) < 0 ? 0 : parseInt(await commentsSize()) +1;
    setId(id);
  }

  const addComment = async () => {
    if(content === "") {
      return alert('댓글을 입력해야 합니다.');
    }
    const newComment: CommentCreateRequest = {
      id,
      content,
      createdAt: moment(new Date()).format('YYYY-MM-DD'),
      updatedAt: "",
      isMe: true,
      postId: parseInt(postId),
      rating
    } 
    const res = await postComment(newComment);
    setComments((prevComments) => [...prevComments, res]);
    setContent("");
    setRating(0);
    setScore([])
  }

  const clickRating = (index: number) => {
    const star: boolean[] = settingRating(index, score);
    setScore(star);
    setRating(index+1);
  }

  return (
    <div className={style.commentInput}>
      <Input type={"text"} title={"댓글 작성"} propValue={content} onChange={(e) => setContent(e.target.value)}/>
      {ARRAY.map((el, index) => (
        <FaStar
          key={index}
          size="14"
          className={score[el] === true ? style.yellowStar : style.noneStar}
          onClick={() => clickRating(index)}
        ></FaStar>
      ))}
      <Button title="작성" onClick={addComment}/>
    </div>
  )
}