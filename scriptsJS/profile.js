import { getProfile } from "./api/profileAPI.js";
import { editProfile } from "./api/profileAPI.js";
import { createDateFromInfo } from "./helpers/formatDateHelper.js";
import { formatDateForServer } from "./helpers/formatDateHelper.js";
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
    console.log("jija");
    const inputName = document.getElementById('fullname');
    const inputEmail = document.getElementById('email');
    const inputBirthDate = document.getElementById('birthdate');
    const inputGender = document.getElementById('gender');
    const inputPhoneNumber = document.getElementById('phonenumber');
    let correctDateForBackEnd = formatDateForServer(inputBirthDate.value);
    const requestData = {
        email: inputEmail.value,
        phoneNumber: inputPhoneNumber.value,
        gender: inputGender.value,
        fullName: inputName.value,
        birthDate: createDateFromInfo(correctDateForBackEnd),
    };
    editProfile(requestData);
}
async function info() {
    const booba = await getProfile();
    const container = document.getElementById('profilebox');
    const inputElements = container.querySelectorAll('input');
    inputElements.forEach(input => {
        const fieldName = input.id;
        input.value = booba[fieldName];
    });
}
registrationButton.addEventListener('click', edit_button_action);
//# sourceMappingURL=profile.js.map