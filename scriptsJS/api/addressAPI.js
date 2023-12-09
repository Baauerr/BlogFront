import { errorHandler } from "./errorHandler.js";
export async function getAddressChainAPI(addressGuid) {
    const apiUrl = `https://blog.kreosoft.space/api/address/chain?objectGuid=${addressGuid}`;
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(JSON.stringify({ response, apiUrl }));
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        errorHandler(error.response);
    }
}
//# sourceMappingURL=addressAPI.js.map