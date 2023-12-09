export function validateUser(user, errorsDTO, isRegistration) {
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
        errorsDTO.errors.push({ id: "email", message: "Некорректный email" });
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
function validatePhoneNumber(phoneNumber) {
    const pattern = /^(?:\+7\d{10}|\b8\d{10}\b)$/;
    const isValid = pattern.test(phoneNumber);
    console.log(isValid);
    console.log(phoneNumber);
    return isValid;
}
function validatePassword(password) {
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
function validateBirthDate(birthDate) {
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 122);
    const maxDate = new Date();
    const isoDateString = new Date(birthDate);
    return isoDateString <= maxDate && isoDateString >= minDate;
}
function validateEmail(email) {
    const customEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$/;
    return customEmailRegex.test(email);
}
//# sourceMappingURL=dataValidator.js.map