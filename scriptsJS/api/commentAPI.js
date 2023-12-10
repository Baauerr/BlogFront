export async function getCommentTreeAPI(commentId) {
    try {
        const response = await fetch(`https://blog.kreosoft.space/api/comment/${commentId}/tree`, {
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
export async function sendComment(commentInfo, id) {
    try {
        const token = localStorage.getItem("token");
        await fetch(`https://blog.kreosoft.space/api/post/${id}/comment`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentInfo),
        });
    }
    catch (error) {
        console.error('Произошла ошибка:', error);
        throw error;
    }
}
export async function editComment(content, commentId) {
    try {
        const token = localStorage.getItem("token");
        await fetch(`https://blog.kreosoft.space/api/comment/${commentId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(content),
        });
    }
    catch (error) {
        console.error('Произошла ошибка:', error);
        throw error;
    }
}
export async function deleteComment(commentId) {
    try {
        const token = localStorage.getItem("token");
        await fetch(`https://blog.kreosoft.space/api/comment/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    }
    catch (error) {
        console.error('Произошла ошибка:', error);
        throw error;
    }
}
//# sourceMappingURL=commentAPI.js.map