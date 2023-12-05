import { parseUrlParams, updateUrl } from "./getDataFromPage.js";
import { attachEventListeners } from "./buttonsOnMainPage.js";
import { toggleShowMoreButton } from "./buttonsOnMainPage.js";
import { postLikeView } from "./buttonsOnMainPage.js";
import { getPostAuthor } from "./getInfo.js";
import { setPostImage } from "./getInfo.js";
import { getPostTags } from "./getInfo.js";
import { getInfoOnPageAPI } from "../api/mainPageAPI.js";
import { viewPagination } from "./pagination.js";

export async function applyFormDataToClass() {
    const formData = parseUrlParams();
    updateUrl(formData);
    document.getElementById("postsContainer").innerHTML = '';
    try {
        const postTemplate = document.getElementById("postTemplate") as HTMLTemplateElement;
        const postsContainer = document.getElementById("postsContainer") as HTMLDivElement;
        
        const data = await getInfoOnPageAPI(formData);
        data.posts.forEach(post => addPostToContainer(post, postTemplate, postsContainer));

        viewPagination(data.pagination.count, data.pagination.current);

    } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
    }
}

export function addPostToContainer (post: any, postTemplate, postsContainer) {
    const postClone = document.importNode(postTemplate.content, true);
    const postDescription = postClone.querySelector(".post-description") as HTMLElement;
    const postImage = postClone.querySelector(".post-image") as HTMLImageElement;
    const postLikes = postClone.querySelector(".post-likes") as HTMLElement;
    const postTitle = postClone.querySelector(".post-title") as HTMLAnchorElement;
    const postAuthor = postClone.querySelector(".post-author") as HTMLElement;
    const postTags = postClone.querySelector(".post-tags") as HTMLElement;
    const readingTime = postClone.querySelector(".reading-time") as HTMLElement;
    const postComments = postClone.querySelector(".post-comments") as HTMLElement;

    const showMoreButton = postClone.querySelector(".show-more") as HTMLElement;
    const likeButton = postClone.querySelector(".post-like-button") as HTMLElement;

    postLikeView(likeButton, post.hasLike);
    postTitle.textContent = post.title;
    postTitle.href = `/post/${post.id}`;
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