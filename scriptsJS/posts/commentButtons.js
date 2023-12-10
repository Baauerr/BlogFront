import { CommentEditDataDTO } from "../DTO/comment/commentDTO.js";
import { editComment } from "../api/commentAPI.js";
import { deleteComment } from "../api/commentAPI.js";
import { showPostPage } from "./posts.js";
import { SendCommentDTO } from "../DTO/comment/commentDTO.js";
import { sendComment } from "../api/commentAPI.js";
export function addEventsOnEditButton(editButton, applyEdit, commentContentVisual, editBox, inputBox, commentId, commentContentValue) {
    editButton.addEventListener("click", function () {
        changeMessageBoxToEditBox(commentContentVisual, editBox, inputBox, commentContentValue);
    });
    applyEdit.addEventListener("click", function () {
        applyEditComment(commentId, inputBox.value);
    });
}
export function addEventsOnDeleteButton(deleteButton, commentId) {
    deleteButton.addEventListener("click", function () {
        deleteCommentFromPage(commentId);
    });
}
export function changeMessageBoxToEditBox(commentContentVisual, editBox, inputBox, commentContentValue) {
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
export async function applyEditComment(commentId, commentContentValue) {
    let editCommentData = new CommentEditDataDTO();
    editCommentData.content = commentContentValue;
    await editComment(editCommentData, commentId);
    const isReload = true;
    showPostPage("", isReload);
}
export async function deleteCommentFromPage(commentId) {
    await deleteComment(commentId);
    const isReload = true;
    showPostPage("", isReload);
}
export function showHiddenInput(replyBox) {
    if (replyBox.style.display === "inline") {
        replyBox.style.display = "none";
    }
    else {
        replyBox.style.display = "inline";
    }
}
export function showReplies(replies, showRepliesButton) {
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
export async function addReplyFullFunctional(addReplyButton, replyBox, replyInput, commentData, sendReply, postId) {
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
//# sourceMappingURL=commentButtons.js.map