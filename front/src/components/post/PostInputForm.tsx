import { useEffect, useState } from "react"
import { Button } from "../common/Button";
import { PostCreateRequest } from "api/request/post/PostCreateRequest";
import { createPost, getPostLength } from "../../api/Post";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export const PostInputForm = () => {
  const [postId, setPostId] = useState<number>(0);
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    getPostId();
  }, [])

  const getPostId = async () => {
    const postId = await getPostLength();
    setPostId(postId);
  }

  const inputPostContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const content = e.target.value;
    setContent(content);
  }

  const inputPostTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setTitle(title);
  }

  const addPost = async () => {
    if(title === "" || content === "") {
      return alert("제목이나 내용을 입력해 주셔야 합니다.");
    }
    const newPost: PostCreateRequest = {
      id: postId+1,
      title,
      content,
      isMe: true,
      createdAt: moment(new Date()).format('YYYY-MM-DD'),
      updatedAt: "",
    }
    await createPost(newPost).catch((err) => err);
    setContent("");
    setTitle("");
    navigate(-1);
  }
  
  return (
    <div>
      <h1>글 작성</h1>
      <input type="text" onChange={inputPostTitle} value={title} placeholder="제목"/>
      <input type="text" onChange={inputPostContent} value={content} placeholder="내용"/>
      <Button title={"작성"} onClick={addPost}/>
      <Button title="뒤로" onClick={() => navigate(-1)}/>
    </div>
  )
}