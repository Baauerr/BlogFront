import { formatDateForPostInfo } from "../helpers/formatDateHelper.js";
import { getCommentTreeAPI } from "../api/commentAPI.js";
import { showPostPage } from "./posts.js";
import { sendComment } from "../api/commentAPI.js";
import { editComment } from "../api/commentAPI.js";
import { deleteComment } from "../api/commentAPI.js";


export class CommentData {
    content: string
    parentId?: string;

    constructor(content: string, parentId?: string) {
        this.content = content;
        this.parentId = parentId || null;
    }
}

export async function commentView(comments, postId, userFullName) {

    const commentBlock = document.getElementById("comment-block") as HTMLDivElement;
    const commentTemplate = document.getElementById("comment-template") as HTMLTemplateElement;
    commentBlock.innerHTML = '';

    for (const comment of comments) {
        const commentClone = document.importNode(commentTemplate.content, true);

        const commentAuthor = commentClone.querySelector(".comment-author") as HTMLElement;
        const commentContent = commentClone.querySelector(".comment-description") as HTMLImageElement;
        const commentTime = commentClone.querySelector(".comment-time") as HTMLElement;
        const subCommentBlock = commentClone.querySelector(".sub-comments") as HTMLDivElement
        const showRepliesButton = commentClone.querySelector(".show-replies") as HTMLElement;
        const replyBox = commentClone.querySelector(".reply-box") as HTMLDivElement;
        const addReplyButton = commentClone.querySelector(".give-reply-button") as HTMLElement;
        const replyInput = commentClone.querySelector(".sub-comment-input") as HTMLInputElement;
        const sendReply = commentClone.querySelector(".send-reply-button") as HTMLButtonElement;
        const commentIsEdited = commentClone.querySelector(".comment-modified-date") as HTMLElement;
        const editCommentButton = commentClone.querySelector(".start-edit-button") as HTMLImageElement;
        const deleteCommentButton = commentClone.querySelector(".delete-button") as HTMLImageElement;
        const applyChangeButton = commentClone.querySelector(".apply-edit-button") as HTMLButtonElement;
        const editBox = commentClone.querySelector(".comment-edit-box") as HTMLDivElement;
        const inputBox = commentClone.querySelector(".edit-comment-input") as HTMLInputElement;

        if (isUserComment(comment, userFullName) && comment.deleteDate === null) {
            showHiddenInput(editCommentButton);
            showHiddenInput(deleteCommentButton);
        }


        commentAuthor.textContent = comment.deleteDate !== null ? "[Комментарий удалён]" : comment.author;
        commentContent.textContent = comment.deleteDate !== null ? "[Комментарий удалён]" : comment.content;

        commentTime.textContent = formatDateForPostInfo(comment.createTime)

        addReplyFullFunctional(addReplyButton, replyBox, replyInput, comment, sendReply, postId);

        addEventsOnEditButton(editCommentButton, applyChangeButton, commentContent, editBox, inputBox, comment.id, comment.content);
        addEventsOnDeleteButton(deleteCommentButton, comment.id);

        if (comment.subComments !== 0) {
            showRepliesButton.style.display = "block"
            subCommentsView(comment.id, subCommentBlock, postId, userFullName);
        }

        showRepliesButton.addEventListener("click", function () {
            showReplies(subCommentBlock, showRepliesButton);
        });

        if (comment.modifiedDate !== null && comment.deleteDate === null) {
            commentIsEdited.style.display = "block"
            commentIsEdited.title = formatDateForPostInfo(comment.modifiedDate);
        }

        commentBlock.appendChild(commentClone);
    };
}


async function subCommentsView(commentId, subCommentBlock, postId, userFullName) {

    const subCommentTemplate = document.getElementById("comment-template") as HTMLTemplateElement;


    const subCommentsTree = await getCommentTreeAPI(commentId);

    for (const subCommentData of subCommentsTree) {

        const subCommentClone = document.importNode(subCommentTemplate.content, true);

        const subCommentAuthor = subCommentClone.querySelector(".comment-author") as HTMLElement;
        const subCommentContent = subCommentClone.querySelector(".comment-description") as HTMLImageElement;
        const subCommentTime = subCommentClone.querySelector(".comment-time") as HTMLElement;
        const subCommentIsEdited = subCommentClone.querySelector(".comment-modified-date") as HTMLElement;

        const replyBox = subCommentClone.querySelector(".reply-box") as HTMLDivElement;
        const addReplyButton = subCommentClone.querySelector(".give-reply-button") as HTMLElement;
        const replyInput = subCommentClone.querySelector(".sub-comment-input") as HTMLInputElement;
        const sendReply = subCommentClone.querySelector(".send-reply-button") as HTMLButtonElement;
        const editCommentButton = subCommentClone.querySelector(".start-edit-button") as HTMLImageElement;
        const deleteCommentButton = subCommentClone.querySelector(".delete-button") as HTMLImageElement;
        const applyChangeButton = subCommentClone.querySelector(".apply-edit-button") as HTMLButtonElement;
        const editBox = subCommentClone.querySelector(".comment-edit-box") as HTMLDivElement;
        const inputBox = subCommentClone.querySelector(".edit-comment-input") as HTMLInputElement;

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
            subCommentIsEdited.style.display = "block"
            subCommentIsEdited.title = formatDateForPostInfo(subCommentData.modifiedDate);
        }

        await addReplyFullFunctional(addReplyButton, replyBox, replyInput, subCommentData, sendReply, postId);

        subCommentBlock.appendChild(subCommentClone);

    };
}

function showHiddenInput(replyBox) {
    if (replyBox.style.display === "inline") {
        replyBox.style.display = "none"
    } else {
        replyBox.style.display = "inline"
    }
}

function showReplies(replies, showRepliesButton) {
    if (replies.style.display === "block") {
        replies.style.display = "none"
        showRepliesButton.textContent = "Показать ответы";
    } else {
        replies.style.display = "block"
        showRepliesButton.textContent = "Скрыть";
    }
}

export function createComment(content: string, parentId?: string): CommentData {
    if (parentId) {
        const newComment = content === "" ? null : new CommentData(content, parentId);
        return newComment;
    }
    else {
        const newComment = content === "" ? null : new CommentData(content);
        return newComment;
    }
}

async function addReplyFullFunctional(addReplyButton, replyBox, replyInput, commentData, sendReply, postId) {
    if (localStorage.getItem("token") !== null) {
        addReplyButton.addEventListener("click", function () {
            showHiddenInput(replyBox);
        });
    }

    sendReply.addEventListener("click", async function () {
        const newComment = createComment(replyInput.value, commentData.id);
        if (newComment !== null) {
            replyInput.value = ""
            await sendComment(newComment, postId);
            await showPostPage();
        }
    });
}

function isUserComment(comment, userFullName) {
    return (userFullName !== null && comment.author === userFullName)
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
    const editCommentData = new CommentEditData;
    editCommentData.content = commentContentValue;
    await editComment(editCommentData, commentId)
    await showPostPage();
}

async function deleteCommentFromPage(commentId) {
    await deleteComment(commentId)
    await showPostPage();
}

export class CommentEditData{
    content: string;
}