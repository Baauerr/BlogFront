import { AuthorDTO } from "../DTO/author/authorDTO.js";
import { makeRequestAPI } from "./mainFetcherAPI.js";

export async function getListOfAuthorsAPI(): Promise<AuthorDTO[]> {
    const url = 'https://blog.kreosoft.space/api/author/list';
    return makeRequestAPI(url, 'GET');
}