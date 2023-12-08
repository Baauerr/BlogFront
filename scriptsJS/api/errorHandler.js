import { updateNavBar } from "../helpers/navbarInfoHelper.js";
import { router } from "../routing/routing.js";
export function errorHandler(response) {
    switch (response.status) {
        case 401:
            alert("Время сессии истекло. Авторизуйтесь снова");
            window.history.pushState({}, null, '/');
            updateNavBar();
            router();
            break;
        case 400:
            break;
        case 404:
            window.history.go(-1);
            router();
            break;
        case 403:
            window.history.go(-1);
            break;
    }
}
//# sourceMappingURL=errorHandler.js.map