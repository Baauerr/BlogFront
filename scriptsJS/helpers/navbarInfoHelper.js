import { getProfile } from "../api/profileAPI.js";
export async function updateNavBar() {
    const token = localStorage.getItem("token");
    if (token !== null) {
        await showLoggedInMenu();
    }
    else {
        showDefaultMenu();
    }
}
document.addEventListener('DOMContentLoaded', (event) => {
    updateNavBar();
});
async function showLoggedInMenu() {
    const loginButtonElement = document.getElementById("loginButton");
    const userMenuElement = document.getElementById("userMenu");
    const createPostElement = document.getElementById("create-post-container");
    const authorsCommunitiesLinks = document.getElementById("authors-community-navigation");
    if (loginButtonElement && userMenuElement) {
        loginButtonElement.style.display = "none";
        userMenuElement.style.display = "block";
        createPostElement.style.display = "inline";
        authorsCommunitiesLinks.style.display = "inline";
        const userEmail = await getUserEmail();
        const dropdownMenuButton = document.getElementById("dropdownMenuButton");
        if (dropdownMenuButton) {
            dropdownMenuButton.innerText = userEmail;
        }
    }
}
function showDefaultMenu() {
    const loginButtonElement = document.getElementById("loginButton");
    const userMenuElement = document.getElementById("userMenu");
    const createPostElement = document.getElementById("create-post-container");
    const authorsCommunitiesLinks = document.getElementById("authors-community-navigation");
    if (loginButtonElement && userMenuElement) {
        loginButtonElement.style.display = "block";
        userMenuElement.style.display = "none";
        createPostElement.style.display = "none";
        authorsCommunitiesLinks.style.display = "none";
    }
}
async function getUserEmail() {
    try {
        const userInfo = await getProfile();
        return userInfo.email;
    }
    catch (error) {
        console.error('Произошла ошибка:', error);
        throw error;
    }
}
function logout() {
    localStorage.clear();
    window.history.pushState({}, null, '/');
    updateNavBar();
}
const logoutButton = document.getElementById('logout');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        logout();
    });
}
//# sourceMappingURL=navbarInfoHelper.js.map