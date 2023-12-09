  export function runScripts (htmlCode: string): void {
    const parser: DOMParser = new DOMParser();
    const doc: Document = parser.parseFromString(htmlCode, 'text/html');
  
    const scriptElements: NodeListOf<HTMLScriptElement> = doc.querySelectorAll<HTMLScriptElement>('script[type="module"]');
  
    scriptElements.forEach((script) => {
      const existingScripts: NodeListOf<HTMLScriptElement> = document.querySelectorAll<HTMLScriptElement>(`script[type="module"]`);
  
      existingScripts.forEach((existingScript) => {
        existingScript.parentNode?.removeChild(existingScript);
      });
  
      const newScript: HTMLScriptElement = document.createElement('script');
      const randomValue: number = Math.random();
      newScript.src = `${script.src}?random=${randomValue}`;
      newScript.type = "module";
      document.body.appendChild(newScript);
    });
  };

