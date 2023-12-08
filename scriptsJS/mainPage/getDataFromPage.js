import { FilterDTO } from "../DTO/filterDTO/filterDTO.js";
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
    const formData = new FilterDTO();
    formData.tags = Array.from(document.querySelectorAll('#tags option:checked'))
        .map(option => option.value)
        .filter(tag => tag !== "null");
    const authorInput = document.getElementById('inputWide');
    formData.author = authorInput ? authorInput.value : '';
    const minInput = document.getElementById('input2');
    formData.min = minInput ? parseFloat(minInput.value) : 0;
    const maxInput = document.getElementById('input3');
    formData.max = maxInput ? parseFloat(maxInput.value) : 0;
    const sortingSelect = document.getElementById('filterSingle');
    formData.sorting = sortingSelect ? sortingSelect.value : '';
    const onlyMyGroupsCheckbox = document.getElementById('only_my_groups');
    formData.onlyMyCommunities = onlyMyGroupsCheckbox ? onlyMyGroupsCheckbox.checked : false;
    const activePage = document.querySelector('#pagination .page-item.active a');
    formData.page = activePage ? parseInt(activePage.textContent || '1', 10) : 1;
    const numberOfPostsInput = document.getElementById('post-amount');
    const numberOfPosts = numberOfPostsInput ? parseInt(numberOfPostsInput.value, 10) : 5;
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