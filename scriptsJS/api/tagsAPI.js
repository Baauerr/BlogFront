import { makeRequestAPI } from "./mainFetcherAPI.js";
import { Request } from "./mainFetcherAPI.js";
export async function getTagsAPI() {
    const url = 'https://blog.kreosoft.space/api/tag';
    return makeRequestAPI(url, Request.GET);
}
//# sourceMappingURL=tagsAPI.js.map