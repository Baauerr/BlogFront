import { setLike } from "../api/likeAPI.js";
import { deleteLikeAPI } from "../api/likeAPI.js";
import { getConcretePostAPI } from "../api/concrettePostAPI.js";
export async function clickOnLikeButton(likeButton, postData, likesAmountElement) {
    if (localStorage.getItem("token") !== null) {
        const postInfo = await getConcretePostAPI(postData.id);
        if (!postInfo.hasLike) {
            setLike(postData.id);
        }
        else {
            deleteLikeAPI(postData.id);
        }
        updatePostInfo(likeButton, likesAmountElement, postInfo.hasLike);
    }
}
async function updatePostInfo(likeButton, likesAmountElement, hasLike) {
    likeButton.src = hasLike ? '../images/like.png' : '../images/liked.png';
    likesAmountElement.textContent = hasLike ? (parseInt(likesAmountElement.textContent) - 1).toString() : (parseInt(likesAmountElement.textContent) + 1).toString();
}
//# sourceMappingURL=likeFunction.js.map