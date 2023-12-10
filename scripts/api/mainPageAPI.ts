import { PostsDTO } from "../DTO/postDTO/postDTO.js";
import { FilterDTO } from "../DTO/filterDTO/filterDTO.js";
import { filtersToUrl } from "../helpers/filtersToUrl.js";
import { makeRequestAPI } from "./mainFetcherAPI.js";
import { Request } from "./mainFetcherAPI.js";

export async function getInfoOnPageAPI(filterData: FilterDTO): Promise<PostsDTO> {
  const queryString: string = filtersToUrl(filterData);
  const url = `https://blog.kreosoft.space/api/post?${queryString}`;

  return makeRequestAPI(url, Request.GET);
}


