import { MainPageData } from "./mainPage.js";

export function parseUrlParams(): MainPageData {

    const queryString: string = window.location.search;
    const params = new URLSearchParams(queryString);

    const data = new MainPageData();

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


export function collectFormData() {
    const formData: MainPageData = new MainPageData();

    formData.tags = Array.from((document.querySelectorAll('#tags option:checked') as NodeListOf<HTMLOptionElement>))
        .map(option => option.value)
        .filter(tag => tag !== "null");
    formData.author = (document.getElementById('inputWide') as HTMLInputElement).value;
    formData.min = parseFloat((document.getElementById('input2') as HTMLInputElement).value);
    formData.max = parseFloat((document.getElementById('input3') as HTMLInputElement).value);
    formData.sorting = (document.getElementById('filterSingle') as HTMLSelectElement).value;
    formData.onlyMyCommunities = (document.getElementById('only_my_groups') as HTMLInputElement).checked;

    const activePage: HTMLElement = document.querySelector('#pagination .page-item.active a') as HTMLElement;
    formData.page = activePage ? parseInt(activePage.textContent) : 1;
    const numberOfPosts: number = parseInt((document.getElementById('post-amount') as HTMLInputElement).value, 10)
    formData.size = numberOfPosts !==0 ? numberOfPosts : 5;
    console.log(formData.size)
    return formData;
}

export function updateUrl(formData: MainPageData) {
    const queryString: string = Object.entries(formData)
        .filter(([key, value]) => value !== null && value !== "" && !(Array.isArray(value) && value.length === 0) && !Number.isNaN(value))
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');

    window.history.pushState(null, null, `?${queryString}`);
}