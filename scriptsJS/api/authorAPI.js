import { makeRequestAPI } from "./mainFetcherAPI.js";
export async function getListOfAuthorsAPI() {
    const url = 'https://blog.kreosoft.space/api/author/list';
    return makeRequestAPI(url, 'GET');
}
//# sourceMappingURL=authorAPI.js.map