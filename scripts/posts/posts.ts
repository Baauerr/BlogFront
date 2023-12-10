import { postLikeView } from "../mainPage/buttonsOnMainPage.js";
import { getPostAuthor } from "../mainPage/getInfo.js";
import { getPostTags } from "../mainPage/getInfo.js";
import { setPostImage } from "../mainPage/getInfo.js";
import { toggleShowMoreButton } from "../mainPage/buttonsOnMainPage.js";
import { attachEventListeners } from "../mainPage/buttonsOnMainPage.js";
import { getConcretePostAPI } from "../api/concrettePostAPI.js";
import { getAddressChainAPI } from "../api/addressAPI.js";
import { AddressChainDTO } from "../DTO/address/addressDTO.js";
import { getProfileAPI } from "../api/profileAPI.js";
import { ConcretePostDTO } from "../DTO/postDTO/postDTO.js";
import { ProfileInfoDTO } from "../DTO/users/userDTO.js";
import { commentViewLogic } from "./commentPreViewLogic.js";
import { parseIdFromUrl } from "../helpers/parserIdFromUrl.js";

export async function showPostPage(anchor?: string, reloadPage?: boolean) {

    const postId: string = parseIdFromUrl('post');
    const post: ConcretePostDTO = await getConcretePostAPI(postId);

    const sendCommentButton = document.getElementById("send-comment") as HTMLButtonElement;
    const commentInputText = document.getElementById('comment-input-area') as HTMLTextAreaElement;
    await showSinglePost(reloadPage);

    await commentViewLogic(post, sendCommentButton, commentInputText);

    if (anchor) {
        const commentBlock: HTMLDivElement = document.getElementById("comment-box") as HTMLDivElement;
        commentBlock.scrollIntoView({ behavior: 'smooth' });
    }
}

export async function showSinglePost(reloadPage?: boolean) {
    const postId: string = parseIdFromUrl('post');
    const post: ConcretePostDTO = await getConcretePostAPI(postId);
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
    postLikes.textContent = (post.likes).toString();
    postDescription.textContent = post.description.substring(0, 200);
    postCommentsAmount.textContent = (post.commentsCount).toString();

    if (post.image) {
        setPostImage(postImage, post.image);
    }

    if (postDescription) {
        postDescription.dataset.fullDescription = post.description;
    }

    if (post.addressId !== null) {
        postAddress.textContent = await showAddress(post.addressId);
    }

    toggleShowMoreButton(showMoreButton, post.description);
    if (!reloadPage) {
         attachEventListeners(post, postDescription, showMoreButton, likeButton, postLikes);
    }
}



export async function getUserFullName() {
    if (localStorage.getItem("token")) {
        const userInfo: ProfileInfoDTO = await getProfileAPI();
        return userInfo.fullName
    }
    return null;
}

async function showAddress(addressId: string) {
    const addressChain: AddressChainDTO[] = await getAddressChainAPI(addressId);
    let addressString: string = "";
    addressChain.forEach(addressElement => {
        addressString = addressString + addressElement.text + " "
    });
    return addressString;
}
