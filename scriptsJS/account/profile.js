import { ProfileInfoDTO } from "../DTO/users/userDTO.js";
import { getProfileAPI } from "../api/profileAPI.js";
import { editProfileAPI } from "../api/profileAPI.js";
import { ErrorsDTO } from "../DTO/errorDTO/errorDTO.js";
import { validateUser } from "./dataValidator.js";
import { takeErrorTextAsync } from "../helpers/errorCreateHelper.js";
info();
async function edit_button_action() {
    const inputName = document.getElementById('fullname');
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
        phoneNumber: inputPhoneNumber.value,
        gender: inputGender.value,
        fullName: inputName.value,
        birthDate: serverDate,
    };
    let errorsArray = new ErrorsDTO();
    const isRegistration = false;
    errorsArray = validateUser(requestData, errorsArray, isRegistration);
    const container = document.getElementById('profilebox');
    const inputElements = container.querySelectorAll('input, #birthdate');
    if (errorsArray.errors.length > 0) {
        await takeErrorTextAsync(errorsArray, container, inputElements);
    }
    else {
        await takeErrorTextAsync(errorsArray, container, inputElements);
        editProfileAPI(requestData);
    }
}
async function info() {
    const profileInfo = await getProfileAPI();
    profileInfo.birthDate = profileInfo.birthDate.slice(0, 10);
    const container = document.getElementById('profilebox');
    const inputElements = container.querySelectorAll('input, #birthdate');
    const lowercaseData = new ProfileInfoDTO();
    for (const key in profileInfo) {
        lowercaseData[key.toLowerCase()] = profileInfo[key];
    }
    inputElements.forEach(input => {
        const fieldName = input.id;
        input.value = lowercaseData[fieldName];
    });
}
const saveButton = document.getElementById('save_button');
saveButton.addEventListener('click', edit_button_action);
//# sourceMappingURL=profile.js.map