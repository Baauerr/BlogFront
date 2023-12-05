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
const main = {
    render: async () => {
        const htmlCode = await loadHTML('../main/mainpage.html');
        return htmlCode;
    },
};
const post = {
    render: async () => {
        const htmlCode = await loadHTML('../../posts/post.html');
        return htmlCode;
    },
};
const login = {
    render: async () => {
        const htmlCode = await loadHTML('../../account/login.html');
        return htmlCode;
    },
};
const registration = {
    render: async () => {
        const htmlCode = await loadHTML('../../account/registration.html');
        return htmlCode;
    },
};
const profile = {
    render: async () => {
        const htmlCode = await loadHTML('../../account/profile.html');
        return htmlCode;
    },
};
const createPost = {
    render: async () => {
        const htmlCode = await loadHTML('../../posts/createPost.html');
        return htmlCode;
    },
};
const ErrorComponent = {
    render: () => {
        return `
      <section>
        <h1>Error</h1>
        <p>Такой страницы нет. Увы</p>
      </section>
    `;
    },
};
const routes = [
    { path: "/", component: main },
    { path: "/login", component: login },
    { path: "/registration", component: registration },
    { path: "/profile", component: profile },
    { path: '/post/:id', component: post },
    { path: "/post/create", component: createPost },
];
const runScripts = (htmlCode) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlCode, 'text/html');
    const scriptElements = doc.querySelectorAll('script[type="module"]');
    scriptElements.forEach((script) => {
        const existingScript = document.querySelector(`script[src="${script.src}"][type="module"]`);
        if (existingScript) {
            existingScript.parentNode.removeChild(existingScript);
        }
        const newScript = document.createElement('script');
        newScript.src = `${script.src}?random=${Math.random()}`;
        newScript.type = "module";
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
    for (let i = 0; i < urlElements.length; i++) {
        const urlElement = urlElements[i];
        const routeElement = routeElements[i];
        if (routeElement.startsWith(':')) {
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
    const { component = ErrorComponent } = findComponentByUrlElements(parts, routes) || {};
    const htmlCode = await component.render(params);
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