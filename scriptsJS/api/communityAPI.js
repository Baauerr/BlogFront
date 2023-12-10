import { filtersToUrl } from "../helpers/filtersToUrl.js";
import { makeRequestAPI } from "./mainFetcherAPI.js";
import { Request } from "./mainFetcherAPI.js";
import { router } from "../routing/routing.js";
export async function getConcreteCommunityAPI(id) {
    const url = `https://blog.kreosoft.space/api/community/${id}`;
    return makeRequestAPI(url, Request.GET);
}
export async function getUsersCommunitiesAPI() {
    const url = 'https://blog.kreosoft.space/api/community/my';
    return makeRequestAPI(url, Request.GET);
}
export async function getGreatestRoleInCommunityAPI(id) {
    const url = `https://blog.kreosoft.space/api/community/${id}/role`;
    return makeRequestAPI(url, 'GET');
}
export async function getListOfCommunitiesAPI() {
    const apiUrl = 'https://blog.kreosoft.space/api/community';
    return makeRequestAPI(apiUrl, Request.GET);
}
export async function createPostInCommunityAPI(responseData, id) {
    const url = `https://blog.kreosoft.space/api/community/${id}/post`;
    window.history.pushState({}, null, '/');
    router();
    return makeRequestAPI(url, Request.POST, responseData);
}
export async function subscribeAPI(id) {
    const url = `https://blog.kreosoft.space/api/community/${id}/subscribe`;
    return makeRequestAPI(url, Request.POST);
}
export async function unsubscribeAPI(id) {
    const url = `https://blog.kreosoft.space/api/community/${id}/unsubscribe`;
    return makeRequestAPI(url, Request.DELETE);
}
export async function getCommunityPostsAPI(filterData, id) {
    const queryString = filtersToUrl(filterData);
    const url = `https://blog.kreosoft.space/api/community/${id}/post?${queryString}`;
    return makeRequestAPI(url, Request.GET);
}
//# sourceMappingURL=communityAPI.js.map