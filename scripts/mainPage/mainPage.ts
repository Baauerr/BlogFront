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

// function applyFormDataToClass() {
//     const formData = collectFormData();
//     getInfoOnPage(formData);
//     const updateHash = () => {
//         const queryString = Object.entries(formData)
//           .filter(([key, value]) => value !== null && value !== "" && !(Array.isArray(value) && value.length === 0) &&  !Number.isNaN(value))
//           .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
//           .join('&');
      
       //  location.hash = "?" + queryString;
//       };
      
     //  updateHash();
//     console.log(formData);
// }

document.getElementById('apply_button').addEventListener('click', applyFormDataToClass);

async function applyFormDataToClass() {

    const formData = collectFormData();

    try {
        const addPostToContainer = (post: any) => {
            const postTemplate = document.getElementById("postTemplate") as HTMLTemplateElement;
            const postClone = document.importNode(postTemplate.content, true);
            const postDescription = postClone.querySelector(".post-description") as HTMLElement;
            const showMoreButton = postClone.querySelector(".show-more") as HTMLElement;
            const postImage = postClone.querySelector(".post-image") as HTMLImageElement;
        
            postClone.querySelector(".post-title").textContent = post.title;
            postClone.querySelector(".post-author").textContent = post.author;
            if (post.description.length > 200){
                showMoreButton.style.display = "block"
            }
            postDescription.textContent = post.description.substring(0, 200); 
            postClone.querySelector(".post-comments").textContent = post.commentsCount;
        

            if (post.image) {
                postImage.src = post.image; 
                postImage.alt = "Post Image"; 
                postImage.style.display = "block"; 
            }
        
            if (postDescription) {
                postDescription.dataset.fullDescription = post.description;
            }
        
            showMoreButton.addEventListener("click", function () {
                readMore(postDescription, showMoreButton);
            });
            const postsContainer = document.getElementById("postsContainer") as HTMLDivElement;
            postsContainer.appendChild(postClone);
        };
        
        function readMore(postDescription, showMoreButton) {
            const fullDescription = postDescription.dataset.fullDescription;
            const shortDescription = fullDescription.substring(0, 200);
        
            if (postDescription.textContent === shortDescription) {
                postDescription.textContent = fullDescription;
                showMoreButton.textContent = "Скрыть";
            } else {
                postDescription.textContent = shortDescription;
                showMoreButton.textContent = "Читать полностью";
            }
        }
        
        const data = await getInfoOnPage(formData);
        data.posts.forEach(addPostToContainer);
    } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
    }
}



function formatText(postClone: HTMLTemplateElement, inputText: string) {
    if (inputText.length > 200) {
        var firstPart = inputText.substring(0, 200);
        var secondPart = inputText.substring(200);

        var highlightedText = '<span id="small">' + firstPart + '</span>' +
                              '<span id="big">' + secondPart + '</span>';

        postClone.innerHTML = highlightedText;
    }
    else{
        postClone.textContent = inputText;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await applyFormDataToClass(); 

    document.getElementById('apply_button').addEventListener('click', applyFormDataToClass);
});

