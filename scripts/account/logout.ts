import { updateNavBar } from "../helpers/navbarInfoHelper.js";
import { router } from "../routing/routing.js";

export function logout() {
    localStorage.clear();
    window.history.pushState({}, null, '/');
    updateNavBar();
    router();
  }
  
  const logoutButton: HTMLAnchorElement = document.getElementById('logout') as HTMLAnchorElement;
  
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      logout();
    });
  }