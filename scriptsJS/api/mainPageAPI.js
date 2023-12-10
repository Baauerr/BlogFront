export async function getInfoOnPageAPI(filterData) {
    const queryString = filtersToUrl(filterData);
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
export function filtersToUrl(filterData) {
    return Object.entries(filterData)
        .filter(([key, value]) => {
        if (Array.isArray(value)) {
            return value.filter(tag => tag !== "null").length > 0;
        }
        else if (typeof value === 'number') {
            return value >= 0;
        }
        else {
            return value !== null && value !== "";
        }
    })
        .flatMap(([key, value]) => {
        if (Array.isArray(value)) {
            const filteredTags = value.filter(tag => tag !== null);
            if (filteredTags.length > 0) {
                return filteredTags.map(tag => `${encodeURIComponent(key)}=${encodeURIComponent(tag)}`);
            }
            else {
                return [];
            }
        }
        else {
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        }
    })
        .join('&');
}
//# sourceMappingURL=mainPageAPI.js.map