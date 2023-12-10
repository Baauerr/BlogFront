import { prevent } from "./prevent.js";
import { runScripts } from "./parsingScriptsFromHTML.js";

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
  { path: "/", component: '/mainPages/mainpage.html' },
  { path: "/authors/", component: '/authorsPages/authorsList.html' },
  { path: "/login/", component: '/accountPages/login.html' },
  { path: "/registration/", component: '/accountPages/registration.html' },
  { path: "/profile", component: '/accountPages/profile.html' },
  { path: '/post/:id', component: '/postsPages/post.html' },
  { path: "/post/create", component: "/postsPages/createPost.html" },
  { path: "/communities", component: '/communitiesPages/communitiesList.html' },
  { path: "/communities/:id", component: '/communitiesPages/concreteCommunity.html' },
];


export function navigateTo(route, params = "") {
  window.history.pushState({ path: route, params }, null, route);
  router();
};

function parseLocation() {
  const path: string = window.location.pathname.toLowerCase() || "/";
  const params: string = new URLSearchParams(window.location.search).toString();
  return params ? `${path}?${params}` : path;
};

function findComponentByUrlElements(urlElements: string[], routes: Route[]): Route | undefined {
  for (const route of routes) {
    const routeElements = route.path.split('/').filter(Boolean);

    const isMatch = (urlElements.length === routeElements.length && urlElements.every((element, i) => {
      const routeElement = routeElements[i];
      return routeElement.startsWith(':') ? validateDynamicParam(element, routeElement.substring(1)) : element === routeElement;
    }));

    if (isMatch) {
      return route;
    }
  }
  return undefined;
}


export function validateDynamicParam(param: string, type: string): boolean {
  if (type === 'id') {
    const guidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return guidRegex.test(param);
  }
  return false;
}


export async function router() {
  const currentState = window.history.state;
  const path = (currentState && currentState.path) || parseLocation();
  const [local, params] = path.split("?");
  const parts = local.split("/").filter(Boolean);

  const errorComponent = "/errorPages/error.html";
  
  const component = findComponentByUrlElements(parts, routes)?.component || errorComponent;
  const htmlCode = await loadHTML(component);
  const appElement = document.getElementById("app");

  if (appElement) {
    appElement.innerHTML = htmlCode;
    document.title = document.querySelector(".title-of-page")?.getAttribute("content") || "";
    prevent(local);
    await runScripts(htmlCode);
  }

}

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