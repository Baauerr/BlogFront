import { getProfile } from "../api/profileAPI.js";

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (token !== null) {
      console.log(token)
      localStorage.clear()
      showLoggedInMenu();
  } else {
      showDefaultMenu();
  }
});

async function showLoggedInMenu() {
  const loginButtonElement = document.getElementById("loginButton");
  const userMenuElement = document.getElementById("userMenu");

  if (loginButtonElement && userMenuElement) {
      loginButtonElement.style.display = "none";
      userMenuElement.style.display = "block";

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

  if (loginButtonElement && userMenuElement) {
      loginButtonElement.style.display = "block";
      userMenuElement.style.display = "none";
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

const loginButton = document.getElementById('logout');

if (loginButton) {
  loginButton.addEventListener('click', () => {
      logout();
  });
}
