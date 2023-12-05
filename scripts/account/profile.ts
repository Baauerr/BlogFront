import { getProfileAPI } from "../api/profileAPI.js";
import { editProfileAPI } from "../api/profileAPI.js";

const registrationButton = document.getElementById('save_button') as HTMLButtonElement;

info();

class UserData {
    email: string;
    fullName: string;
    gender: string;
    phoneNumber: string;
    birthDate: string;
}

function edit_button_action() {
    console.log("jija");

    const inputName = document.getElementById('fullName') as HTMLInputElement;
    const inputEmail = document.getElementById('email') as HTMLInputElement;
    const inputBirthDate = document.getElementById('birthDate') as HTMLInputElement;
    const inputGender = document.getElementById('gender') as HTMLInputElement;
    const inputPhoneNumber = document.getElementById('phoneNumber') as HTMLInputElement;

    const isoDateString = new Date(inputBirthDate.value)
    const serverDate = isoDateString.toISOString();

    const requestData: UserData = {
        email: inputEmail.value,
        phoneNumber: inputPhoneNumber.value,
        gender: inputGender.value,
        fullName: inputName.value,
        birthDate: serverDate,
    };
    editProfileAPI(requestData);
}

interface ProfileData {
    [key: string]: string;
}

async function info() {
    const profileInfo: ProfileData = await getProfileAPI();
    profileInfo.birthDate = profileInfo.birthDate.slice(0, 10);
    console.log(profileInfo[3])
    const container = document.getElementById('profilebox');
    const inputElements = container.querySelectorAll<HTMLInputElement>('input');
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