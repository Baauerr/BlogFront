export async function takeErrorTextAsync(data, container, inputElements) {
    await new Promise(resolve => setTimeout(resolve, 0));
    const inputErrorMapping = {};
    Object.values(inputErrorMapping).forEach(errorElement => errorElement.textContent = '');
    createErrorElement(inputErrorMapping, container, inputElements);
    Object.keys(data.errors).forEach((fieldName) => {
        console.log(data.errors);
        const errorMessages = data.errors[fieldName];
        const errorElement = inputErrorMapping[fieldName.toLowerCase()];
        console.log(errorElement);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.textContent = errorMessages[0];
        }
    });
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