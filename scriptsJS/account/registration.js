import { ErrorsDTO } from "../DTO/errorDTO/errorDTO.js";
import { registerUserAPI } from "../api/registrationAPI.js";
import { validateUser } from "./dataValidator.js";
import { takeErrorTextAsync } from "../helpers/errorCreateHelper.js";
export class DateInfo {
    year;
    month;
    day;
}
async function registration_button_action() {
    const inputName = document.getElementById('fullname');
    const inputPassword = document.getElementById('password');
    const inputEmail = document.getElementById('email');
    const inputBirthDate = document.getElementById('birthdate');
    const inputGender = document.getElementById('gender');
    const inputPhoneNumber = document.getElementById('phonenumber');
    let serverDate;
    if (inputBirthDate.value && inputBirthDate.value !== undefined) {
        const isoDateString = new Date(inputBirthDate.value);
        serverDate = isoDateString.toISOString();
    }
    const requestData = {
        email: inputEmail.value,
        password: inputPassword.value,
        gender: (inputGender.value).toString(),
        fullName: inputName.value,
    };
    if (inputPhoneNumber.value.trim() !== '') {
        requestData.phoneNumber = inputPhoneNumber.value;
    }
    if (serverDate !== undefined) {
        requestData.birthDate = serverDate;
    }
    console.log(requestData);
    let errorsArray = new ErrorsDTO();
    const isRegistration = true;
    errorsArray = validateUser(requestData, errorsArray, isRegistration);
    const duplicateEmailError = document.getElementById("repetitive-email-error");
    const container = document.getElementById('loginbox');
    const inputElements = container.querySelectorAll('input, #birthdate');
    if (errorsArray.errors.length > 0) {
        duplicateEmailError.style.display = "none";
        await takeErrorTextAsync(errorsArray, container, inputElements);
    }
    else {
        await takeErrorTextAsync(errorsArray, container, inputElements);
        registerUserAPI(requestData);
    }
}
const registrationButton = document.getElementById('registration_button');
registrationButton.addEventListener('click', registration_button_action);
//# sourceMappingURL=registration.js.map