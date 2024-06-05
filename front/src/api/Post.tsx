import Axios from "./Axios";
import { PostCreateRequest } from "./request/post/PostCreateRequest";
import { PostLikeRequest } from "./request/post/PostLikeRequest";
import { PostUpdateRequest } from "./request/post/PostUpdateRequest";
import { PostGetResponse } from "./response/post/PostGetResponse";

interface Params {
  _sort: string;
  _order: string;
  title_like?: string;
  _page?: number;
  _limit?: number;
}

export interface GetPostsParams {
  page?: number,
  limit?: number,
  search?: string,
  sort?: string,
  order?: string ,
}

export interface PostsResponse {
  data: PostGetResponse[];
  totalPages: number;
  totalCount: number;
}

export const getPosts = async (
  getPostsParams: GetPostsParams
): Promise<PostsResponse> => {
  try {
    const {page, limit, search, sort, order} = getPostsParams;
    const params: Params = {
      _sort: sort ? sort : "createdAt",
      _order: order ? order : "desc",
    }
    if(search) {
      params.title_like = search;
    }

    page ? params._page = page : 1;
    limit ? params._limit = limit : 10;

    const res = await Axios.get("/posts", {params});
    const totalCount = parseInt(res.headers['x-total-count'], 10);
    const totalPages = limit ? Math.ceil(totalCount / limit) : 1;
    const returnData: PostsResponse = {
      data: res.data,
      totalPages: totalPages,
      totalCount: totalCount,
    }
    return returnData;
  } catch (err) {
    throw err;
  }
}

export const getPostLength = async () => {
  try {
    const params = {
      _sort: "id",
      _order: "desc",
      limit: 1
    }
    const res = await Axios.get("/posts", {params})
    return res.data.length;
  } catch (err) {
    return err;
  }
}

export const createPost = async (req: PostCreateRequest) => {
  try {
    const res = await Axios.post("/posts", req);
    return res.data;
  } catch (err) {
    return err;
  }
}

export const getPost = async (postId: number) => {
  try {
    const res = await Axios.get(`/posts/${postId}`)
    return res.data;
  } catch (err) {
    return err;
  }
}

export const updatePost = async(postId: string, req: PostUpdateRequest) =>{
  try {
    const res = await Axios.patch(`/posts/${parseInt(postId)}`, req);
    return res.data;
  } catch (err) {
    return err;
  }
}

export const deletePost = async(postId: string) =>{
  try {
    const res = await Axios.delete(`/posts/${parseInt(postId)}`);
    return res.data;
  } catch (err) {
    return err;
  }
}

export const likedPost = async(likeReq: PostLikeRequest) => {
  try {
    const isLiked = await Axios.get(`/like?postId=${likeReq.postId}`)
    if(isLiked.data[0] !== undefined) {
      const res = await Axios.delete(`/like/${isLiked.data[0].id}`)
      return res.data;
    }
    const res = await Axios.post(`/like`, likeReq);
    return res.data;
  } catch (err) {
    return err;
  }
}

export const isLikedPost = async(postId: number) => {
  try {
    const res = await Axios.get(`/like?postId=${postId}`)
    return res.data;
  } catch (err) {
    return err;
  }
}