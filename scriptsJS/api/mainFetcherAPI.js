import { errorHandler } from "./errorHandler.js";
export var Request;
(function (Request) {
    Request["GET"] = "GET";
    Request["POST"] = "POST";
    Request["PUT"] = "PUT";
    Request["DELETE"] = "DELETE";
})(Request || (Request = {}));
export async function makeRequestAPI(url, method, body) {
    try {
        const token = localStorage.getItem("token");
        const headers = {
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
    }
    catch (error) {
        console.error('Произошла ошибка:', error);
        throw error;
    }
}
//# sourceMappingURL=mainFetcherAPI.js.map