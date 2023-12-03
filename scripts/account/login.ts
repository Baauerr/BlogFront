import { login_user_server } from "../api/loginAPI.js";
import { router } from "../routing/routing.js";
import { updateNavBar } from "../helpers/navbarInfoHelper.js";

class LoginData {
    email: string;
    password: string;
}

function login_button_action() {

    const inputEMail = document.getElementById('email') as HTMLInputElement;
    const inputPassword = document.getElementById('password') as HTMLInputElement;

    const requestData: LoginData = {
        email: inputEMail.value,
        password: inputPassword.value,
    };

    login_user_server(requestData)
}

const loginButton = document.getElementById('login_button') as HTMLButtonElement;

loginButton.addEventListener('click', async () => {
    await login_button_action()
    window.history.pushState({}, null, '/');
    router();
});




