import { Gender } from "../users/userDTO.js";

export interface AuthorDTO{
    fullName: string;
    birthDate: string;
    gender: Gender
    posts: number;
    likes: number;
    created: string;
}