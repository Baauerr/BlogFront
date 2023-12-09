import { FilterDTO } from "../DTO/filterDTO/filterDTO.js";
import { filtersToUrl } from "../api/mainPageAPI.js";
export function parseUrlParams() {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const data = new FilterDTO();
    data.tags = params.has('tags') ? params.get('tags').split(',') : null;
    data.author = params.get('author') || null;
    data.min = params.has('min') ? parseInt(params.get('min'), 10) : null;
    data.max = params.has('max') ? parseInt(params.get('max'), 10) : null;
    data.sorting = params.get('sorting') || null;
    data.onlyMyCommunities = params.has('onlyMyCommunities') ? params.get('onlyMyCommunities') === 'true' : null;
    data.page = params.has('page') ? parseInt(params.get('page'), 10) : 1;
    data.size = params.has('size') ? parseInt(params.get('size'), 10) : 5;
    return data;
}
export function collectFormData() {
    const formElement = document.getElementById('filter-form');
    const formDataObject = new FormData(formElement);
    const formDataDTO = new FilterDTO();
    formDataObject.forEach((value, key) => {
        formDataDTO[key] = value;
    });
    return formDataDTO;
}
export function updateUrl(formData) {
    if (typeof formData.size === "string") {
        formData.size = parseInt(formData.size, 10);
    }
    const queryString = filtersToUrl(formData);
    const newUrl = `?${queryString}`;
    console.log(newUrl);
    window.history.pushState(null, null, newUrl);
}
export function setFormDataToInputs(formData) {
    const setInputValue = (elementId, value) => {
        const inputElement = document.getElementById(elementId);
        if (inputElement) {
            switch (inputElement.type) {
                case 'checkbox':
                    if (Array.isArray(value)) {
                        inputElement.checked = value.includes(inputElement.value);
                    }
                    else {
                        inputElement.checked = value;
                    }
                    break;
                default:
                    inputElement.value = value.toString();
            }
        }
    };
    console.log(formData);
    setInputValue('tags', formData.tags || []);
    setInputValue('author', formData.author || '');
    setInputValue('min', formData.min !== null ? formData.min : '');
    setInputValue('max', formData.max !== null ? formData.max : '');
    setInputValue('sorting', formData.sorting || '');
    setInputValue('onlyMyCommunities', formData.onlyMyCommunities || false);
    setInputValue('page', formData.page !== null ? formData.page : '');
    setInputValue('size', formData.size !== null ? formData.size : '');
}
//# sourceMappingURL=getDataFromPage.js.map