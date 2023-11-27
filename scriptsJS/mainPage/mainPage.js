import { getInfoOnPage } from "../api/mainPageAPI.js";
export class mainPageData {
    tags;
    author;
    min;
    max;
    sorting;
    onlyMyCommunities;
    page;
    size;
}
const formData = {
    tags: null,
    author: null,
    min: null,
    max: null,
    sorting: "LikeAsc",
    onlyMyCommunities: false,
    page: 1,
    size: 5,
};
function loadMainPage() {
}
getInfoOnPage(formData);
function collectFormData() {
    const formData = new mainPageData();
    formData.tags = Array.from(document.querySelectorAll('#filterSquare option:checked')).map(option => option.value);
    formData.author = document.getElementById('inputWide').value;
    formData.min = parseFloat(document.getElementById('input2').value);
    formData.max = parseFloat(document.getElementById('input3').value);
    formData.sorting = document.getElementById('filterSingle').value;
    formData.onlyMyCommunities = document.getElementById('only_my_groups').checked;
    const activePage = document.querySelector('#pagination .page-item.active a');
    formData.page = activePage ? parseInt(activePage.textContent) : 1;
    formData.size = 5;
    return formData;
}
function applyFormDataToClass() {
    const formData = collectFormData();
    getInfoOnPage(formData);
    const updateHash = () => {
        const queryString = Object.entries(formData)
            .filter(([key, value]) => value !== null && value !== "" && !(Array.isArray(value) && value.length === 0))
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
        location.hash = queryString;
    };
    updateHash();
    console.log(formData);
}
document.getElementById('apply_button').addEventListener('click', applyFormDataToClass);
//# sourceMappingURL=mainPage.js.map