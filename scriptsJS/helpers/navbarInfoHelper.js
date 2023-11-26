document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    if (token !== null) {
        console.log(token);
        showLoggedInMenu();
    }
    else {
        showDefaultMenu();
    }
});
function showLoggedInMenu() {
    document.getElementById("loginButton").style.display = "none";
    document.getElementById("userMenu").style.display = "block";
    const userEmail = getUserEmailFromToken();
    document.getElementById("userEmail").innerText = userEmail;
}
function showDefaultMenu() {
    document.getElementById("loginButton").style.display = "block";
    document.getElementById("userMenu").style.display = "none";
}
function getUserEmailFromToken() {
    const authToken = localStorage.getItem("token");
    if (authToken) {
        const tokenParts = authToken.split('.');
        if (tokenParts.length === 3) {
            const encodedPayload = tokenParts[1];
            const decodedPayload = atob(encodedPayload);
            const payloadObject = JSON.parse(decodedPayload);
            if (payloadObject.email) {
                return payloadObject.email;
            }
        }
    }
    return null;
}
//# sourceMappingURL=navbarInfoHelper.js.map