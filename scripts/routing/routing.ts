import { prevent } from "./prevent.js";

const loadHTML = async (path) => {
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

const main = {
  render: async () => {
    const htmlCode = await loadHTML('../main/mainpage.html');
    return htmlCode;
  },
};

const post = {
  render: async () => {
    const htmlCode = await loadHTML('../posts/post.html');
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
  { path: "/post", component: post }
];

const runScripts = (htmlCode) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlCode, 'text/html');

  const scriptElements = doc.querySelectorAll('script[type="module"]');

  scriptElements.forEach((script) => {
    const existingScript = document.querySelector(`script[src="${(script as HTMLScriptElement).src}"][type="module"]`);

    if (existingScript) {
      existingScript.parentNode.removeChild(existingScript);
    }

    const newScript = document.createElement('script');
    newScript.src = `${(script as HTMLScriptElement).src}?random=${Math.random()}`;
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
  console.log(path)
  const params = new URLSearchParams(window.location.search).toString();
  console.log(params)
  return params ? `${path}?${params}` : path;
};

const findComponent = (path, routes) =>
  routes.find((r) => r.path === path) || undefined;

  export async function router() {
    const currentState = window.history.state;
    const path = currentState && currentState.path ? currentState.path : parseLocation();
    const [local, params] = path.split("?");
    const parts = local.split("/");
    const result = "/" + parts[1];
    const { component = ErrorComponent } = findComponent(result, routes) || {};
    const htmlCode = await component.render(params);
    const appElement = document.getElementById("app");
    appElement.innerHTML = htmlCode;
  
    prevent(local);
    runScripts(htmlCode);
  };

document.addEventListener("click", (event: MouseEvent) => {
  const target = event.target as HTMLAnchorElement;

  if (target.tagName === "A" && target.getAttribute("href")) {
    event.preventDefault();
    const params = new URLSearchParams(window.location.search).toString();
    navigateTo(target.getAttribute("href")!, params);
  }
});

window.addEventListener("popstate", router);
router();