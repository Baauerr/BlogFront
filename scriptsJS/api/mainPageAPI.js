import { filtersToUrl } from "../helpers/filtersToUrl.js";
import { makeRequestAPI } from "./mainFetcherAPI.js";
import { Request } from "./mainFetcherAPI.js";
export async function getInfoOnPageAPI(filterData) {
    const queryString = filtersToUrl(filterData);
    const url = `https://blog.kreosoft.space/api/post?${queryString}`;
    return makeRequestAPI(url, Request.GET);
}
//# sourceMappingURL=mainPageAPI.js.map