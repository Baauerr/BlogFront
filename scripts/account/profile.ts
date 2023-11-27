import { getProfile } from "../api/profileAPI.js";
import { editProfile } from "../api/profileAPI.js";
import { createDateFromInfo } from "../helpers/formatDateHelper.js";
import { formatDateForServer } from "../helpers/formatDateHelper.js";
import { DateInfo } from "./registration.js";

const registrationButton = document.getElementById('save_button') as HTMLButtonElement;

info();

class UserData {
    email: string;
    fullName: string;
    gender: string;
    phoneNumber: string;
    birthDate: Date;
}

function edit_button_action() {
    console.log("jija");

    const inputName = document.getElementById('fullName') as HTMLInputElement;
    const inputEmail = document.getElementById('email') as HTMLInputElement;
    const inputBirthDate = document.getElementById('birthDate') as HTMLInputElement;
    const inputGender = document.getElementById('gender') as HTMLInputElement;
    const inputPhoneNumber = document.getElementById('phoneNumber') as HTMLInputElement;

    let correctDateForBackEnd: DateInfo = formatDateForServer(inputBirthDate.value);

    const requestData: UserData = {
        email: inputEmail.value,
        phoneNumber: inputPhoneNumber.value,
        gender: inputGender.value,
        fullName: inputName.value,
        birthDate: createDateFromInfo(correctDateForBackEnd),
    };
    editProfile(requestData);
}

interface ProfileData {
    [key: string]: string;
}

async function info() {
    const booba: ProfileData = await getProfile();
    const container = document.getElementById('profilebox');
    const inputElements = container.querySelectorAll<HTMLInputElement>('input');
    inputElements.forEach(input => {
        const fieldName = input.id;
        console.log(fieldName);
        console.log(booba[fieldName]);
        input.value = booba[fieldName];
    });
}

registrationButton.addEventListener('click', edit_button_action);