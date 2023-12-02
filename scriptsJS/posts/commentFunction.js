import { formatDateForPostInfo } from "../helpers/formatDateHelper.js";
import { getCommentTree } from "../api/commentAPI.js";
import { showPostPage } from "./posts.js";
import { sendComment } from "../api/commentAPI.js";
export class CommentData {
    content;
    parentId;
    constructor(content, parentId) {
        this.content = content;
        this.parentId = parentId || null;
    }
}
export function commentView(comments, postId) {
    const commentBlock = document.getElementById("comment-block");
    const commentTemplate = document.getElementById("comment-template");
    commentBlock.innerHTML = '';
    comments.forEach(comment => {
        const commentClone = document.importNode(commentTemplate.content, true);
        const elements = getCommentElements(commentClone);
        elements.commentAuthor.textContent = comment.author;
        elements.commentContent.textContent = comment.content;
        elements.commentTime.textContent = formatDateForPostInfo(comment.createTime);
        addReplyFullFunctional(elements.addReplyButton, elements.replyBox, elements.replyInput, comment, elements.sendReply, postId);
        if (comment.subComments !== 0) {
            elements.showRepliesButton.style.display = "block";
            subCommentsView(comment.id, elements.subCommentBlock, postId);
        }
        elements.showRepliesButton.addEventListener("click", () => showReplies(elements.subCommentBlock, elements.showRepliesButton));
        commentBlock.appendChild(commentClone);
    });
}
async function subCommentsView(commentId, subCommentBlock, postId) {
    const subCommentTemplate = document.getElementById("comment-template");
    const subCommentsTree = await getCommentTree(commentId);
    subCommentsTree.forEach(subCommentData => {
        const subCommentClone = document.importNode(subCommentTemplate.content, true);
        const subElements = getCommentElements(subCommentClone);
        subElements.commentAuthor.textContent = subCommentData.author;
        subElements.commentContent.textContent = subCommentData.content;
        subElements.commentTime.textContent = formatDateForPostInfo(subCommentData.createTime);
        addReplyFullFunctional(subElements.addReplyButton, subElements.replyBox, subElements.replyInput, subCommentData, subElements.sendReply, postId);
        subCommentBlock.appendChild(subCommentClone);
    });
}
function getCommentElements(commentClone) {
    return {
        commentAuthor: commentClone.querySelector(".comment-author"),
        commentContent: commentClone.querySelector(".comment-description"),
        commentTime: commentClone.querySelector(".comment-time"),
        subCommentBlock: commentClone.querySelector(".sub-comments"),
        showRepliesButton: commentClone.querySelector(".show-replies"),
        replyBox: commentClone.querySelector(".reply-box"),
        addReplyButton: commentClone.querySelector(".give-reply-button"),
        replyInput: commentClone.querySelector(".sub-comment-input"),
        sendReply: commentClone.querySelector(".send-reply-button")
    };
}
function addReply(replyBox) {
    replyBox.style.display = (replyBox.style.display === "block") ? "none" : "block";
}
function showReplies(replies, showRepliesButton) {
    replies.style.display = (replies.style.display === "block") ? "none" : "block";
    showRepliesButton.textContent = (replies.style.display === "block") ? "Скрыть" : "Показать ответы";
}
function addReplyFullFunctional(addReplyButton, replyBox, replyInput, commentData, sendReply, postId) {
    if (localStorage.getItem("token") !== null) {
        addReplyButton.addEventListener("click", () => addReply(replyBox));
    }
    sendReply.addEventListener("click", async () => {
        const newComment = createComment(replyInput.value, commentData.id);
        if (newComment !== null) {
            replyInput.value = "";
            await sendComment(newComment, postId);
            await showPostPage();
        }
    });
}
export function createComment(content, parentId) {
    return content === "" ? null : (parentId ? new CommentData(content, parentId) : new CommentData(content));
}
//# sourceMappingURL=commentFunction.js.map