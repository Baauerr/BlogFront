import { LoginData } from "../account/login.js";
import { updateNavBar } from "../helpers/navbarInfoHelper.js";
import { router } from "../routing/routing.js";

export async function loginUserOnServerAPI(responseData: LoginData) {
    try {
        const response = await fetch('https://blog.kreosoft.space/api/account/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(responseData),
        });

        const data = await response.json();

        if (!response.ok) {
            console.log('request:', data);
        } else {
            localStorage.clear();
            localStorage.setItem("token", data.token);
            localStorage.setItem("email", responseData.email);
            window.history.pushState({}, null, '/');
            router();
            await updateNavBar();
        }
    } catch (error) {
        console.error('Message:', error);
    }
}