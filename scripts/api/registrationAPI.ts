import { RegistrationData } from "../account/registration.js";
import { takeErrorTextAsync } from "../helpers/errorCreateHelper.js";


export function registerUserAPI(responseData: RegistrationData) {

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
                const container: HTMLDivElement = document.getElementById('loginbox') as HTMLDivElement;
                const inputElements: NodeListOf<HTMLElement> = container.querySelectorAll('input, #birthdate');
                await takeErrorTextAsync(data, container, inputElements);
            } else {
                localStorage.setItem("token", data.token)
                window.location.pathname = ""
            }
        })
        .catch((error) => {
            console.error('Message:', error);
        });
}