import { createDateFromInfo } from "../helpers/formatDateHelper.js";
import { register_user_server } from "../api/registrationAPI.js";

class LoginData {
    email: string;
    password: string;
    fullName: string;
    gender: string;
    phoneNumber: string;
    birthDate: string;
}

export class DateInfo {
    year: number;
    month: number;
    day: number;
}

function registration_button_action() {

    console.log("jija")

    const inputName = document.getElementById('fullname') as HTMLInputElement;
    const inputPassword = document.getElementById('password') as HTMLInputElement;
    const inputEmail = document.getElementById('email') as HTMLInputElement;
    const inputBirthDate = document.getElementById('birthdate') as HTMLInputElement;
    const inputGender = document.getElementById('gender') as HTMLInputElement;
    const inputPhoneNumber = document.getElementById('phonenumber') as HTMLInputElement; 

    const isoDateString = new Date(inputBirthDate.value)
    const serverDate = isoDateString.toISOString();

    const requestData: LoginData = {
        email: inputEmail.value,
        password: inputPassword.value,
        phoneNumber: inputPhoneNumber.value,
        gender: inputGender.value,
        fullName: inputName.value,
        birthDate: serverDate,
    };
    register_user_server(requestData)
}

const registrationButton = document.getElementById('registration_button') as HTMLButtonElement;

registrationButton.addEventListener('click', registration_button_action);

