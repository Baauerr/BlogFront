import { PostInfoDTO } from "../DTO/postDTO/postDTO.js";
import { FilterDTO } from "../DTO/filterDTO/filterDTO.js";
import { CommunityDTO, ConcreteCommunityDTO, UserRoles, UsersCommunityDTO } from "../DTO/communityDTO/communityDTO.js";
import { PostsDTO } from "../DTO/postDTO/postDTO.js";
import { filtersToUrl } from "../helpers/filtersToUrl.js";
import { makeRequestAPI } from "./mainFetcherAPI.js";
import { Request } from "./mainFetcherAPI.js";
import { router } from "../routing/routing.js";


export async function getConcreteCommunityAPI(id: string): Promise<ConcreteCommunityDTO> {
    const url = `https://blog.kreosoft.space/api/community/${id}`;
    return makeRequestAPI(url, Request.GET);
}

export async function getUsersCommunitiesAPI(): Promise<UsersCommunityDTO[]> {
    const url = 'https://blog.kreosoft.space/api/community/my';
    return makeRequestAPI(url, Request.GET);
}

export async function getGreatestRoleInCommunityAPI(id: string): Promise<UserRoles> {
    const url = `https://blog.kreosoft.space/api/community/${id}/role`;
    return makeRequestAPI(url, 'GET');
}

export async function getListOfCommunitiesAPI(): Promise<CommunityDTO[]> {
    const apiUrl = 'https://blog.kreosoft.space/api/community';
    return makeRequestAPI(apiUrl, Request.GET);
}

export async function createPostInCommunityAPI(responseData: PostInfoDTO, id: string) {
    const url = `https://blog.kreosoft.space/api/community/${id}/post`;
    window.history.pushState({}, null, '/');
    router();
    return makeRequestAPI(url, Request.POST, responseData);

}

export async function subscribeAPI(id: string) {
    const url = `https://blog.kreosoft.space/api/community/${id}/subscribe`;
    return makeRequestAPI(url, Request.POST);
}

export async function unsubscribeAPI(id: string) {
    const url = `https://blog.kreosoft.space/api/community/${id}/unsubscribe`;
    return makeRequestAPI(url, Request.DELETE);
}

export async function getCommunityPostsAPI(filterData: FilterDTO, id: string): Promise<PostsDTO> {
    const queryString = filtersToUrl(filterData);
    const url = `https://blog.kreosoft.space/api/community/${id}/post?${queryString}`;
    return makeRequestAPI(url, Request.GET);
}
