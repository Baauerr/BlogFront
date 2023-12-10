import { router } from "../routing/routing.js";
export function errorHandler(response) {
    switch (response.status) {
        case 400:
            break;
        case 404:
            window.history.go(-1);
            router();
            break;
        case 403:
            //   alert("Чтобы увидеть контент, подпишитесь")
            break;
    }
}
//# sourceMappingURL=errorHandler.js.map