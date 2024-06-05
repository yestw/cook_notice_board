import { deletePost, getPost, isLikedPost, likedPost, updatePost } from "../../api/Post";
import { PostGetResponse } from "../../api/response/post/PostGetResponse";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "../../components/common/Button";
import { PostUpdateRequest } from "api/request/post/PostUpdateRequest";
import moment from "moment";
import { Comments } from "../comment/Comments";
import { PostLikeRequest } from "api/request/post/PostLikeRequest";
import { v4 as uuidv4 } from 'uuid';
import style from "./Post.module.scss";

export const Post = () => {
  const {postId} = useParams();
  const [post, setPost] = useState<PostGetResponse>()
  const [content, setContent] = useState<string>("")
  const [title, setTitle] = useState<string>("");
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    getPostData(parseInt(postId!));
  }, [])

  const getPostData = async (postId: number) => {
    const post = await getPost(postId); 
    const isLike = await isLikedPost(postId);
    isLike.length > 0 ? setIsLiked(true): setIsLiked(false)
    setPost(post);
  }

  const toggleUpdateForm = () => {
    setIsUpdate(!isUpdate);
  }

  const clickUpdatePost = async () => {
    if(title==="" || content==="") {
      return alert("수정할 제목, 내용을 입력해주세요");
    }
    const req: PostUpdateRequest = {
      title,
      content,
      updatedAt: moment(new Date()).format('YYYY-DD-MM'),
    }
    const result = await updatePost(postId!, req);
    alert('수정되었습니다.')
    setPost(result);
    setContent("")
    setTitle("");
  }

  const clickDeletePost = async() => {
    alert('삭제되었습니다.');
    await deletePost(postId!)
    navigate(-1);
  }

  const likePost = async () => {
    const newLike: PostLikeRequest = {
      id: uuidv4(),
      postId: post?.id!
    }
    await likedPost(newLike);
    if(isLiked) {
      alert('좋아요 취소');
    } else {
      alert('좋아요 등록');
    } 
    setIsLiked(!isLiked);
  }

  return (
    <div className={style.postInfo}>
      <Button
        title={isLiked ? "좋아요 취소" : "좋아요"}
        onClick={likePost}
        className={isLiked === true ? style.liked : style.unLiked}
      />
      <p>제목: {post?.title}</p>
      <p>내용: {post?.content}</p>
      {isUpdate &&
        <>
          <input placeholder="제목" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
          <input placeholder="내용" type="text" value={content} onChange={(e) => setContent(e.target.value)}/>
          <Button title="수정" onClick={clickUpdatePost} />
        </>
      }
      <p>작성일: {post?.createdAt}</p>
      {
          post?.isMe === true ?
            (
              <>
                <Button title={isUpdate === true ? "취소" : "수정"} onClick={toggleUpdateForm} />
                <Button title="삭제" onClick={clickDeletePost} />
              </>
            ) :
              post?.isMe}
        <Button title="뒤로" onClick={() => navigate(-1)}/>
        <Comments postId={postId!}/>
    </div>
  )
}