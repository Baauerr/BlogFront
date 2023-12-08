export function runScripts(htmlCode) {
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
}
;
//# sourceMappingURL=parsingScriptsFromHTML.js.map