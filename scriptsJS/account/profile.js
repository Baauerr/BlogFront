import { getProfile } from "../api/profileAPI.js";
import { editProfile } from "../api/profileAPI.js";
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
    editProfile(requestData);
}
async function info() {
    const profileInfo = await getProfile();
    profileInfo.birthDate = profileInfo.birthDate.slice(0, 10);
    console.log(profileInfo[3]);
    const container = document.getElementById('profilebox');
    const inputElements = container.querySelectorAll('input');
    console.log(inputElements);
    inputElements.forEach(input => {
        const fieldName = input.id;
        console.log(fieldName + "g");
        console.log(profileInfo[fieldName] + "f");
        input.value = profileInfo[fieldName];
        input.value = fieldName === 'birthDate' ? profileInfo.birthDate : profileInfo[fieldName];
    });
}
registrationButton.addEventListener('click', edit_button_action);
//# sourceMappingURL=profile.js.map