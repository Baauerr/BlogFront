import { loadCommunitiesToCreatePost } from "../posts/createPost.js";
import { router } from "../routing/routing.js";

export async function updateNavBar() {

  const loginButtonElement: HTMLAnchorElement = document.getElementById("loginButton") as HTMLAnchorElement;
  const userMenuElement: HTMLDivElement = document.getElementById("user-menu") as HTMLDivElement;
  const createPostButton: HTMLButtonElement = document.getElementById("create-post") as HTMLButtonElement;
  const authors = document.getElementById("authors");
  const communities = document.getElementById("communities") ;


  const token: string = localStorage.getItem("token");
  if (token !== null) {
    await showLoggedInMenu(loginButtonElement, userMenuElement, createPostButton, authors, communities);
  } else {
    showDefaultMenu(loginButtonElement, userMenuElement, createPostButton, authors, communities);
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  updateNavBar();
});


async function showLoggedInMenu(
  loginButtonElement: HTMLAnchorElement,
  userMenuElement: HTMLDivElement,
  createPostButton: HTMLButtonElement,
  authors,
  communities
) {

  if (loginButtonElement && userMenuElement) {
    loginButtonElement.style.display = "none";
    userMenuElement.style.display = "block";
    createPostButton.style.display = "inline";
    authors.style.display = "inline",
    communities.style.display = "inline"

    const dropdownMenuButton: HTMLButtonElement = document.getElementById("dropdownMenuButton") as HTMLButtonElement;
    if (dropdownMenuButton) {
      const email: string = localStorage.getItem('email')
      dropdownMenuButton.innerText = email;
    }
  }

}

function showDefaultMenu(
  loginButtonElement: HTMLAnchorElement,
  userMenuElement: HTMLDivElement,
  createPostButton: HTMLButtonElement,
  authors,
  communities
) {

  if (loginButtonElement && userMenuElement) {
    loginButtonElement.style.display = "block";
    userMenuElement.style.display = "none";
    createPostButton.style.display = "none";
    authors.style.display = "none",
    communities.style.display = "none"
  }

}

const createPostButton: HTMLButtonElement = document.getElementById("create-post-button") as HTMLButtonElement;

if (createPostButton) {
  createPostButton.addEventListener('click', () => {
    window.history.pushState({}, null, "/post/create");
    router();
    loadCommunitiesToCreatePost();
  });
}