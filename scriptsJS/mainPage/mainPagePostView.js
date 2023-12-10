import { parseUrlParams } from "./getDataFromPage.js";
import { attachEventListeners } from "./buttonsOnMainPage.js";
import { toggleShowMoreButton } from "./buttonsOnMainPage.js";
import { postLikeView } from "./buttonsOnMainPage.js";
import { getPostAuthor } from "./getInfo.js";
import { setPostImage } from "./getInfo.js";
import { getPostTags } from "./getInfo.js";
import { getInfoOnPageAPI } from "../api/mainPageAPI.js";
import { viewPagination } from "./pagination.js";
import { showPostPage } from "../posts/posts.js";
import { router } from "../routing/routing.js";
import { setFormDataToInputs } from "./getDataFromPage.js";
export async function displayPosts(apiFunction, formData, id = null) {
    setFormDataToInputs(formData);
    document.getElementById("postsContainer").innerHTML = '';
    const postTemplate = document.getElementById("post-template");
    const postsContainer = document.getElementById("postsContainer");
    try {
        const data = id ? await apiFunction(formData, id) : await apiFunction(formData);
        if (!data) {
            throw new Error("В доступе отказано");
        }
        data.posts.forEach(post => addPostToContainer(post, postTemplate, postsContainer));
        viewPagination(data.pagination.count, data.pagination.current);
    }
    catch (error) {
        console.log(error);
    }
}
export async function showMainPagePosts() {
    const formData = parseUrlParams();
    displayPosts(getInfoOnPageAPI, formData);
}
function commentButtonFunction(goToComments) {
    goToComments.addEventListener("click", () => {
        history.pushState({}, null, goToComments.dataset.info);
        router();
        showPostPage("comment-box");
    });
}
function titleButtonFunction(goToComments) {
    goToComments.addEventListener("click", () => {
        history.pushState({}, null, goToComments.dataset.info);
        router();
        //  showPostPage();
    });
}
export function addPostToContainer(post, postTemplate, postsContainer) {
    const postClone = document.importNode(postTemplate.content, true);
    const postDescription = postClone.querySelector(".post-description");
    const postImage = postClone.querySelector(".post-image");
    const postLikes = postClone.querySelector(".post-likes");
    const postTitle = postClone.querySelector(".post-title");
    const postAuthor = postClone.querySelector(".post-author");
    const postTags = postClone.querySelector(".post-tags");
    const readingTime = postClone.querySelector(".reading-time");
    const postComments = postClone.querySelector(".post-comments");
    const postCommentsButton = postClone.querySelector(".post-comments-button");
    const showMoreButton = postClone.querySelector(".show-more");
    const likeButton = postClone.querySelector(".post-like-button");
    postLikeView(likeButton, post.hasLike);
    postTitle.textContent = post.title;
    postTitle.dataset.info = `/post/${post.id}`;
    postAuthor.textContent = getPostAuthor(post);
    postTags.textContent = getPostTags(post);
    readingTime.textContent = `Время чтения: ${post.readingTime} мин.`;
    postLikes.textContent = (post.likes).toString();
    postDescription.textContent = post.description.substring(0, 200);
    postComments.textContent = (post.commentsCount).toString();
    postCommentsButton.dataset.info = `/post/${post.id}`;
    titleButtonFunction(postTitle);
    commentButtonFunction(postCommentsButton);
    if (post.image) {
        setPostImage(postImage, post.image);
    }
    if (postDescription) {
        postDescription.dataset.fullDescription = post.description;
    }
    toggleShowMoreButton(showMoreButton, post.description);
    attachEventListeners(post, postDescription, showMoreButton, likeButton, postLikes);
    postsContainer.appendChild(postClone);
}
;
//# sourceMappingURL=mainPagePostView.js.map