import { makeRequestAPI } from "./mainFetcherAPI.js";
import { Request } from "./mainFetcherAPI.js";
export async function getConcretePostAPI(postId) {
    const url = `https://blog.kreosoft.space/api/post/${postId}`;
    return makeRequestAPI(url, Request.GET);
}
//# sourceMappingURL=concrettePostAPI.js.map