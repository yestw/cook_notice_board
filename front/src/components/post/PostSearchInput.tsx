import { useState } from "react";
import { Input } from "../../components/common/Input"
import { Button } from "../../components/common/Button";
import { getPosts } from "../../api/Post";
import { PostGetResponse } from "../../api/response/post/PostGetResponse";
import style from "./PostSearchInput.module.scss"
import { GetPostsParams } from "../../api/Post";
import { usePostContext } from "./Posts";
import { atom, useSetAtom } from "jotai";

interface Props {
  setPosts: React.Dispatch<React.SetStateAction<PostGetResponse[]>>
}
export const sortConditionAtom = atom<string>("desc");

export const PostSearchInput = ({setPosts}: Props) => {
  const [search, setSearch] = useState<string>("");
  const {setTotalPage, curPage, setCurPage} = usePostContext();
  const setSortCondition = useSetAtom(sortConditionAtom);

  const sortPost = async (sort: string) => {
    let params: GetPostsParams = {
      page: curPage,
      limit: 10,
      search
    }
    switch(sort) {
      case "desc": {
        setSortCondition("desc");
        await sortPostResult(params);
      }
      break;
      case "asc": {
        setSortCondition("asc");
        params.order = "asc",
        await sortPostResult(params);
      }
      break;
    }
    setCurPage(1);
  }
  const sortPostResult = async (params: GetPostsParams) => {
    const posts = await getPosts(params);
    setPosts(posts.data);
    setTotalPage(posts.totalPages)
  }


  return (
    <div className={style.searchInput}>
      <Input type="text" title="제목" propValue={search} onChange={(e) => setSearch(e.target.value)}/>
      <Button title="검색" onClick={() => sortPost("desc")}/>
      <Button title="최신순" onClick={() => sortPost("desc")} className={style.latestBtn}/>
      <Button title="오래된순" onClick={() => sortPost("asc")} className={style.oldBtn} />
    </div>
  )
}