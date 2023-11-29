import { getInfoOnPage } from "../api/mainPageAPI.js";
import { getTags } from "../api/tagsAPI.js";
import { showTags } from "./showTags.js";
import { clickOnLikeButton } from "./likeFunction.js";
import { formatDateForPostInfo } from "../helpers/formatDateHelper.js";


export class mainPageData {
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

getInfoOnPage(formData);


function collectFormData() {
    const formData = new mainPageData();

    formData.tags = Array.from((document.querySelectorAll('#tagsSquare option:checked') as NodeListOf<HTMLOptionElement>))
        .map(option => option.value)
        .filter(tag => tag !== "null");
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

async function applyFormDataToClass() {
    const formData = collectFormData();
    document.getElementById("postsContainer").innerHTML = '';

    try {
        const postTemplate = document.getElementById("postTemplate") as HTMLTemplateElement;
        const postsContainer = document.getElementById("postsContainer") as HTMLDivElement;

        const addPostToContainer = (post: any) => {
            const postClone = document.importNode(postTemplate.content, true);
            const postDescription = postClone.querySelector(".post-description") as HTMLElement;
            const postImage = postClone.querySelector(".post-image") as HTMLImageElement;
            const postLikes = postClone.querySelector(".post-likes") as HTMLElement;
            const postTitle = postClone.querySelector(".post-title") as HTMLElement;
            const postAuthor = postClone.querySelector(".post-author") as HTMLElement;
            const postTags = postClone.querySelector(".post-tags") as HTMLElement;
            const readingTime = postClone.querySelector(".reading-time") as HTMLElement;
            const postComments = postClone.querySelector(".post-comments") as HTMLElement;


            const showMoreButton = postClone.querySelector(".show-more") as HTMLElement;
            const likeButton = postClone.querySelector(".post-like-button") as HTMLElement;

            postTitle.textContent = post.title;
            postAuthor.textContent = getPostAuthor(post);
            postTags.textContent = getPostTags(post);
            readingTime.textContent = `Время чтения: ${post.readingTime} мин.`;
            postLikes.textContent = post.likes;
            postDescription.textContent = post.description.substring(0, 200);
            postComments.textContent = post.commentsCount;

            if (post.image) {
                setPostImage(postImage, post.image);
            }

            if (postDescription) {
                postDescription.dataset.fullDescription = post.description;
            }

            toggleShowMoreButton(showMoreButton, post.description);

            attachEventListeners(post, postDescription, showMoreButton, likeButton, postLikes);

            postsContainer.appendChild(postClone);
        };

        const data = await getInfoOnPage(formData);
        data.posts.forEach(addPostToContainer);
    } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
    }
}

function getPostAuthor(post) {
    if (post.communityName === null) {
        return `${post.author} - ${formatDateForPostInfo(post.createTime)}`;
    } else {
        return `${post.author} - ${formatDateForPostInfo(post.createTime)} в сообществе "${post.communityName}"`;
    }
}

function getPostTags(post) {
    return post.tags.map(tag => `#${tag.name}`).join(' ');
}

function toggleShowMoreButton(showMoreButton, description) {
    if (description.length > 200) {
        showMoreButton.style.display = "block";
    }
}

function setPostImage(postImage, imageUrl) {
    postImage.src = imageUrl;
    postImage.alt = "Post Image";
    postImage.style.display = "block";
}

function attachEventListeners(post, postDescription, showMoreButton, likeButton, postLikes) {
    showMoreButton.addEventListener("click", function () {
        readMore(postDescription, showMoreButton);
    });

    likeButton.addEventListener("click", async function () {
        await clickOnLikeButton(likeButton, post, postLikes);
    });
}

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

window.addEventListener('load', async () => {
    await applyFormDataToClass();
    await showTags();
});

document.getElementById('apply_button').addEventListener('click', applyFormDataToClass);


