import { TagDTO } from "../DTO/tagDTO/tagDTO.js";
import { makeRequestAPI } from "./mainFetcherAPI.js";
import { Request } from "./mainFetcherAPI.js";

export async function getTagsAPI(): Promise<TagDTO[]> {
  const url = 'https://blog.kreosoft.space/api/tag';
  return makeRequestAPI(url, Request.GET);
}