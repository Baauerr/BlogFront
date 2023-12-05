import { setLike } from "../api/likeAPI.js";
import { deleteLikeAPI } from "../api/likeAPI.js";
import { getConcretePostAPI } from "../api/concrettePostAPI.js";

export async function clickOnLikeButton(likeButton, postData, likesAmount) {
    if (localStorage.getItem("token") !== null) {
        const postInfo = await getConcretePostAPI(postData.id)
        if (!postInfo.hasLike) {
            setLike(postData.id);
        }
        else {
            deleteLikeAPI(postData.id);    
        }
        updatePostInfo(likeButton, likesAmount, postInfo.hasLike)
    }
}

async function updatePostInfo(likeButton, likesAmount, hasLike) {
    likeButton.src = hasLike ? '../images/like.png' : '../images/liked.png';
    likesAmount.textContent = hasLike ? parseInt(likesAmount.textContent) - 1 : parseInt(likesAmount.textContent) + 1;
}