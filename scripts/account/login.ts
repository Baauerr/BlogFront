import { login_user_server } from "../api/loginAPI.js";

class LoginData {
    email: string;
    password: string;
}

function login_button_action(){

    const inputEMail = document.getElementById('email') as HTMLInputElement;
    const inputPassword = document.getElementById('password') as HTMLInputElement;

    const requestData: LoginData = {
        email: inputEMail.value,
        password: inputPassword.value,
    };

    login_user_server(requestData)
}

const loginButton = document.getElementById('login_button') as HTMLButtonElement;

loginButton.addEventListener('click', () => {
    login_button_action()
});




