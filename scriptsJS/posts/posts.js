import { postLikeView } from "../mainPage/buttonsOnMainPage.js";
import { getPostAuthor } from "../mainPage/getInfo.js";
import { getPostTags } from "../mainPage/getInfo.js";
import { setPostImage } from "../mainPage/getInfo.js";
import { toggleShowMoreButton } from "../mainPage/buttonsOnMainPage.js";
import { attachEventListeners } from "../mainPage/buttonsOnMainPage.js";
import { getConcrettePost } from "../api/concrettePostAPI.js";
import { commentView } from "./commentFunction.js";
function parsePostId() {
    const url = new URL(window.location.href);
    const pathNameParts = url.pathname.split('/');
    const postIdIndex = pathNameParts.indexOf('post');
    if (postIdIndex !== -1 && postIdIndex < pathNameParts.length - 1) {
        return pathNameParts[postIdIndex + 1];
    }
    else {
        return null;
    }
}
export async function showSinglePost() {
    const postId = parsePostId();
    const post = await getConcrettePost(postId);
    const postContainer = document.getElementById("post-container");
    console.log(postContainer);
    const postDescription = postContainer.querySelector(".post-description");
    const postImage = postContainer.querySelector(".post-image");
    const postLikes = postContainer.querySelector(".post-likes");
    const postTitle = postContainer.querySelector(".post-title");
    const postAuthor = postContainer.querySelector(".post-author");
    const postTags = postContainer.querySelector(".post-tags");
    const readingTime = postContainer.querySelector(".reading-time");
    const postComments = postContainer.querySelector(".post-comments");
    const showMoreButton = postContainer.querySelector(".show-more");
    const likeButton = postContainer.querySelector(".post-like-button");
    postLikeView(likeButton, post.hasLike);
    console.log(post);
    console.log(post.title);
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
    //   console.log(post.comments)
    commentView(post.comments);
}
//# sourceMappingURL=posts.js.map