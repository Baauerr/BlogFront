import { commentView } from "./commentView.js";
import { sendComment } from "../api/commentAPI.js";
import { createComment } from "./commentButtons.js";
import { showPostPage } from "./posts.js";
import { getUserFullName } from "./posts.js";
export async function commentViewLogic(post, sendCommentButton, commentInputText) {
    const userFullName = await getUserFullName();
    commentView(post.comments, post.id, userFullName);
    sendCommentButton.addEventListener("click", async function () {
        const newComment = createComment(commentInputText.value);
        if (newComment !== null) {
            commentInputText.value = "";
            await sendComment(newComment, post.id);
            const reloadPage = true;
            await showPostPage("", reloadPage);
        }
    });
    const newCommentBlock = document.getElementById("new-comment");
    if (localStorage.getItem("token") !== null) {
        newCommentBlock.style.display = "block";
    }
}
//# sourceMappingURL=commentPreViewLogic.js.map