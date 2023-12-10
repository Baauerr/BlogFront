import { errorHandler } from "./errorHandler.js";

export enum Request{
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
}

export async function makeRequestAPI(url: string, method: string, body?: any): Promise<any> {
    try {
        const token: string = localStorage.getItem("token");

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${url}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) {
            errorHandler(response);
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const text = await response.text();
        const data = text ? JSON.parse(text) : null;

        return data;
    } catch (error) {
        console.error('Произошла ошибка:', error);
        throw error;
    }
}