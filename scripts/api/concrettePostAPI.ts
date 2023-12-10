import { ConcretePostDTO } from "../DTO/postDTO/postDTO.js";
import { makeRequestAPI } from "./mainFetcherAPI.js";
import { Request } from "./mainFetcherAPI.js";

export async function getConcretePostAPI(postId: string): Promise<ConcretePostDTO> {
  const url = `https://blog.kreosoft.space/api/post/${postId}`;
  return makeRequestAPI(url, Request.GET);
}
