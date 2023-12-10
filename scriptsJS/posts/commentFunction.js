import { formatDateForPostInfo } from "../helpers/formatDateHelper.js";
import { getCommentTreeAPI } from "../api/commentAPI.js";
import { showPostPage } from "./posts.js";
import { sendComment } from "../api/commentAPI.js";
import { editComment } from "../api/commentAPI.js";
import { deleteComment } from "../api/commentAPI.js";
import { toggleShowMoreButton } from "../mainPage/buttonsOnMainPage.js";
import { readMore } from "../mainPage/buttonsOnMainPage.js";
import { SendCommentDTO } from "../DTO/comment/commentDTO.js";
import { CommentEditDataDTO } from "../DTO/comment/commentDTO.js";
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
function showHiddenInput(replyBox) {
    if (replyBox.style.display === "inline") {
        replyBox.style.display = "none";
    }
    else {
        replyBox.style.display = "inline";
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
        const newComment = content === "" ? null : new SendCommentDTO(content, parentId);
        return newComment;
    }
    else {
        const newComment = content === "" ? null : new SendCommentDTO(content);
        return newComment;
    }
}
async function addReplyFullFunctional(addReplyButton, replyBox, replyInput, commentData, sendReply, postId) {
    addReplyButton.addEventListener("click", function () {
        showHiddenInput(replyBox);
    });
    sendReply.addEventListener("click", async function () {
        const newComment = createComment(replyInput.value, commentData.id);
        if (newComment !== null) {
            replyInput.value = "";
            await sendComment(newComment, postId);
            const isReload = true;
            showPostPage("", isReload);
        }
    });
}
function isUserComment(comment, userFullName) {
    return (userFullName !== null && comment.author === userFullName);
}
function addEventsOnEditButton(editButton, applyEdit, commentContentVisual, editBox, inputBox, commentId, commentContentValue) {
    editButton.addEventListener("click", function () {
        changeMessageBoxToEditBox(commentContentVisual, editBox, inputBox, commentContentValue);
    });
    applyEdit.addEventListener("click", function () {
        applyEditComment(commentId, inputBox.value);
    });
}
function addEventsOnDeleteButton(deleteButton, commentId) {
    deleteButton.addEventListener("click", function () {
        deleteCommentFromPage(commentId);
    });
}
function changeMessageBoxToEditBox(commentContentVisual, editBox, inputBox, commentContentValue) {
    if (editBox.style.display === "none") {
        commentContentVisual.style.display = "none";
        editBox.style.display = "block";
        inputBox.value = commentContentValue;
    }
    else {
        commentContentVisual.style.display = "block";
        editBox.style.display = "none";
        inputBox.value = "";
    }
}
async function applyEditComment(commentId, commentContentValue) {
    let editCommentData = new CommentEditDataDTO();
    editCommentData.content = commentContentValue;
    await editComment(editCommentData, commentId);
    const isReload = true;
    showPostPage("", isReload);
}
async function deleteCommentFromPage(commentId) {
    await deleteComment(commentId);
    const isReload = true;
    showPostPage("", isReload);
}
//# sourceMappingURL=commentFunction.js.map