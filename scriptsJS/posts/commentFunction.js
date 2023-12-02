import { formatDateForPostInfo } from "../helpers/formatDateHelper.js";
import { getCommentTree } from "../api/commentAPI.js";
import { showSinglePost } from "./posts.js";
import { sendComment } from "../api/commentAPI.js";
import { getProfile } from "../api/profileAPI.js";
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
        const commentAuthor = commentClone.querySelector(".comment-author");
        const commentContent = commentClone.querySelector(".comment-description");
        const commentTime = commentClone.querySelector(".comment-time");
        const subCommentBlock = commentClone.querySelector(".sub-comments");
        const showRepliesButton = commentClone.querySelector(".show-replies");
        const replyBox = commentClone.querySelector(".reply-box");
        const addReplyButton = commentClone.querySelector(".give-reply-button");
        const replyInput = commentClone.querySelector(".sub-comment-input");
        const sendReply = commentClone.querySelector(".send-reply-button");
        const commentIsEdited = commentClone.querySelector(".comment-modified-date");
        commentAuthor.textContent = comment.deleteDate !== null ? "[Комментарий удалён]" : comment.author;
        commentContent.textContent = comment.deleteDate !== null ? "[Комментарий удалён]" : comment.content;
        commentTime.textContent = formatDateForPostInfo(comment.createTime);
        addReplyFullFunctional(addReplyButton, replyBox, replyInput, comment, sendReply, postId);
        if (comment.subComments !== 0) {
            showRepliesButton.style.display = "block";
            subCommentsView(comment.id, subCommentBlock, postId);
        }
        showRepliesButton.addEventListener("click", function () {
            showReplies(subCommentBlock, showRepliesButton);
        });
        if (comment.modifiedDate !== null) {
            commentIsEdited.style.display = "block";
            commentIsEdited.title = formatDateForPostInfo(comment.modifiedDate);
        }
        commentBlock.appendChild(commentClone);
    });
}
async function subCommentsView(commentId, subCommentBlock, postId) {
    const subCommentTemplate = document.getElementById("comment-template");
    const subCommentsTree = await getCommentTree(commentId);
    subCommentsTree.forEach(subCommentData => {
        const subCommentClone = document.importNode(subCommentTemplate.content, true);
        const subCommentAuthor = subCommentClone.querySelector(".comment-author");
        const subCommentContent = subCommentClone.querySelector(".comment-description");
        const subCommentTime = subCommentClone.querySelector(".comment-time");
        const subCommentIsEdited = subCommentClone.querySelector(".comment-modified-date");
        const replyBox = subCommentClone.querySelector(".reply-box");
        const addReplyButton = subCommentClone.querySelector(".give-reply-button");
        const replyInput = subCommentClone.querySelector(".sub-comment-input");
        const sendReply = subCommentClone.querySelector(".send-reply-button");
        const editCommentButton = subCommentClone.querySelector(".start-edit-button");
        const deleteCommentButton = subCommentClone.querySelector(".delete-button");
        subCommentAuthor.textContent = subCommentData.deleteDate !== null ? "[Комментарий удалён]" : subCommentData.author;
        subCommentContent.textContent = subCommentData.deleteDate !== null ? "[Комментарий удалён]" : subCommentData.content;
        subCommentTime.textContent = formatDateForPostInfo(subCommentData.createTime);
        if (subCommentData.modifiedDate !== null && subCommentData.deleteDate === null) {
            subCommentIsEdited.style.display = "block";
            subCommentIsEdited.title = formatDateForPostInfo(subCommentData.modifiedDate);
        }
        addReplyFullFunctional(addReplyButton, replyBox, replyInput, subCommentData, sendReply, postId);
        subCommentBlock.appendChild(subCommentClone);
    });
}
function showHiddenInput(replyBox) {
    if (replyBox.style.display === "block") {
        replyBox.style.display = "none";
    }
    else {
        replyBox.style.display = "block";
    }
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
export function createComment(content, parentId) {
    if (parentId) {
        const newComment = content === "" ? null : new CommentData(content, parentId);
        return newComment;
    }
    else {
        const newComment = content === "" ? null : new CommentData(content);
        return newComment;
    }
}
function addReplyFullFunctional(addReplyButton, replyBox, replyInput, commentData, sendReply, postId) {
    if (localStorage.getItem("token") !== null) {
        addReplyButton.addEventListener("click", function () {
            showHiddenInput(replyBox);
        });
    }
    sendReply.addEventListener("click", async function () {
        const newComment = createComment(replyInput.value, commentData.id);
        if (newComment !== null) {
            replyInput.value = "";
            await sendComment(newComment, postId);
            await showSinglePost();
        }
    });
}
async function isUserComment(comment) {
    const user = localStorage.getItem("token") === null ? null : await getProfile();
    return (comment.author === user.fullName);
}
//# sourceMappingURL=commentFunction.js.map