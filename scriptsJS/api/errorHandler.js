import { router } from "../routing/routing.js";
import { tokenValidChecker } from "../routing/jwtChecker.js";
import { logout } from "../account/logout.js";
export function errorHandler(response) {
    switch (response.status) {
        case 400:
            showNotification('Вы ввели неверные данные!');
            break;
        case 401:
            authorizeChecker();
            showNotification('Авторизуйтесь, чтобы получить доступ!');
            break;
        case 404:
            window.history.go(-1);
            router();
            showNotification('Информация не найдена');
            break;
        case 403:
            showNotification('Подпишитесь, чтобы увидеть контент сообщества!');
            break;
    }
}
function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');
    notificationText.textContent = message;
    notification.style.display = "block";
    setTimeout(() => {
        notification.style.display = "none";
    }, 4000);
}
function authorizeChecker() {
    if (localStorage.getItem("token") === null) {
        window.history.pushState({}, null, '/');
        router();
    }
    else if (!tokenValidChecker()) {
        window.history.pushState({}, null, '/');
        router();
        logout();
    }
}
//# sourceMappingURL=errorHandler.js.map