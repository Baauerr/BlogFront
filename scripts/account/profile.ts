import { ProfileInfoDTO } from "../DTO/users/userDTO.js";
import { getProfileAPI } from "../api/profileAPI.js";
import { editProfileAPI } from "../api/profileAPI.js";
import { ErrorsDTO } from "../DTO/errorDTO/errorDTO.js";
import { validateUser } from "./dataValidator.js";
import { takeErrorTextAsync } from "../helpers/errorCreateHelper.js";
import { editProfileDTO } from "../DTO/users/userDTO.js";

info();

async function edit_button_action() {
    const inputName = document.getElementById('fullname') as HTMLInputElement;
    const inputEmail = document.getElementById('email') as HTMLInputElement;
    const inputBirthDate = document.getElementById('birthdate') as HTMLInputElement;
    const inputGender = document.getElementById('gender') as HTMLInputElement;
    const inputPhoneNumber = document.getElementById('phonenumber') as HTMLInputElement;

    let serverDate: string;
    if (inputBirthDate.value) {
        const isoDateString: Date = new Date(inputBirthDate.value)
        serverDate = isoDateString.toISOString();
    }

    const requestData: editProfileDTO = {
        email: inputEmail.value,
        phoneNumber: inputPhoneNumber.value,
        gender: inputGender.value,
        fullName: inputName.value,
        birthDate: serverDate,
    };

    let errorsArray: ErrorsDTO = new ErrorsDTO();
    const isRegistration = false;
    errorsArray = validateUser(requestData, errorsArray, isRegistration);
    const container: HTMLDivElement = document.getElementById('profilebox') as HTMLDivElement;
    const duplicateEmailError = document.getElementById("repetitive-email-error");
    const inputElements: NodeListOf<HTMLElement> = container.querySelectorAll('input, #birthdate');
    if (errorsArray.errors.length > 0) {
        duplicateEmailError.style.display = "none";
        await takeErrorTextAsync(errorsArray, container, inputElements);
    }
    else {
        duplicateEmailError.style.display = "none";
        await takeErrorTextAsync(errorsArray, container, inputElements);
        editProfileAPI(requestData);
    }
}


async function info() {
    const profileInfo: ProfileInfoDTO = await getProfileAPI();
    if (profileInfo.birthDate !== null) {
         profileInfo.birthDate = profileInfo.birthDate.slice(0, 10); 
    }
    const container = document.getElementById('profilebox') as HTMLDivElement;
    const inputElements = container.querySelectorAll<HTMLInputElement>('input, #birthdate');
    const lowercaseData: ProfileInfoDTO = new ProfileInfoDTO();
    for (const key in profileInfo) {
        lowercaseData[key.toLowerCase()] = profileInfo[key];
    }
    inputElements.forEach(input => {
        const fieldName: string = input.id;
        input.value = lowercaseData[fieldName];
    });
}

const saveButton = document.getElementById('save_button') as HTMLButtonElement;
saveButton.addEventListener('click', edit_button_action);