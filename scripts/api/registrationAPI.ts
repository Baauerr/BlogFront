import { RegistrationResponseDTO } from "../DTO/users/userDTO.js";
import { takeErrorTextAsync } from "../helpers/errorCreateHelper.js";


export function registerUserAPI(responseData: RegistrationResponseDTO) {

    fetch('https://blog.kreosoft.space/api/account/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(responseData),
    })
        .then(async (response) => {
            const data = await response.json();
            const duplicateEmailError = document.getElementById("repetitive-email-error");
            if (data.DuplicateUserName) {
                duplicateEmailError.style.display = "block"
            } else {
                duplicateEmailError.style.display = "none"
                localStorage.setItem("token", data.token)
                window.location.pathname = ""
            }
        })
        .catch((error) => {
            console.error('Message:', error);
        });
}