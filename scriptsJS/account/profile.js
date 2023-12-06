import { getProfileAPI } from "../api/profileAPI.js";
import { editProfileAPI } from "../api/profileAPI.js";
const registrationButton = document.getElementById('save_button');
info();
class UserData {
    email;
    fullName;
    gender;
    phoneNumber;
    birthDate;
}
function edit_button_action() {
    const inputName = document.getElementById('fullName');
    const inputEmail = document.getElementById('email');
    const inputBirthDate = document.getElementById('birthDate');
    const inputGender = document.getElementById('gender');
    const inputPhoneNumber = document.getElementById('phoneNumber');
    const isoDateString = new Date(inputBirthDate.value);
    const serverDate = isoDateString.toISOString();
    const requestData = {
        email: inputEmail.value,
        phoneNumber: inputPhoneNumber.value,
        gender: inputGender.value,
        fullName: inputName.value,
        birthDate: serverDate,
    };
    editProfileAPI(requestData);
}
async function info() {
    const profileInfo = await getProfileAPI();
    profileInfo.birthDate = profileInfo.birthDate.slice(0, 10);
    const container = document.getElementById('profilebox');
    const inputElements = container.querySelectorAll('input');
    inputElements.forEach(input => {
        const fieldName = input.id;
        input.value = profileInfo[fieldName];
        input.value = fieldName === 'birthDate' ? profileInfo.birthDate : profileInfo[fieldName];
    });
}
registrationButton.addEventListener('click', edit_button_action);
//# sourceMappingURL=profile.js.map