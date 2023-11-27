import { formatDateForServer } from "../helpers/formatDateHelper.js";
import { createDateFromInfo } from "../helpers/formatDateHelper.js";
import { register_user_server } from "../api/registrationAPI.js";
class LoginData {
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
    console.log("jija");
    const inputName = document.getElementById('fullname');
    const inputPassword = document.getElementById('password');
    const inputEmail = document.getElementById('email');
    const inputBirthDate = document.getElementById('birthdate');
    const inputGender = document.getElementById('gender');
    const inputPhoneNumber = document.getElementById('phonenumber');
    let correctDateForBackEnd = formatDateForServer(inputBirthDate.value);
    const requestData = {
        email: inputEmail.value,
        password: inputPassword.value,
        phoneNumber: inputPhoneNumber.value,
        gender: inputGender.value,
        fullName: inputName.value,
        birthDate: createDateFromInfo(correctDateForBackEnd),
    };
    register_user_server(requestData);
}
const registrationButton = document.getElementById('registration_button');
registrationButton.addEventListener('click', registration_button_action);
//# sourceMappingURL=registration.js.map