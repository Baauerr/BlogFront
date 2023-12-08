import { prevent } from "./prevent.js";
const loadHTML = async (path) => {
    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error('Запрос завершился с ошибкой');
        }
        const htmlCode = await response.text();
        return htmlCode;
    }
    catch (error) {
        console.error('Произошла ошибка при загрузке HTML:', error);
        throw error;
    }
};
const routes = [
    { path: "/", component: '/main/mainpage.html' },
    { path: "/login", component: '/account/login.html' },
    { path: "/registration", component: '/account/registration.html' },
    { path: "/profile", component: '/account/profile.html' },
    { path: '/post/:id', component: '/posts/post.html' },
    { path: "/post/create", component: "/posts/createPost.html" },
    { path: "/communities", component: '/communities/communitiesList.html' },
    { path: "/communities/:id", component: '/communities/concreteCommunity.html' }
];
const runScripts = (htmlCode) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlCode, 'text/html');
    const scriptElements = doc.querySelectorAll('script[type="module"]');
    scriptElements.forEach((script) => {
        const existingScripts = document.querySelectorAll(`script[type="module"][data-src="${script.src}"]`);
        existingScripts.forEach((existingScript) => {
            existingScript.parentNode?.removeChild(existingScript);
        });
        const newScript = document.createElement('script');
        const randomValue = Math.random();
        newScript.src = `${script.src}?random=${randomValue}`;
        newScript.type = "module";
        newScript.setAttribute('data-src', script.src);
        document.body.appendChild(newScript);
    });
};
const navigateTo = (route, params = "") => {
    window.history.pushState({ path: route, params }, null, route);
    router();
};
const parseLocation = () => {
    const path = window.location.pathname.toLowerCase() || "/";
    const params = new URLSearchParams(window.location.search).toString();
    return params ? `${path}?${params}` : path;
};
function matchPath(urlElements, route) {
    const routeElements = route.path.split('/').filter(element => element !== '');
    if (route.path.endsWith('/')) {
        routeElements.push('/');
    }
    for (let i = 0; i < Math.max(urlElements.length, routeElements.length); i++) {
        const urlElement = urlElements[i];
        const routeElement = routeElements[i];
        if (routeElement && routeElement.startsWith(':')) {
            const paramType = routeElement.substring(1);
            if (!validateDynamicParam(urlElement, paramType)) {
                return false;
            }
        }
        else if (urlElement !== routeElement) {
            return false;
        }
    }
    return true;
}
function validateDynamicParam(param, type) {
    if (type === 'id') {
        const guidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        return guidRegex.test(param);
    }
    return false;
}
function findComponentByUrlElements(urlElements, routes) {
    for (const route of routes) {
        if (matchPath(urlElements, route)) {
            return route;
        }
    }
    return undefined;
}
export async function router() {
    const currentState = window.history.state;
    const path = currentState && currentState.path ? currentState.path : parseLocation();
    const [local, params] = path.split("?");
    const parts = local.split("/");
    if (parts.length > 1 && parts[1] === "") {
        parts[1] = "/";
    }
    parts.shift();
    const errorComponent = "/error/error.html";
    const { component = errorComponent } = findComponentByUrlElements(parts, routes) || {};
    const htmlCode = await loadHTML(component);
    const appElement = document.getElementById("app");
    appElement.innerHTML = htmlCode;
    document.title = document.querySelector(".title-of-page").getAttribute("content");
    prevent(local);
    runScripts(htmlCode);
}
;
document.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName === "A" && target.getAttribute("href")) {
        event.preventDefault();
        const params = new URLSearchParams(window.location.search).toString();
        navigateTo(target.getAttribute("href"), params);
    }
});
window.addEventListener("popstate", router);
router();
//# sourceMappingURL=routing.js.map