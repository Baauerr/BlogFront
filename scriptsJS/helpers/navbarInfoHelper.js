import { loadCommunitiesToCreatePost } from "../posts/createPost.js";
import { router } from "../routing/routing.js";
export async function updateNavBar() {
    const loginButtonElement = document.getElementById("loginButton");
    const userMenuElement = document.getElementById("user-menu");
    const createPostButton = document.getElementById("create-post");
    const authors = document.getElementById("authors");
    const communities = document.getElementById("communities");
    const token = localStorage.getItem("token");
    if (token !== null) {
        await showLoggedInMenu(loginButtonElement, userMenuElement, createPostButton, authors, communities);
    }
    else {
        showDefaultMenu(loginButtonElement, userMenuElement, createPostButton, authors, communities);
    }
}
document.addEventListener('DOMContentLoaded', (event) => {
    updateNavBar();
});
async function showLoggedInMenu(loginButtonElement, userMenuElement, createPostButton, authors, communities) {
    if (loginButtonElement && userMenuElement) {
        loginButtonElement.style.display = "none";
        userMenuElement.style.display = "block";
        createPostButton.style.display = "inline";
        authors.style.display = "inline",
            communities.style.display = "inline";
        const dropdownMenuButton = document.getElementById("dropdownMenuButton");
        if (dropdownMenuButton) {
            const email = localStorage.getItem('email');
            dropdownMenuButton.innerText = email;
        }
    }
}
function showDefaultMenu(loginButtonElement, userMenuElement, createPostButton, authors, communities) {
    if (loginButtonElement && userMenuElement) {
        loginButtonElement.style.display = "block";
        userMenuElement.style.display = "none";
        createPostButton.style.display = "none";
        authors.style.display = "none",
            communities.style.display = "none";
    }
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