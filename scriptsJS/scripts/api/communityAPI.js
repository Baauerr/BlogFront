import { takeErrorTextAsync } from "../helpers/errorCreateHelper.js";
export async function getConcreteCommunityAPI(id) {
    try {
        const token = localStorage.getItem("token");
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
    }
    catch (error) {
        console.error('Произошла ошибка:', error);
        throw error;
    }
}
export async function getUsersCommunitiesAPI() {
    try {
        const token = localStorage.getItem("token");
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
    }
    catch (error) {
        console.error('Произошла ошибка:', error);
        throw error;
    }
}
export async function getGreatestRoleInCommunityAPI(id) {
    try {
        const token = localStorage.getItem("token");
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
    }
    catch (error) {
        console.error('Произошла ошибка:', error);
        throw error;
    }
}
export async function getListOfCommunitiesAPI() {
    try {
        const response = await fetch(`https://blog.kreosoft.space/api/community`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Произошла ошибка:', error);
        throw error;
    }
}
export async function createPostInCommunityAPI(responseData, id) {
    try {
        const token = localStorage.getItem("token");
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
                console.log(data.errors);
                const container = document.getElementById('input-create-post');
                const inputElements = container.querySelectorAll('input, select, textarea');
                console.log(inputElements);
                await takeErrorTextAsync(data, container, inputElements);
            }
            else {
                window.location.pathname = "";
            }
        });
    }
    catch (error) {
        console.error('Произошла ошибка:', error);
        throw error;
    }
}
export async function subscribeAPI(id) {
    try {
        const token = localStorage.getItem("token");
        await fetch(`https://blog.kreosoft.space/api/community/${id}/subscribe`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    }
    catch (error) {
        console.error('Произошла ошибка:', error);
        throw error;
    }
}
export async function unsubscribeAPI(id) {
    try {
        const token = localStorage.getItem("token");
        await fetch(`https://blog.kreosoft.space/api/community/${id}/unsubscribe`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    }
    catch (error) {
        console.error('Произошла ошибка:', error);
        throw error;
    }
}
export async function getCommunityPostsAPI(filterData, id) {
    try {
        const queryString = Object.entries(filterData)
            .filter(([key, value]) => {
            if (Array.isArray(value)) {
                return value.length > 0;
            }
            else {
                return value !== null && value !== "" && !Number.isNaN(value);
            }
        })
            .flatMap(([key, value]) => {
            if (Array.isArray(value)) {
                return value.map(tag => `${encodeURIComponent(key)}=${encodeURIComponent(tag)}`);
            }
            else {
                return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
            }
        })
            .join('&');
        const token = localStorage.getItem("token");
        const response = await fetch(`https://blog.kreosoft.space/api/community/${id}/post?${queryString}`, {
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
    }
    catch (error) {
        console.error('Произошла ошибка:', error);
        throw error;
    }
}
//# sourceMappingURL=communityAPI.js.map