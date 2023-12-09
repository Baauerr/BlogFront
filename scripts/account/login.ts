import { loginUserOnServerAPI } from "../api/loginAPI.js";
import { router } from "../routing/routing.js";

export class LoginData {
    email: string;
    password: string;
}

function login_button_action() {

    const inputEMail: HTMLInputElement = document.getElementById('email') as HTMLInputElement;
    const inputPassword: HTMLInputElement = document.getElementById('password') as HTMLInputElement;

    const requestData: LoginData = {
        email: inputEMail.value,
        password: inputPassword.value,
    };

    loginUserOnServerAPI(requestData)
}


const loginButton: HTMLButtonElement = document.getElementById('login_button') as HTMLButtonElement;

loginButton.addEventListener('click', async () => {
    await login_button_action()
});




