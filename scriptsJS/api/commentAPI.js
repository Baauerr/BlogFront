export async function getCommentTree(commentId) {
    try {
        //   const token = localStorage.getItem("token")
        const response = await fetch(`https://blog.kreosoft.space/api/comment/${commentId}/tree`, {
            method: 'GET',
            headers: {
                //  'Authorization': `Bearer ${token}`, 
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
//# sourceMappingURL=commentAPI.js.map