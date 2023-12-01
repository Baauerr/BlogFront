import { formatDateForPostInfo } from "../helpers/formatDateHelper.js";
import { getCommentTree } from "../api/commentAPI.js";
export function commentView(comments) {
    const commentBlock = document.getElementById("comment-block");
    const commentTemplate = document.getElementById("comment-template");
    commentBlock.innerHTML = '';
    comments.forEach(comment => {
        const commentClone = document.importNode(commentTemplate.content, true);
        const commentAuthor = commentClone.querySelector(".comment-author");
        const commentContent = commentClone.querySelector(".post-description");
        const commentTime = commentClone.querySelector(".comment-time");
        const subCommentBlock = commentClone.querySelector(".sub-comments");
        const showRepliesButton = commentClone.querySelector(".show-replies");
        commentAuthor.textContent = comment.author;
        commentContent.textContent = comment.content;
        commentTime.textContent = formatDateForPostInfo(comment.createTime);
        if (comment.subComments !== 0) {
            showRepliesButton.style.display = "block";
            subCommentsView(comment.id, subCommentBlock);
        }
        showRepliesButton.addEventListener("click", function () {
            showReplies(subCommentBlock, showRepliesButton);
        });
        commentBlock.appendChild(commentClone);
    });
}
async function subCommentsView(commentId, subCommentBlock) {
    const subCommentTemplate = document.getElementById("comment-template");
    const subCommentsTree = await getCommentTree(commentId);
    subCommentsTree.forEach(subCommentData => {
        const subCommentClone = document.importNode(subCommentTemplate.content, true);
        const subCommentAuthor = subCommentClone.querySelector(".comment-author");
        const subCommentContent = subCommentClone.querySelector(".post-description");
        const subCommentTime = subCommentClone.querySelector(".comment-time");
        subCommentAuthor.textContent = subCommentData.author;
        subCommentContent.textContent = subCommentData.content;
        subCommentTime.textContent = formatDateForPostInfo(subCommentData.createTime);
        if (subCommentData.subComments !== 0) {
            subCommentsView(subCommentData.id, subCommentBlock);
        }
        subCommentBlock.appendChild(subCommentClone);
    });
}
function showReplies(replies, showRepliesButton) {
    if (replies.style.display === "block") {
        replies.style.display = "none";
        showRepliesButton.textContent = "Показать ответы";
    }
    else {
        replies.style.display = "block";
        showRepliesButton.textContent = "Скрыть";
    }
}
//# sourceMappingURL=commentFunction.js.map