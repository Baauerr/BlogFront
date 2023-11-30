export async function getInfoOnPage(filterData) {
    const queryString = Object.entries(filterData)
        .filter(([key, value]) => {
        if (Array.isArray(value)) {
            return value.length > 0;
        }
        else {
            return value !== null && value !== "" && !Number.isNaN(value);
        }
    })
        .flatMap(([key, value]) => {
        if (Array.isArray(value)) {
            return value.map(tag => `${encodeURIComponent(key)}=${encodeURIComponent(tag)}`);
        }
        else {
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        }
    })
        .join('&');
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`https://blog.kreosoft.space/api/post?${queryString}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Произошла ошибка:', error);
        throw error;
    }
}
//# sourceMappingURL=mainPageAPI.js.map