import { login_user_server } from "../api/loginAPI.js";
class LoginData {
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
    login_user_server(requestData);
}
const loginButton = document.getElementById('login_button');
loginButton.addEventListener('click', () => {
    login_button_action();
});
//# sourceMappingURL=login.js.map