import { RegistrationResponseDTO } from "../DTO/users/userDTO.js";



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
                localStorage.clear();
                duplicateEmailError.style.display = "none"
                localStorage.setItem("token", data.token)
                localStorage.setItem("email", responseData.email);
                window.location.pathname = ""
            }
        })
        .catch((error) => {
            console.error('Message:', error);
        });
}