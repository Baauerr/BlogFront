import { PostInfoDTO } from "../DTO/postDTO/postDTO.js";
import { takeErrorTextAsync } from "../helpers/errorCreateHelper.js";
import { FilterDTO } from "../DTO/filterDTO/filterDTO.js";
import { CommunityDTO, ConcreteCommunityDTO, UserRoles, UsersCommunityDTO } from "../DTO/communityDTO/communityDTO.js";
import { PostsDTO } from "../DTO/postDTO/postDTO.js";
import { filtersToUrl } from "./mainPageAPI.js";
import { errorHandler } from "./errorHandler.js";

export async function getConcreteCommunityAPI(id: string): Promise<ConcreteCommunityDTO> {
    try {
        const token: string = localStorage.getItem("token")
        const response = await fetch(`https://blog.kreosoft.space/api/community/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Произошла ошибка:', error);
    }
}

export async function getUsersCommunitiesAPI(): Promise<UsersCommunityDTO[]> {
    try {
        const token: string = localStorage.getItem("token")
        const response = await fetch(`https://blog.kreosoft.space/api/community/my`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Произошла ошибка:', error);
        throw error;
    }
}

export async function getGreatestRoleInCommunityAPI(id: string): Promise<UserRoles> {
    try {
        const token: string = localStorage.getItem("token")
        const response = await fetch(`https://blog.kreosoft.space/api/community/${id}/role`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Произошла ошибка:', error);
        throw error;
    }
}

export async function getListOfCommunitiesAPI(): Promise<CommunityDTO[]> {
    const apiUrl = `https://blog.kreosoft.space/api/community`
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(JSON.stringify({ response, apiUrl }));
        }
        const data = await response.json();
        return data;
    } catch (error) {
        errorHandler(error);
    }
}

export async function createPostInCommunityAPI(responseData: PostInfoDTO, id: string) {
    try {
        const token: string = localStorage.getItem("token");
        await fetch(`https://blog.kreosoft.space/api/community/${id}/post`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(responseData),
        })
            .then(async (response) => {
                const data = await response.json();
                if (data.errors) {
                    console.log(data.errors)

                } else {
                    window.location.pathname = ""
                }
            })
    } catch (error) {
        console.error('Произошла ошибка:', error);
        throw error;
    }
}

export async function subscribeAPI(id: string) {
    console.log(id);
    try {
        const token: string = localStorage.getItem("token");
        await fetch(`https://blog.kreosoft.space/api/community/${id}/subscribe`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
    } catch (error) {
        console.error('Произошла ошибка:', error);
    }
}

export async function unsubscribeAPI(id: string) {
    console.log(id);
    try {
        const token: string = localStorage.getItem("token");
        await fetch(`https://blog.kreosoft.space/api/community/${id}/unsubscribe`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
    } catch (error) {
        console.error('Произошла ошибка:', error);
    }
}

export async function getCommunityPostsAPI(filterData: FilterDTO, id: string): Promise<PostsDTO> {
    try {
        const queryString: string = filtersToUrl(filterData);

        const token = localStorage.getItem("token");

        const response = await fetch(`https://blog.kreosoft.space/api/community/${id}/post?${queryString}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            errorHandler(response);
            return null
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Произошла ошибка:', error);
    }
}
