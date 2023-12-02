export async function getCommentTree(commentId) {
    try {
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
export async function sendComment(commentInfo, id) {
    try {
        console.log(id);
        const token = localStorage.getItem("token");
        console.log(commentInfo);
        const response = await fetch(`https://blog.kreosoft.space/api/post/${id}/comment`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentInfo),
        });
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
        }
    }
    catch (error) {
        console.error('Произошла ошибка:', error);
        throw error;
    }
}
//# sourceMappingURL=commentAPI.js.map