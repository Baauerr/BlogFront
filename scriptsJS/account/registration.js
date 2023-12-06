import { registerUserAPI } from "../api/registrationAPI.js";
export class RegistrationData {
    email;
    password;
    fullName;
    gender;
    phoneNumber;
    birthDate;
}
export class DateInfo {
    year;
    month;
    day;
}
function registration_button_action() {
    const inputName = document.getElementById('fullname');
    const inputPassword = document.getElementById('password');
    const inputEmail = document.getElementById('email');
    const inputBirthDate = document.getElementById('birthdate');
    const inputGender = document.getElementById('gender');
    const inputPhoneNumber = document.getElementById('phonenumber');
    let serverDate;
    if (inputBirthDate.value) {
        const isoDateString = new Date(inputBirthDate.value);
        serverDate = isoDateString.toISOString();
    }
    const requestData = {
        email: inputEmail.value,
        password: inputPassword.value,
        phoneNumber: inputPhoneNumber.value,
        gender: inputGender.value,
        fullName: inputName.value,
        birthDate: serverDate,
    };
    registerUserAPI(requestData);
}
const registrationButton = document.getElementById('registration_button');
registrationButton.addEventListener('click', registration_button_action);
//# sourceMappingURL=registration.js.map