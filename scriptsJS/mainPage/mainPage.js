import { getInfoOnPage } from "../api/mainPageAPI.js";
import { showTags } from "./showTags.js";
import { clickOnLikeButton } from "./likeFunction.js";
import { formatDateForPostInfo } from "../helpers/formatDateHelper.js";
export class mainPageData {
    tags;
    author;
    min;
    max;
    sorting;
    onlyMyCommunities;
    page;
    size;
    constructor() {
        this.tags = null;
        this.author = null;
        this.min = null;
        this.max = null;
        this.sorting = null;
        this.onlyMyCommunities = null;
        this.page = 0;
        this.size = 0;
    }
}
function parseUrlParams() {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const data = new mainPageData();
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
function collectFormData() {
    const formData = new mainPageData();
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
const url = parseUrlParams();
updateHash(url);
showTags();
function updateHash(formData) {
    const queryString = Object.entries(formData)
        .filter(([key, value]) => value !== null && value !== "" && !(Array.isArray(value) && value.length === 0) && !Number.isNaN(value))
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
    window.history.pushState(null, null, `?${queryString}`);
}
async function applyFormDataToClass() {
    const formData = parseUrlParams();
    updateHash(formData);
    document.getElementById("postsContainer").innerHTML = '';
    try {
        const postTemplate = document.getElementById("postTemplate");
        const postsContainer = document.getElementById("postsContainer");
        const addPostToContainer = (post) => {
            const postClone = document.importNode(postTemplate.content, true);
            const postDescription = postClone.querySelector(".post-description");
            const postImage = postClone.querySelector(".post-image");
            const postLikes = postClone.querySelector(".post-likes");
            const postTitle = postClone.querySelector(".post-title");
            const postAuthor = postClone.querySelector(".post-author");
            const postTags = postClone.querySelector(".post-tags");
            const readingTime = postClone.querySelector(".reading-time");
            const postComments = postClone.querySelector(".post-comments");
            const showMoreButton = postClone.querySelector(".show-more");
            const likeButton = postClone.querySelector(".post-like-button");
            postLikeView(likeButton, post.hasLike);
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
        viewPagination(data.pagination.count);
    }
    catch (error) {
        console.error("Ошибка при загрузке данных:", error);
    }
}
function getPostAuthor(post) {
    if (post.communityName === null) {
        return `${post.author} - ${formatDateForPostInfo(post.createTime)}`;
    }
    else {
        return `${post.author} - ${formatDateForPostInfo(post.createTime)} в сообществе "${post.communityName}"`;
    }
}
function postLikeView(likePicture, hasLike) {
    const token = localStorage.getItem("token");
    if (token) {
        if (hasLike) {
            likePicture.src = "../images/liked.png";
        }
        else {
            likePicture.src = "../images/like.png";
        }
    }
}
function viewPagination(numberOfPages) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    const ul = document.createElement('ul');
    ul.classList.add('pagination');
    for (let i = 1; i <= numberOfPages; i++) {
        const pageButton = document.createElement('li');
        pageButton.classList.add('page-item');
        const link = document.createElement('a');
        link.classList.add('page-link');
        link.textContent = i.toString();
        link.addEventListener('click', function () {
            updatePageQueryParam(i);
        });
        pageButton.appendChild(link);
        ul.appendChild(pageButton);
    }
    pagination.appendChild(ul);
}
function updatePageQueryParam(pageNumber) {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('page', pageNumber);
    history.pushState(null, null, newUrl.toString());
    applyFormDataToClass();
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
    }
    else {
        postDescription.textContent = shortDescription;
        showMoreButton.textContent = "Читать полностью";
    }
}
window.onload = async () => {
    await applyFormDataToClass();
    await showTags();
};
document.getElementById('apply_button').addEventListener('click', function (event) {
    event.preventDefault();
    const formData = collectFormData();
    updateHash(formData);
    applyFormDataToClass();
});
//# sourceMappingURL=mainPage.js.map