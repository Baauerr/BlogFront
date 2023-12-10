export enum Gender{
    Male = "Male",
    Female = "Female"
}

export class ProfileInfoDTO{
    id: string;
    createTime: string;
    fullName: string;
    birthDate: string;
    gender: Gender;
    email: string;
    phoneNumber: string
}

export class RegistrationResponseDTO {
    email: string;
    password: string;
    fullName: string;
    gender: string;
    phoneNumber?: string;
    birthDate?: string;
}

export class TokenDTO{
    token: string
}

export class loginDTO{
    email: string;
    password: string;
}

export class editProfileDTO{
    email: string;
    fullName: string;
    birthDate: string;
    gender: string;
    phoneNumber: string
}