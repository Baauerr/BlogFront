export async function setLike(id: string) {
    try {
        const token: string = localStorage.getItem("token");
        const response = await fetch(`https://blog.kreosoft.space/api/post/${id}/like`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Произошла ошибка:', error);
        throw error;
    }
}

export async function deleteLikeAPI(id: string) {
    try {
        const token: string = localStorage.getItem("token");
        const response = await fetch(`https://blog.kreosoft.space/api/post/${id}/like`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Произошла ошибка:', error);
        throw error;
    }
}