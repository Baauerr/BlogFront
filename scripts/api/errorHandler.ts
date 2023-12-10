import { router } from "../routing/routing.js";
import { logout } from "../helpers/navbarInfoHelper.js";


export function errorHandler(response: Response) {
    switch (response.status) {
        case 401:
            alert("Войдите")
            logout();
            router();
            break;
        case 400:
            break;
        case 404:
            window.history.go(-1);
            router()
            break;
        case 403:
            window.history.go(-1);
            break;
    }
}