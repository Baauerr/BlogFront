import { postLikeView } from "../mainPage/buttonsOnMainPage.js";
import { getPostAuthor } from "../mainPage/getInfo.js";
import { getPostTags } from "../mainPage/getInfo.js";
import { setPostImage } from "../mainPage/getInfo.js";
import { toggleShowMoreButton } from "../mainPage/buttonsOnMainPage.js";
import { attachEventListeners } from "../mainPage/buttonsOnMainPage.js";
import { getConcretePostAPI } from "../api/concrettePostAPI.js";
import { CommentData, commentView } from "./commentFunction.js";
import { sendComment } from "../api/commentAPI.js";
import { createComment } from "./commentFunction.js";
import { getProfileAPI } from "../api/profileAPI.js";
import { getAddressChainAPI } from "../api/addressAPI.js";

function parsePostId() {
    const url = new URL(window.location.href);
    const pathNameParts = url.pathname.split('/');
    const postIdIndex = pathNameParts.indexOf('post');

    if (postIdIndex !== -1 && postIdIndex < pathNameParts.length - 1) {
        return pathNameParts[postIdIndex + 1];
    } else {
        return null;
    }
}

export async function showPostPage() {

    const postId = parsePostId();
    const post = await getConcretePostAPI(postId);

    const sendCommentButton = document.getElementById("send-comment") as HTMLButtonElement;
    const commentInputText = document.getElementById('comment-input-area') as HTMLTextAreaElement;

    await showSinglePost();
    await commentViewLogic(post, sendCommentButton, commentInputText);
}


export async function showSinglePost() {
    const postId = parsePostId();
    const post = await getConcretePostAPI(postId);
    const postContainer = document.getElementById("post-container") as HTMLDivElement;

    const postDescription = postContainer.querySelector(".post-description") as HTMLSpanElement;
    const postImage = postContainer.querySelector(".post-image") as HTMLImageElement;
    const postLikes = postContainer.querySelector(".post-likes") as HTMLSpanElement;
    const postTitle = postContainer.querySelector(".post-title") as HTMLSpanElement;
    const postAuthor = postContainer.querySelector(".post-author") as HTMLSpanElement;
    const postTags = postContainer.querySelector(".post-tags") as HTMLSpanElement;
    const readingTime = postContainer.querySelector(".reading-time") as HTMLSpanElement;
    const postCommentsAmount = postContainer.querySelector(".post-comments") as HTMLSpanElement;
    const postAddress = document.getElementById("post-address") as HTMLSpanElement;

    const showMoreButton: HTMLAnchorElement = postContainer.querySelector(".show-more") as HTMLAnchorElement;
    const likeButton: HTMLImageElement = postContainer.querySelector(".post-like-button") as HTMLImageElement;

    postLikeView(likeButton, post.hasLike);
    postTitle.textContent = post.title;
    postAuthor.textContent = getPostAuthor(post);
    postTags.textContent = getPostTags(post);
    readingTime.textContent = `Время чтения: ${post.readingTime} мин.`;
    postLikes.textContent = post.likes;
    postDescription.textContent = post.description.substring(0, 200);
    postCommentsAmount.textContent = post.commentsCount;

    if (post.image) {
        setPostImage(postImage, post.image);
    }

    if (postDescription) {
        postDescription.dataset.fullDescription = post.description;
    }

    if (post.addressId !== null){
        console.log(postAddress)
        postAddress.textContent = await showAddress(post.addressId);
    }

    toggleShowMoreButton(showMoreButton, post.description);
    attachEventListeners(post, postDescription, showMoreButton, likeButton, postLikes);
}

async function commentViewLogic(post, sendCommentButton, commentInputText) {

    const userFullName = await getUserFullName();

    commentView(post.comments, post.id, userFullName);

    sendCommentButton.addEventListener("click", async function () {
        const newComment: CommentData = createComment(commentInputText.value);
        if (newComment !== null) {
            commentInputText.value = ""
            await sendComment(newComment, post.id);
            await showPostPage();
        }
    });

    const newCommentBlock = document.getElementById("new-comment") as HTMLDivElement;
    if (localStorage.getItem("token") !== null) {
        newCommentBlock.style.display = "block"
    }
}

async function getUserFullName(){

    const userEmail: string = localStorage.getItem("email")

    const user = userEmail !== null ? userEmail : null;
    return user === null ? null : userEmail;
}

async function showAddress(addressId){
    const addressChain = await getAddressChainAPI(addressId);
    let addressString: string = "";
    addressChain.forEach(addressElement => {
        addressString = addressString + addressElement.text + " "
    });
    return addressString;
}
