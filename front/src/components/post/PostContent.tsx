import { PostGetResponse } from "api/response/post/PostGetResponse"
import { Link } from "react-router-dom";
import style from "./PostContent.module.scss";

type Props =  {
  post: PostGetResponse;
  isCardView: boolean
}

export const PostContent = ({post, isCardView}: Props) => {

  return (
    <>
      <Link className={isCardView ? style.cardItemLink : style.listItemLink} to={`/post/${post.id}`}>
        <div className={style.cardItemInfo}>
          <p>제목: {post.title.length > 15 ? `${post.title.slice(0, 15)}...` : post.title}</p>
          <p>작성일: {post.createdAt}</p>
        </div>
      </Link>
    </>
  )
}