import { updateNavBar } from "../helpers/navbarInfoHelper.js";
import { router } from "../routing/routing.js";
export function logout() {
    localStorage.clear();
    window.history.pushState({}, null, '/');
    updateNavBar();
    router();
}
const logoutButton = document.getElementById('logout');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        logout();
    });
}
//# sourceMappingURL=logout.js.map