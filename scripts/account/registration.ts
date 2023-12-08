import { RegistrationResponseDTO } from "../DTO/users/userDTO.js";
import { registerUserAPI } from "../api/registrationAPI.js";

export class DateInfo {
    year: number;
    month: number;
    day: number;
}

function registration_button_action() {

    const inputName: HTMLInputElement = document.getElementById('fullname') as HTMLInputElement;
    const inputPassword: HTMLInputElement = document.getElementById('password') as HTMLInputElement;
    const inputEmail: HTMLInputElement = document.getElementById('email') as HTMLInputElement;
    const inputBirthDate: HTMLInputElement = document.getElementById('birthdate') as HTMLInputElement;
    const inputGender: HTMLInputElement = document.getElementById('gender') as HTMLInputElement;
    const inputPhoneNumber: HTMLInputElement = document.getElementById('phonenumber') as HTMLInputElement;

    let serverDate: string;
    if (inputBirthDate.value) {
        const isoDateString: Date = new Date(inputBirthDate.value)
        serverDate = isoDateString.toISOString();
    }

    const requestData: RegistrationResponseDTO = {
        email: inputEmail.value,
        password: inputPassword.value,
        phoneNumber: inputPhoneNumber.value,
        gender: inputGender.value,
        fullName: inputName.value,
        birthDate: serverDate,
    };
    registerUserAPI(requestData)
}

const registrationButton: HTMLButtonElement = document.getElementById('registration_button') as HTMLButtonElement;

registrationButton.addEventListener('click', registration_button_action);

