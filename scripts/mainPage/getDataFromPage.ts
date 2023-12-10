import { FilterDTO } from "../DTO/filterDTO/filterDTO.js";
import { filtersToUrl } from "../api/mainPageAPI.js";

export function parseUrlParams(): FilterDTO {

    const queryString: string = window.location.search;
    const params = new URLSearchParams(queryString);

    const data = new FilterDTO();

    data.tags = params.has('tags') ? params.get('tags')!.split(',') : null;
    data.author = params.get('author') || null;
    data.min = params.has('min') ? parseInt(params.get('min')!, 10) : null;
    data.max = params.has('max') ? parseInt(params.get('max')!, 10) : null;
    data.sorting = params.get('sorting') || null;
    data.onlyMyCommunities = params.has('onlyMyCommunities') ? params.get('onlyMyCommunities') === 'true' : null;
    data.page = params.has('page') ? parseInt(params.get('page')!, 10) : 1;
    data.size = params.has('size') ? parseInt(params.get('size')!, 10) : 5;

    return data;
}


export function collectFormData(): FilterDTO {
    const formElement: HTMLFormElement = document.getElementById('filter-form') as HTMLFormElement;
    const formDataObject = new FormData(formElement);
    const formDataDTO: FilterDTO = new FilterDTO();
    formDataObject.forEach((value, key) => {
        if (key === 'tags' && typeof value === 'string') {
            if (!formDataDTO.tags) {
                formDataDTO.tags = [];
            }
            formDataDTO.tags.push(...value.split(',').map(tag => tag.trim()));
        } else {
            (formDataDTO as any)[key] = value;
        }
    });
    return formDataDTO;
}

export function updateUrl(formData: FilterDTO) {

    if (typeof formData.size === "string") {
        formData.size = parseInt(formData.size, 10);
    }
    
    const queryString: string = filtersToUrl(formData);

    const newUrl = `?${queryString}`;

    window.history.pushState(null, null, newUrl);
}




export function setFormDataToInputs(formData: FilterDTO): void {
    const setInputValue = (elementId: string, value: string | number | boolean | string[]): void => {
        const inputElement = document.getElementById(elementId) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

        if (inputElement) {
            if (inputElement.type === 'checkbox') {
                if (Array.isArray(value)) {
                    (inputElement as HTMLInputElement).checked = value.includes(inputElement.value);
                } else {
                    (inputElement as HTMLInputElement).checked = value as boolean;
                }
            } else if (inputElement.type === 'select-multiple') {
                const selectElement: HTMLSelectElement = inputElement as HTMLSelectElement;
                const options = selectElement.options;
                if (Array.isArray(value)) {
                    for (let i = 0; i < options.length; i++) {
                        if (value.includes(options[i].value)) {
                            options[i].selected = true;
                        }
                    }
                }
            } else {
                inputElement.value = value.toString();
            }
        }
    };

    setInputValue('tags', formData.tags || []);
    setInputValue('author', formData.author || '');
    setInputValue('min', formData.min !== null ? formData.min : '');
    setInputValue('max', formData.max !== null ? formData.max : '');
    setInputValue('sorting', formData.sorting || '');
    setInputValue('onlyMyCommunities', formData.onlyMyCommunities || false);
    setInputValue('page', formData.page !== null ? formData.page : '');
    setInputValue('size', formData.size !== null ? formData.size : '');
}