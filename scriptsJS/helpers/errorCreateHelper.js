export async function takeErrorTextAsync(data, container, inputElements) {
    await new Promise(resolve => setTimeout(resolve, 0));
    const inputErrorMapping = {};
    Object.values(inputErrorMapping).forEach(errorElement => errorElement.textContent = '');
    createErrorElement(inputErrorMapping, container, inputElements);
    for (const error of data.errors) {
        const fieldName = error.id;
        const errorMessages = error.message;
        const errorElement = inputErrorMapping[fieldName];
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.textContent = errorMessages;
        }
    }
}
export function createErrorElement(inputErrorMapping, container, inputElements) {
    container.querySelectorAll('.error-message').forEach(element => element.remove());
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
            inputElement.parentNode?.insertBefore(errorElement, inputElement.nextSibling);
        }
        inputErrorMapping[element] = errorElement;
    });
}
//# sourceMappingURL=errorCreateHelper.js.map