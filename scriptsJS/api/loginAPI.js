import { updateNavBar } from "../helpers/navbarInfoHelper.js";
export async function login_user_server(responseData) {
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
        }
        else {
            localStorage.clear();
            localStorage.setItem("token", data.token);
            await updateNavBar();
        }
    }
    catch (error) {
        console.error('Message:', error);
    }
}
//# sourceMappingURL=loginAPI.js.map