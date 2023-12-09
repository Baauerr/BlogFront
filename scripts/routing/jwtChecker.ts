function base64Decode(token: string): string {
    const tokenParts = token.split('.')[1];
    const tokenInfoForDecode = tokenParts.replace(/-/g, '+').replace(/_/g, '/');
    const decodedToken = window.atob(tokenInfoForDecode);
    return decodedToken;
}

export function tokenValidChecker() {
    const token: string | null = localStorage.getItem("token");
    if (token !== null) {
        const decodedToken = base64Decode(token);
        try {
            const tokenObject = JSON.parse(decodedToken);
            if (tokenObject.exp) {
                const expirationTime = tokenObject.exp;

                const currentTime = Math.floor(Date.now() / 1000);

                if (currentTime < expirationTime) {
                    console.log(currentTime);
                    console.log(expirationTime)
                    return true;
                } else {
                    return false;
                }
            } else {
                console.error('В токене отсутствует поле exp');
                return false;
            }
        } catch (error) {
            console.error('Ошибка при парсинге JSON из токена:', error.message);
            return false;
        }
    } else {
        return false;
    }
}