import { getInfoOnPage } from "../api/mainPageAPI.js";

export class mainPageData{
    tags: string[] | null;
    author: string | null;
    min: number | null;
    max: number | null;
    sorting: string | null;
    onlyMyCommunities: boolean | null;
    page: number;
    size: number;
}

const formData: mainPageData = {
    tags: null,
    author: null,
    min: null,
    max: null,
    sorting: "LikeAsc",
    onlyMyCommunities: false,
    page: 1,
    size: 5,
}
function loadMainPage(){
    
}

getInfoOnPage(formData);


function collectFormData() {
    const formData = new mainPageData();

    formData.tags = Array.from((document.querySelectorAll('#filterSquare option:checked') as NodeListOf<HTMLOptionElement>)).map(option => option.value);
    formData.author = (document.getElementById('inputWide') as HTMLInputElement).value;
    formData.min = parseFloat((document.getElementById('input2') as HTMLInputElement).value);
    formData.max = parseFloat((document.getElementById('input3') as HTMLInputElement).value);
    formData.sorting = (document.getElementById('filterSingle') as HTMLSelectElement).value;
    formData.onlyMyCommunities = (document.getElementById('only_my_groups') as HTMLInputElement).checked;

    const activePage = document.querySelector('#pagination .page-item.active a') as HTMLElement;
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