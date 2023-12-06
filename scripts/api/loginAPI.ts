import { LoginData } from "../account/login.js";
import { updateNavBar } from "../helpers/navbarInfoHelper.js";

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

        if (data.errors) {
            console.log('request:', data);
        } else {
            localStorage.clear();
            localStorage.setItem("token", data.token);
            localStorage.setItem("email", responseData.email)
            await updateNavBar();
        }
    } catch (error) {
        console.error('Message:', error);
    }
}