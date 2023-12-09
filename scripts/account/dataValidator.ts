import { ErrorsDTO } from "../DTO/errorDTO/errorDTO.js";


export function validateUser(user: any, errorsDTO: ErrorsDTO, isRegistration: boolean): ErrorsDTO {

    if (!user.fullName) {
        errorsDTO.errors.push({ id: "fullname", message: "Имя пользователя отсутствует" });
    }

    if (isRegistration) {
        const passwordError = validatePassword(user.password);
        if (passwordError) {
            errorsDTO.errors.push({ id: "password", message: passwordError });
        }
    }

    const emailError = validateEmail(user.email);
    if (!emailError) {
        errorsDTO.errors.push({ id: "email", message: "Некорректный email" })
    }


    if (user.birthDate) {
        const birthDateError = validateBirthDate(user.birthDate);
        if (!birthDateError) {
            errorsDTO.errors.push({ id: "birthdate", message: "Некорректная дата рождения" });
        }
    }

    const phoneNumberError = validatePhoneNumber(user.phoneNumber);
    if (user.phoneNumber) {
        if (!phoneNumberError) {
            errorsDTO.errors.push({ id: "phonenumber", message: "Некорректный номер телефона" });
        }
    }

    return errorsDTO;
}

function validatePhoneNumber(phoneNumber: string): boolean {
    const pattern = /^(?:\+7\d{10}|\b8\d{10}\b)$/;

    const isValid = pattern.test(phoneNumber);
    console.log(isValid);
    console.log(phoneNumber);

    return isValid;
}

function validatePassword(password: string): string {
    if (password.length < 6) {
        return "Пароль должен быть длиннее 6 символов";
    }

    if (!/[a-z]/.test(password)) {
        return "В пароле должны быть строчные буквы";
    }

    if (!/[A-Z]/.test(password)) {
        return "В пароле должны быть заглавные буквы";
    }

    if (!/\d/.test(password)) {
        return "В пароле должны быть цифры";
    }

    if (!/[!@#$%^&*()]/.test(password)) {
        return "В пароле должны быть специальные символы (!@#$%^&*())";
    }

    return "";
}

function validateBirthDate(birthDate: Date): boolean {
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 122);
    const maxDate = new Date();

    const isoDateString: Date = new Date(birthDate)

    return isoDateString <= maxDate && isoDateString >= minDate;
}
function validateEmail(email: string): boolean {
    const customEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$/;
    return customEmailRegex.test(email);
}
