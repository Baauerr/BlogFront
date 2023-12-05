import { takeErrorTextAsync } from "../helpers/errorCreateHelper.js";
export async function publicPostAPI(responseData) {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`https://blog.kreosoft.space/api/post`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(responseData),
        })
            .then(async (response) => {
            const data = await response.json();
            if (data.errors) {
                console.log(data.errors);
                const container = document.getElementById('input-create-post');
                const inputElements = container.querySelectorAll('input, select, textarea');
                console.log(inputElements);
                await takeErrorTextAsync(data, container, inputElements);
            }
            else {
                window.location.pathname = "";
            }
        });
    }
    catch (error) {
        console.error('Произошла ошибка:', error);
        throw error;
    }
}
//# sourceMappingURL=createPostAPI.js.map