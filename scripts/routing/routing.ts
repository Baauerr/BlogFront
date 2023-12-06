import { prevent } from "./prevent.js";

const loadHTML = async (path: string) => {
  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error('Запрос завершился с ошибкой');
    }

    const htmlCode = await response.text();
    return htmlCode;
  } catch (error) {
    console.error('Произошла ошибка при загрузке HTML:', error);
    throw error;
  }
};


interface Route {
  path: string;
  component: string;
}

const routes: Route[] = [
  { path: "/", component: '/main/mainpage.html' },
  { path: "/login", component: '/account/login.html' },
  { path: "/registration", component: '/account/registration.html' },
  { path: "/profile", component: '/account/profile.html' },
  { path: '/post/:id', component: '/posts/post.html' },
  { path: "/post/create", component: "/posts/createPost.html" },
  { path: "/communities", component: '/communities/communitiesList.html' },
  { path: "/communities/:id", component: '/communities/concreteCommunity.html' }
];

const runScripts = (htmlCode: string) => {
  const parser: DOMParser = new DOMParser();
  const doc: Document = parser.parseFromString(htmlCode, 'text/html');

  const scriptElements: NodeListOf<HTMLScriptElement> = doc.querySelectorAll<HTMLScriptElement>('script[type="module"]');

  scriptElements.forEach((script) => {
    const existingScripts: NodeListOf<HTMLScriptElement> = document.querySelectorAll<HTMLScriptElement>(`script[type="module"][data-src="${script.src}"]`);

    existingScripts.forEach((existingScript) => {
      existingScript.parentNode?.removeChild(existingScript);
    });

    const newScript: HTMLScriptElement = document.createElement('script');
    const randomValue: number = Math.random();
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
  const path: string = window.location.pathname.toLowerCase() || "/";
  const params: string = new URLSearchParams(window.location.search).toString();
  return params ? `${path}?${params}` : path;
};

function matchPath(urlElements, route) {
  const routeElements = route.path.split('/').filter(element => element !== '');
  if (route.path.endsWith('/')) {
    routeElements.push('/');
  }

  for (let i = 0; i < Math.max(urlElements.length, routeElements.length); i++) {

    const urlElement: string = urlElements[i];
    const routeElement: string = routeElements[i];

    if (routeElement && routeElement.startsWith(':')) {

      const paramType: string = routeElement.substring(1);
      if (!validateDynamicParam(urlElement, paramType)) {

        return false;
      }
    } else if (urlElement !== routeElement) {
      return false;
    }
  }

  return true;
}

function validateDynamicParam(param: string, type: string) {
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
  const path: string = currentState && currentState.path ? currentState.path : parseLocation();
  const [local, params] = path.split("?");
  const parts = local.split("/");
  if (parts.length > 1 && parts[1] === "") {
    parts[1] = "/";
  }
  parts.shift();

  const errorComponent: string = "/error/error.html";

  const { component = errorComponent } = findComponentByUrlElements(parts, routes) || {};

  const htmlCode: string = await loadHTML(component);
  const appElement: HTMLDivElement = document.getElementById("app") as HTMLDivElement;
  appElement.innerHTML = htmlCode;
  document.title = document.querySelector(".title-of-page").getAttribute("content");
  prevent(local);
  runScripts(htmlCode);
};

document.addEventListener("click", (event: MouseEvent) => {
  const target: HTMLAnchorElement = event.target as HTMLAnchorElement;

  if (target.tagName === "A" && target.getAttribute("href")) {
    event.preventDefault();
    const params: string = new URLSearchParams(window.location.search).toString();
    navigateTo(target.getAttribute("href")!, params);
  }
});

window.addEventListener("popstate", router);

router();