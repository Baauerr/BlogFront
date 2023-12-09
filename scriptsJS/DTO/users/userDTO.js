export var Gender;
(function (Gender) {
    Gender["Male"] = "Male";
    Gender["Female"] = "Female";
})(Gender || (Gender = {}));
export class ProfileInfoDTO {
    id;
    createTime;
    fullName;
    birthDate;
    gender;
    email;
    phoneNumber;
}
export class RegistrationResponseDTO {
    email;
    password;
    fullName;
    gender;
    phoneNumber;
    birthDate;
}
export class TokenDTO {
    token;
}
export class loginDTO {
    email;
    password;
}
export class editProfileDTO {
    email;
    fullName;
    birthDate;
    gender;
    phoneNumber;
}
//# sourceMappingURL=userDTO.js.map