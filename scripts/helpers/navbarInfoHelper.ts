import { loadCommunitiesToCreatePost } from "../posts/createPost.js";
import { router } from "../routing/routing.js";

export async function updateNavBar(){

  const loginButtonElement: HTMLAnchorElement = document.getElementById("loginButton") as HTMLAnchorElement;
  const userMenuElement: HTMLDivElement = document.getElementById("userMenu") as HTMLDivElement;
  const createPostElement: HTMLDivElement = document.getElementById("create-post-container") as HTMLDivElement;
  const authorsCommunitiesLinks: HTMLDivElement = document.getElementById("authors-community-navigation") as HTMLDivElement;

  const token: string = localStorage.getItem("token");
  if (token !== null) {
    await showLoggedInMenu(loginButtonElement, userMenuElement, createPostElement, authorsCommunitiesLinks);
  } else {
    showDefaultMenu(loginButtonElement, userMenuElement, createPostElement, authorsCommunitiesLinks);
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  updateNavBar();
});


async function showLoggedInMenu(loginButtonElement: HTMLAnchorElement, userMenuElement: HTMLDivElement, createPostElement: HTMLDivElement, authorsCommunitiesLinks: HTMLDivElement) {

  if (loginButtonElement && userMenuElement) {
    loginButtonElement.style.display = "none";
    userMenuElement.style.display = "block";
    createPostElement.style.display = "inline"
    authorsCommunitiesLinks.style.display = "inline"

    const dropdownMenuButton:HTMLButtonElement = document.getElementById("dropdownMenuButton") as HTMLButtonElement;
    if (dropdownMenuButton) {
      const email: string = localStorage.getItem('email')
      dropdownMenuButton.innerText = email;
    }
  }
}

function showDefaultMenu(loginButtonElement: HTMLAnchorElement, userMenuElement: HTMLDivElement, createPostElement: HTMLDivElement, authorsCommunitiesLinks: HTMLDivElement) {

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

const logoutButton: HTMLAnchorElement = document.getElementById('logout') as HTMLAnchorElement;

if (logoutButton) {
  logoutButton.addEventListener('click', () => {
    logout();
  });
}

const createPostButton: HTMLButtonElement = document.getElementById("create-post-button") as HTMLButtonElement;

if (createPostButton){
  createPostButton.addEventListener('click', () => {
    window.history.pushState({}, null, "/post/create");
    router();
    loadCommunitiesToCreatePost();
  });
}
