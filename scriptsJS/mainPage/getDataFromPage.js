import { MainPageData } from "./mainPage.js";
export function parseUrlParams() {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const data = new MainPageData();
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
    const formData = new MainPageData();
    formData.tags = Array.from(document.querySelectorAll('#tagsSquare option:checked'))
        .map(option => option.value)
        .filter(tag => tag !== "null");
    formData.author = document.getElementById('inputWide').value;
    formData.min = parseFloat(document.getElementById('input2').value);
    formData.max = parseFloat(document.getElementById('input3').value);
    formData.sorting = document.getElementById('filterSingle').value;
    formData.onlyMyCommunities = document.getElementById('only_my_groups').checked;
    const activePage = document.querySelector('#pagination .page-item.active a');
    formData.page = activePage ? parseInt(activePage.textContent) : 1;
    const numberOfPosts = parseInt(document.getElementById('post-amount').value, 10);
    formData.size = numberOfPosts !== 0 ? numberOfPosts : 5;
    console.log(formData.size);
    return formData;
}
export function updateUrl(formData) {
    const queryString = Object.entries(formData)
        .filter(([key, value]) => value !== null && value !== "" && !(Array.isArray(value) && value.length === 0) && !Number.isNaN(value))
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
    window.history.pushState(null, null, `?${queryString}`);
}
//# sourceMappingURL=getDataFromPage.js.map