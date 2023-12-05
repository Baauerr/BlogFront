import { takeErrorTextAsync } from "../helpers/errorCreateHelper.js";
export function registerUserAPI(responseData) {
    fetch('https://blog.kreosoft.space/api/account/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(responseData),
    })
        .then(async (response) => {
        const data = await response.json();
        if (data.errors) {
            const container = document.getElementById('loginbox');
            const inputElements = container.querySelectorAll('input, #birthdate');
            await takeErrorTextAsync(data, container, inputElements);
        }
        else {
            localStorage.setItem("token", data.token);
            window.location.pathname = "";
        }
    })
        .catch((error) => {
        console.error('Message:', error);
    });
}
//# sourceMappingURL=registrationAPI.js.map