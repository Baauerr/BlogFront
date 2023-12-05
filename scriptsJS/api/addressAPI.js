export async function getAddressChainAPI(addressGuid) {
    try {
        const response = await fetch(`https://blog.kreosoft.space/api/address/chain?objectGuid=${addressGuid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Произошла ошибка:', error);
        throw error;
    }
}
//# sourceMappingURL=addressAPI.js.map