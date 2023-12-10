import { Request } from "./mainFetcherAPI.js";
import { makeRequestAPI } from "./mainFetcherAPI.js";
export async function getProfileAPI() {
    return makeRequestAPI('https://blog.kreosoft.space/api/account/profile', Request.GET);
}
export async function editProfileAPI(editData) {
    const url = 'https://blog.kreosoft.space/api/account/profile';
    const token = localStorage.getItem('token');
    try {
        const data = await makeRequestAPI(url, Request.PUT, editData);
        const duplicateEmailError = document.getElementById("repetitive-email-error");
        if (data) {
            duplicateEmailError.style.display = "block";
        }
        else {
            duplicateEmailError.style.display = "block";
        }
    }
    catch (error) {
        console.error('Произошла ошибка:', error);
        throw error;
    }
}
//# sourceMappingURL=profileAPI.js.map