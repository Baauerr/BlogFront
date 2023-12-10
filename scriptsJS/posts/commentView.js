import { formatDateForPostInfo } from "../helpers/formatDateHelper.js";
import { getCommentTreeAPI } from "../api/commentAPI.js";
import { toggleShowMoreButton } from "../mainPage/buttonsOnMainPage.js";
import { readMore } from "../mainPage/buttonsOnMainPage.js";
import { addEventsOnDeleteButton } from "./commentButtons.js";
import { addEventsOnEditButton } from "./commentButtons.js";
import { showHiddenInput } from "./commentButtons.js";
import { addReplyFullFunctional } from "./commentButtons.js";
import { showReplies } from "./commentButtons.js";
export async function commentView(comments, postId, userFullName) {
    const commentBlock = document.getElementById("comment-block");
    const commentTemplate = document.getElementById("comment-template");
    commentBlock.innerHTML = '';
    for (const comment of comments) {
        const commentClone = document.importNode(commentTemplate.content, true);
        const commentAuthor = commentClone.querySelector(".comment-author");
        const commentContent = commentClone.querySelector(".comment-description");
        const commentTime = commentClone.querySelector(".comment-time");
        const subCommentBlock = commentClone.querySelector(".sub-comments");
        const showRepliesButton = commentClone.querySelector(".show-replies");
        const replyBox = commentClone.querySelector(".reply-box");
        const commentIsEdited = commentClone.querySelector(".comment-modified-date");
        const editCommentButton = commentClone.querySelector(".start-edit-button");
        const deleteCommentButton = commentClone.querySelector(".delete-button");
        const applyChangeButton = commentClone.querySelector(".apply-edit-button");
        const editBox = commentClone.querySelector(".comment-edit-box");
        const inputBox = commentClone.querySelector(".edit-comment-input");
        const showMoreButton = commentClone.querySelector(".show-more-comment");
        if (isUserComment(comment, userFullName) && comment.deleteDate === null) {
            showHiddenInput(editCommentButton);
            showHiddenInput(deleteCommentButton);
        }
        if (localStorage.getItem("token") !== null) {
            const addReplyButton = commentClone.querySelector(".give-reply-button");
            addReplyButton.style.display = "block";
            const replyInput = commentClone.querySelector(".sub-comment-input");
            const sendReply = commentClone.querySelector(".send-reply-button");
            await addReplyFullFunctional(addReplyButton, replyBox, replyInput, comment, sendReply, postId);
        }
        commentAuthor.textContent = comment.deleteDate !== null ? "[Комментарий удалён]" : comment.author;
        commentContent.textContent = comment.deleteDate !== null ? "[Комментарий удалён]" : comment.content.substring(0, 200);
        if (commentContent) {
            commentContent.dataset.fullDescription = comment.content;
        }
        toggleShowMoreButton(showMoreButton, comment.content);
        showMoreButton.addEventListener("click", function () {
            readMore(commentContent, showMoreButton);
        });
        commentTime.textContent = formatDateForPostInfo(comment.createTime);
        addEventsOnEditButton(editCommentButton, applyChangeButton, commentContent, editBox, inputBox, comment.id, comment.content);
        addEventsOnDeleteButton(deleteCommentButton, comment.id);
        if (comment.subComments !== 0) {
            showRepliesButton.style.display = "block";
            subCommentsView(comment.id, subCommentBlock, postId, userFullName);
        }
        showRepliesButton.addEventListener("click", function () {
            showReplies(subCommentBlock, showRepliesButton);
        });
        if (comment.modifiedDate !== null && comment.deleteDate === null) {
            commentIsEdited.style.display = "block";
            commentIsEdited.title = formatDateForPostInfo(comment.modifiedDate);
        }
        commentBlock.appendChild(commentClone);
    }
    ;
}
async function subCommentsView(commentId, subCommentBlock, postId, userFullName) {
    const subCommentTemplate = document.getElementById("comment-template");
    const subCommentsTree = await getCommentTreeAPI(commentId);
    for (const subCommentData of subCommentsTree) {
        const subCommentClone = document.importNode(subCommentTemplate.content, true);
        const subCommentAuthor = subCommentClone.querySelector(".comment-author");
        const subCommentContent = subCommentClone.querySelector(".comment-description");
        const subCommentTime = subCommentClone.querySelector(".comment-time");
        const subCommentIsEdited = subCommentClone.querySelector(".comment-modified-date");
        const replyBox = subCommentClone.querySelector(".reply-box");
        if (localStorage.getItem("token") !== null) {
            const addReplyButton = subCommentClone.querySelector(".give-reply-button");
            addReplyButton.style.display = "block";
            const replyInput = subCommentClone.querySelector(".sub-comment-input");
            const sendReply = subCommentClone.querySelector(".send-reply-button");
            await addReplyFullFunctional(addReplyButton, replyBox, replyInput, subCommentData, sendReply, postId);
        }
        const editCommentButton = subCommentClone.querySelector(".start-edit-button");
        const deleteCommentButton = subCommentClone.querySelector(".delete-button");
        const applyChangeButton = subCommentClone.querySelector(".apply-edit-button");
        const editBox = subCommentClone.querySelector(".comment-edit-box");
        const inputBox = subCommentClone.querySelector(".edit-comment-input");
        if (isUserComment(subCommentData, userFullName) && subCommentData.deleteDate === null) {
            showHiddenInput(editCommentButton);
            showHiddenInput(deleteCommentButton);
        }
        addEventsOnEditButton(editCommentButton, applyChangeButton, subCommentContent, editBox, inputBox, subCommentData.id, subCommentData.content);
        addEventsOnDeleteButton(deleteCommentButton, subCommentData.id);
        subCommentAuthor.textContent = subCommentData.deleteDate !== null ? "[Комментарий удалён]" : subCommentData.author;
        subCommentContent.textContent = subCommentData.deleteDate !== null ? "[Комментарий удалён]" : subCommentData.content;
        subCommentTime.textContent = formatDateForPostInfo(subCommentData.createTime);
        if (subCommentData.modifiedDate !== null && subCommentData.deleteDate === null) {
            subCommentIsEdited.style.display = "block";
            subCommentIsEdited.title = formatDateForPostInfo(subCommentData.modifiedDate);
        }
        subCommentBlock.appendChild(subCommentClone);
    }
    ;
}
function isUserComment(comment, userFullName) {
    return (userFullName !== null && comment.author === userFullName);
}
//# sourceMappingURL=commentView.js.map