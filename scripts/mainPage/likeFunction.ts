import { setLike } from "../api/likeAPI.js";
import { deleteLike } from "../api/likeAPI.js";
import { getConcrettePost } from "../api/concrettePostAPI.js";

export async function clickOnLikeButton(likeButton, postData, likesAmount) {
    if (localStorage.getItem("token") !== null) {
        const postInfo = await getConcrettePost(postData.id)
        if (!postInfo.hasLike) {
            likeButton.src = '../images/liked.png';
            setLike(postData.id);
            likesAmount.textContent = postData.likes + 1;
        }
        else {
            likeButton.src = '../images/like.png';
            deleteLike(postData.id);
            likesAmount.textContent = postData.likes;
        }
    }
}