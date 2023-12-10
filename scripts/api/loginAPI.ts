import { LoginData } from "../account/login.js";
import { updateNavBar } from "../helpers/navbarInfoHelper.js";
import { router } from "../routing/routing.js";
import { Request } from "./mainFetcherAPI.js";
import { makeRequestAPI } from "./mainFetcherAPI.js";

export async function loginUserOnServerAPI(responseData: LoginData) {
    const url = 'https://blog.kreosoft.space/api/account/login';

    try {
        const data = await makeRequestAPI(url, Request.POST, responseData);

        const wrongInfo = document.getElementById('wrong-data');
        if (data.errors) {
            wrongInfo.style.display = 'block';
        } else {
            wrongInfo.style.display = 'none';
            localStorage.clear();
            localStorage.setItem('token', data.token);
            localStorage.setItem('email', responseData.email);
            window.history.pushState({}, null, '/');
            router();
            await updateNavBar();
        }
    } catch (error) {
        console.error('Message:', error);
    }
}