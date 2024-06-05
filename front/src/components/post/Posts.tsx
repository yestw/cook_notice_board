import { createContext, useContext, useEffect, useState } from "react"
import { PostGetResponse } from "api/response/post/PostGetResponse";
import { GetPostsParams, getPosts } from "../../api/Post";
import { PostContent } from "./PostContent";
import { Link } from "react-router-dom";
import { PostSearchInput, sortConditionAtom } from "./PostSearchInput";
import style from "./Posts.module.scss";
import { Page } from "../../components/common/Page";
import { useAtomValue } from "jotai";

interface PostContextType {
  totalPage: number;
  setTotalPage: React.Dispatch<React.SetStateAction<number>>;
  curPage: number;
  setCurPage: React.Dispatch<React.SetStateAction<number>>;
}

export const PostsContext = createContext<PostContextType | null>(null);

export const usePostContext = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePageContext must be used within a PageProvider');
  }
  return context;
};

export const Posts = () => {
  const [posts, setPosts] = useState<PostGetResponse[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [curPage, setCurPage] = useState<number>(0);
  const [isCardView, setIsCardView] = useState<boolean>(false);
  const sortCondition = useAtomValue(sortConditionAtom);

  useEffect(() => {
    getPostsFunc();
  }, [curPage])

  const getPostsFunc = async () => {
    const param: GetPostsParams = {
      page: curPage,
      limit: 10,
      order: sortCondition,
    }
    const posts = await getPosts(param);
    setPosts(posts.data);
    setTotalPage(posts.totalPages)
  }

  const pageClick = async (page: number) => {
    setCurPage(page);
  }

  return (
    <PostsContext.Provider value={{totalPage, setTotalPage, curPage, setCurPage}}>
      <div className={style.posts}>
        <button onClick={() => setIsCardView(!isCardView)}>{isCardView ? "리스트뷰" : "카드뷰"}</button>
        <PostSearchInput setPosts={setPosts}/>
        <Link className={style.Link} to={`/post-create/`}>글작성</Link>
        <div className={style.cardContainer}>
          <div className={style.cardWrapper}>
            <ul className={style.cardItems}>
              <li className={style.cardItem}>
                {posts.length === 0 && <>게시글이 없습니다.</>}
                {posts.map((post: PostGetResponse, i: number) => {
                  return (
                  <PostContent key={i} post={post} isCardView={isCardView}/>
                  )
                })}
              </li>
            </ul>
          </div>
        </div>
        <ul className={style.pageDiv}>
          {Array.from({length: totalPage}, (_, page: number) => (
            <Page className={curPage-1===page ? style.clicked : ""} key={page} data={page+1} onClick={() => pageClick(page+1)}/>
          ))}
        </ul>
      </div>
    </PostsContext.Provider>
  );
}