import { ErrorsDTO } from "../DTO/errorDTO/errorDTO.js";
import { RegistrationResponseDTO } from "../DTO/users/userDTO.js";
import { registerUserAPI } from "../api/registrationAPI.js";
import { validateUser } from "./dataValidator.js";
import { takeErrorTextAsync } from "../helpers/errorCreateHelper.js";

export class DateInfo {
    year: number;
    month: number;
    day: number;
}

async function registration_button_action() {

    const inputName: HTMLInputElement = document.getElementById('fullname') as HTMLInputElement;
    const inputPassword: HTMLInputElement = document.getElementById('password') as HTMLInputElement;
    const inputEmail: HTMLInputElement = document.getElementById('email') as HTMLInputElement;
    const inputBirthDate: HTMLInputElement = document.getElementById('birthdate') as HTMLInputElement;
    const inputGender: HTMLInputElement = document.getElementById('gender') as HTMLInputElement;
    const inputPhoneNumber: HTMLInputElement = document.getElementById('phonenumber') as HTMLInputElement;

    let serverDate: string;
    if (inputBirthDate.value && inputBirthDate.value !== undefined) {
        const isoDateString: Date = new Date(inputBirthDate.value)
        serverDate = isoDateString.toISOString();
    }

    const requestData: RegistrationResponseDTO = {
        email: inputEmail.value,
        password: inputPassword.value,
        gender: (inputGender.value).toString(),
        fullName: inputName.value,
    };

    if (inputPhoneNumber.value.trim() !== '') {
        requestData.phoneNumber = inputPhoneNumber.value;
    }

    if (serverDate !== undefined) {
        requestData.birthDate = serverDate
    }
    console.log(requestData)

    let errorsArray: ErrorsDTO = new ErrorsDTO();
    const isRegistration = true;
    errorsArray = validateUser(requestData, errorsArray, isRegistration);
    const duplicateEmailError = document.getElementById("repetitive-email-error");
    const container: HTMLDivElement = document.getElementById('loginbox') as HTMLDivElement;
    const inputElements: NodeListOf<HTMLElement> = container.querySelectorAll('input, #birthdate');
    if (errorsArray.errors.length > 0) {
        duplicateEmailError.style.display = "none"
        await takeErrorTextAsync(errorsArray, container, inputElements);
    }
    else {
        await takeErrorTextAsync(errorsArray, container, inputElements);
        registerUserAPI(requestData)
    }
}

const registrationButton: HTMLButtonElement = document.getElementById('registration_button') as HTMLButtonElement;

registrationButton.addEventListener('click', registration_button_action);

