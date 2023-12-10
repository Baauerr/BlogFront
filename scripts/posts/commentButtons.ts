import { CommentEditDataDTO } from "../DTO/comment/commentDTO.js";
import { editComment } from "../api/commentAPI.js";
import { deleteComment } from "../api/commentAPI.js";
import { showPostPage } from "./posts.js";
import { SendCommentDTO } from "../DTO/comment/commentDTO.js";
import { CommentDTO } from "../DTO/comment/commentDTO.js";
import { sendComment } from "../api/commentAPI.js";


export function addEventsOnEditButton(
    editButton: HTMLImageElement, applyEdit: HTMLButtonElement, commentContentVisual: HTMLImageElement,
    editBox: HTMLDivElement, inputBox: HTMLInputElement, commentId: string, commentContentValue: string
) {

    editButton.addEventListener("click", function () {
        changeMessageBoxToEditBox(commentContentVisual, editBox, inputBox, commentContentValue);
    });

    applyEdit.addEventListener("click", function () {
        applyEditComment(commentId, inputBox.value);
    });
}

export function addEventsOnDeleteButton(deleteButton: HTMLImageElement, commentId: string) {
    deleteButton.addEventListener("click", function () {
        deleteCommentFromPage(commentId);
    });
}

export function changeMessageBoxToEditBox(commentContentVisual: HTMLImageElement, editBox: HTMLDivElement, inputBox: HTMLInputElement, commentContentValue: string) {
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

export async function applyEditComment(commentId: string, commentContentValue: string) {
    let editCommentData: CommentEditDataDTO = new CommentEditDataDTO();
    editCommentData.content = commentContentValue;

    await editComment(editCommentData, commentId)
    const isReload = true
    showPostPage("", isReload);
}

export async function deleteCommentFromPage(commentId: string) {
    await deleteComment(commentId)
    const isReload = true
    showPostPage("", isReload);
}


export function showHiddenInput(replyBox: any) {
    if (replyBox.style.display === "inline") {
        replyBox.style.display = "none"
    } else {
        replyBox.style.display = "inline"
    }
}

export function showReplies(replies: HTMLDivElement, showRepliesButton: HTMLAnchorElement) {
    if (replies.style.display === "block") {
        replies.style.display = "none"
        showRepliesButton.textContent = "Показать ответы";
    } else {
        replies.style.display = "block"
        showRepliesButton.textContent = "Скрыть";
    }
}

export function createComment(content: string, parentId?: string): SendCommentDTO {
    if (parentId) {
        const newComment: SendCommentDTO = content === "" ? null : new SendCommentDTO(content, parentId);
        return newComment;
    }
    else {
        const newComment: SendCommentDTO = content === "" ? null : new SendCommentDTO(content);
        return newComment;
    }
}

export async function addReplyFullFunctional(
    addReplyButton: HTMLAnchorElement, replyBox: HTMLDivElement, replyInput: HTMLInputElement,
    commentData: CommentDTO, sendReply: HTMLButtonElement, postId: string
) {

    addReplyButton.addEventListener("click", function () {
        showHiddenInput(replyBox);
    });

    sendReply.addEventListener("click", async function () {
        const newComment: SendCommentDTO = createComment(replyInput.value, commentData.id);
        if (newComment !== null) {
            replyInput.value = ""
            await sendComment(newComment, postId);
            const isReload = true
            showPostPage("", isReload);

        }
    });
}