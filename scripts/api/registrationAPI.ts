import { takeErrorTextAsync } from "../helpers/errorCreateHelper.js";
import { createErrorElement } from "../helpers/errorCreateHelper.js";

const inputErrorMapping: Record<string, HTMLDivElement> = {};

createErrorElement(inputErrorMapping)

export function register_user_server(responseData) {

    Object.values(inputErrorMapping).forEach(errorElement => errorElement.textContent = '');

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
                await takeErrorTextAsync(data, inputErrorMapping);
            } else {
                localStorage.setItem("token", data.token)
                window.location.pathname = ""
            }
        })
        .catch((error) => {
            console.error('Message:', error);
        });
}