import { loginUserOnServerAPI } from "../api/loginAPI.js";
export class LoginData {
    email;
    password;
}
function login_button_action() {
    const inputEMail = document.getElementById('email');
    const inputPassword = document.getElementById('password');
    const requestData = {
        email: inputEMail.value,
        password: inputPassword.value,
    };
    loginUserOnServerAPI(requestData);
}
const loginButton = document.getElementById('login_button');
loginButton.addEventListener('click', async () => {
    await login_button_action();
});
//# sourceMappingURL=login.js.map