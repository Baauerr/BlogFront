import { parseUrlParams } from "./getDataFromPage.js";
import { attachEventListeners } from "./buttonsOnMainPage.js";
import { toggleShowMoreButton } from "./buttonsOnMainPage.js";
import { postLikeView } from "./buttonsOnMainPage.js";
import { getPostAuthor } from "./getInfo.js";
import { setPostImage } from "./getInfo.js";
import { getPostTags } from "./getInfo.js";
import { getInfoOnPageAPI } from "../api/mainPageAPI.js";
import { viewPagination } from "./pagination.js";
import { PostsDTO } from "../DTO/postDTO/postDTO.js";
import { PostDTO } from "../DTO/postDTO/postDTO.js";
import { FilterDTO } from "../DTO/filterDTO/filterDTO.js";
import { showPostPage } from "../posts/posts.js";
import { router } from "../routing/routing.js";
import { setFormDataToInputs } from "./getDataFromPage.js";


export async function displayPosts(apiFunction, formData, id = null) {
    setFormDataToInputs(formData);
    document.getElementById("postsContainer").innerHTML = '';
    const postTemplate = document.getElementById("post-template") as HTMLTemplateElement;
    const postsContainer = document.getElementById("postsContainer") as HTMLDivElement;

    try {
        const data: PostsDTO = id ? await apiFunction(formData, id) : await apiFunction(formData);
         if (!data){
            throw new Error("В доступе отказано");
        }

        data.posts.forEach(post => addPostToContainer(post, postTemplate, postsContainer));
        viewPagination(data.pagination.count, data.pagination.current);
    }
     catch (error) {
         console.log(error)
    }
}



export async function showMainPagePosts() {
    const formData: FilterDTO = parseUrlParams();
    displayPosts(getInfoOnPageAPI, formData);
}

function commentButtonFunction(goToComments: HTMLImageElement) {
    goToComments.addEventListener("click", () => {
        history.pushState({}, null, goToComments.dataset.info);
        router();
        showPostPage("comment-box");
    })
}

function titleButtonFunction(goToComments: HTMLAnchorElement) {
    goToComments.addEventListener("click", () => {
        history.pushState({}, null, goToComments.dataset.info);
        router();
      //  showPostPage();
    })
}


export function addPostToContainer(post: PostDTO, postTemplate: HTMLTemplateElement, postsContainer: HTMLDivElement) {
    const postClone: DocumentFragment = document.importNode(postTemplate.content, true);
    const postDescription: HTMLSpanElement = postClone.querySelector(".post-description") as HTMLSpanElement;
    const postImage: HTMLImageElement = postClone.querySelector(".post-image") as HTMLImageElement;
    const postLikes: HTMLSpanElement = postClone.querySelector(".post-likes") as HTMLSpanElement;
    const postTitle: HTMLAnchorElement = postClone.querySelector(".post-title") as HTMLAnchorElement;
    const postAuthor: HTMLSpanElement = postClone.querySelector(".post-author") as HTMLSpanElement;
    const postTags: HTMLSpanElement = postClone.querySelector(".post-tags") as HTMLSpanElement;
    const readingTime: HTMLSpanElement = postClone.querySelector(".reading-time") as HTMLSpanElement;
    const postComments: HTMLSpanElement = postClone.querySelector(".post-comments") as HTMLSpanElement;
    const postCommentsButton: HTMLImageElement = postClone.querySelector(".post-comments-button") as HTMLImageElement;

    const showMoreButton: HTMLAnchorElement = postClone.querySelector(".show-more") as HTMLAnchorElement;
    const likeButton: HTMLImageElement = postClone.querySelector(".post-like-button") as HTMLImageElement;

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
};