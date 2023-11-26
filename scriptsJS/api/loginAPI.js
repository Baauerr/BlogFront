export function login_user_server(responseData) {
    fetch('https://blog.kreosoft.space/api/account/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(responseData),
    })
        .then(response => response.json())
        .then(data => {
        if (data.errors) {
            localStorage.clear();
            console.log('request:', data);
        }
        else {
            localStorage.setItem("token", data.token);
            console.log(localStorage.getItem("token"));
            window.location.hash = "";
        }
    })
        .catch(error => {
        console.error('Message:', error);
    });
}
//# sourceMappingURL=loginAPI.js.map