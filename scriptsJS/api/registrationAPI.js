import { makeRequestAPI } from "./mainFetcherAPI.js";
import { Request } from "./mainFetcherAPI.js";
export async function registerUserAPI(responseData) {
    const url = 'https://blog.kreosoft.space/api/account/register';
    try {
        const response = await makeRequestAPI(url, Request.POST);
        const data = await response.json();
        const duplicateEmailError = document.getElementById("repetitive-email-error");
        if (data.DuplicateUserName) {
            duplicateEmailError.style.display = "block";
        }
        else {
            localStorage.clear();
            duplicateEmailError.style.display = "none";
            localStorage.setItem("token", data.token);
            localStorage.setItem("email", responseData.email);
            window.location.pathname = "";
        }
    }
    catch (error) {
        console.error('Произошла ошибка:', error);
        throw error;
    }
}
//# sourceMappingURL=registrationAPI.js.map