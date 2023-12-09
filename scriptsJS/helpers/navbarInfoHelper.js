import { loadCommunitiesToCreatePost } from "../posts/createPost.js";
import { router } from "../routing/routing.js";
export async function updateNavBar() {
    const loginButtonElement = document.getElementById("loginButton");
    const userMenuElement = document.getElementById("userMenu");
    const createPostElement = document.getElementById("create-post-container");
    const authorsCommunitiesLinks = document.getElementById("authors-community-navigation");
    const token = localStorage.getItem("token");
    if (token !== null) {
        await showLoggedInMenu(loginButtonElement, userMenuElement, createPostElement, authorsCommunitiesLinks);
    }
    else {
        showDefaultMenu(loginButtonElement, userMenuElement, createPostElement, authorsCommunitiesLinks);
    }
}
document.addEventListener('DOMContentLoaded', (event) => {
    updateNavBar();
});
async function showLoggedInMenu(loginButtonElement, userMenuElement, createPostElement, authorsCommunitiesLinks) {
    if (loginButtonElement && userMenuElement) {
        loginButtonElement.style.display = "none";
        userMenuElement.style.display = "block";
        createPostElement.style.display = "inline";
        authorsCommunitiesLinks.style.display = "inline";
        const dropdownMenuButton = document.getElementById("dropdownMenuButton");
        if (dropdownMenuButton) {
            const email = localStorage.getItem('email');
            dropdownMenuButton.innerText = email;
        }
    }
}
function showDefaultMenu(loginButtonElement, userMenuElement, createPostElement, authorsCommunitiesLinks) {
    if (loginButtonElement && userMenuElement) {
        loginButtonElement.style.display = "block";
        userMenuElement.style.display = "none";
        createPostElement.style.display = "none";
        authorsCommunitiesLinks.style.display = "none";
    }
}
export function logout() {
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
const createPostButton = document.getElementById("create-post-button");
if (createPostButton) {
    createPostButton.addEventListener('click', () => {
        window.history.pushState({}, null, "/post/create");
        router();
        loadCommunitiesToCreatePost();
    });
}
//# sourceMappingURL=navbarInfoHelper.js.map