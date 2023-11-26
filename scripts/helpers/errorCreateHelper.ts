export async function takeErrorTextAsync(data, inputErrorMapping) {
  await new Promise(resolve => setTimeout(resolve, 0));

  Object.keys(data.errors).forEach((fieldName: string) => {
      const errorMessages: string[] = data.errors[fieldName];
      const errorElement: HTMLDivElement | undefined = inputErrorMapping[fieldName.toLowerCase()];
      console.log(errorElement);

      if (errorElement) {
          errorElement.textContent = '';
          errorElement.textContent = errorMessages[0];
      }
  });
}

export function createErrorElement(inputErrorMapping) {

    const container = document.getElementById('loginbox');

        const inputElements = container.querySelectorAll('input, #birthdate');
        const inputIds = [];
        inputElements.forEach(input => {
            inputIds.push(input.id);
    });
    inputIds.forEach(element => {
            const errorElement = document.createElement('div');
            errorElement.classList.add('error-message');
            errorElement.id = `${element}Error`;
            const inputElement = document.getElementById(element.toLowerCase());
        
            if (inputElement) {
              inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
          }
          inputErrorMapping[element] = errorElement;
        });
}