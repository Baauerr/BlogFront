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
        <p>This is just a test</p>
      </section>
    `;
  },
};

const routes = [
  { path: "/", component: main },
  { path: "/account/login", component: login },
  { path: "/account/registration", component: registration },
  { path: "/account/profile", component: profile}
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

const parseLocation = () => location.hash.slice(1).toLowerCase() || "/";
const findComponent = (path, routes) =>
  routes.find((r) => r.path === path) || undefined
  const router = async () => {
    let path = parseLocation();
    const [local, params] = path.split("?");
    const { component = ErrorComponent } = findComponent(local, routes) || {};
  
    const htmlCode = await component.render(params);
  
    const appElement = document.getElementById("app");
    appElement.innerHTML = ''; 
    appElement.innerHTML = htmlCode;

    runScripts(htmlCode);
  }


window.addEventListener("hashchange", router);
