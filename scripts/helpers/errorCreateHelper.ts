export async function takeErrorTextAsync(data: any, container, inputElements) {
    await new Promise(resolve => setTimeout(resolve, 0));

    const inputErrorMapping: Record<string, HTMLDivElement> = {};
    Object.values(inputErrorMapping).forEach(errorElement => errorElement.textContent = '');

    createErrorElement(inputErrorMapping, container, inputElements)

    Object.keys(data.errors).forEach((fieldName: string) => {
        console.log(data.errors);
        const errorMessages: string[] = data.errors[fieldName];
        const errorElement: HTMLDivElement | undefined = inputErrorMapping[fieldName.toLowerCase()];
        console.log(errorElement);

        if (errorElement) {
            errorElement.textContent = '';
            errorElement.textContent = errorMessages[0];
        }
    });
}

export function createErrorElement(inputErrorMapping: Record<string, HTMLDivElement>, container, inputElements) {

    container.querySelectorAll('.error-message').forEach(element => element.remove());

    
    const inputIds: string[] = [];
    inputElements.forEach(input => {
        inputIds.push(input.id);
    });

    inputIds.forEach(element => {
        const errorElement: HTMLDivElement = document.createElement('div');
        errorElement.classList.add('error-message');
        errorElement.id = `${element}Error`;

        const inputElement: HTMLElement = document.getElementById(element.toLowerCase());

        if (inputElement) {
            inputElement.parentNode?.insertBefore(errorElement, inputElement.nextSibling);
        }
        inputErrorMapping[element] = errorElement;
    });
}