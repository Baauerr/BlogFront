import { AuthorDTO } from "../DTO/author/authorDTO.js";

export async function getListOfAuthorsAPI(): Promise<AuthorDTO[]> {
    try {
        const response = await fetch(`https://blog.kreosoft.space/api/author/list`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Произошла ошибка:', error);
        throw error;
    }
}