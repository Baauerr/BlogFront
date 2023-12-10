import { makeRequestAPI } from "./mainFetcherAPI.js";
import { Request } from "./mainFetcherAPI.js";

export async function setLike(id: string) {
    const url = `https://blog.kreosoft.space/api/post/${id}/like`;
    await makeRequestAPI(url, Request.POST);
}

export async function deleteLikeAPI(id: string) {
    const url = `https://blog.kreosoft.space/api/post/${id}/like`;
    await makeRequestAPI(url, Request.DELETE);
}