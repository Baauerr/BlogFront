import { getProfile } from "../api/profileAPI.js";

export async function updateNavBar(){
  console.log("booba")
  const token = localStorage.getItem("token");
  if (token !== null) {
    await showLoggedInMenu();
  } else {
    showDefaultMenu();
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  updateNavBar();
});


async function showLoggedInMenu() {
  console.log("logged")
  const loginButtonElement = document.getElementById("loginButton");
  const userMenuElement = document.getElementById("userMenu");
  const createPostElement = document.getElementById("create-post-container");

  if (loginButtonElement && userMenuElement) {
    loginButtonElement.style.display = "none";
    userMenuElement.style.display = "block";
    createPostElement.style.display = "block"



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

  if (loginButtonElement && userMenuElement) {
    loginButtonElement.style.display = "block";
    userMenuElement.style.display = "none";
    createPostElement.style.display = "none";
  }
}

async function getUserEmail() {
  try {
    const userInfo = await getProfile();
    return userInfo.email;
  } catch (error) {
    console.error('Произошла ошибка:', error);
    throw error;
  }
}

function logout() {
  localStorage.clear();
  window.location.href = "";
}

const logoutButton = document.getElementById('logout');

if (logoutButton) {
  logoutButton.addEventListener('click', () => {
    logout();
  });
}
