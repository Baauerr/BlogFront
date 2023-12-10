import { formatDateForPostInfo } from "../helpers/formatDateHelper.js";
import { getCommentTreeAPI } from "../api/commentAPI.js";
import { showPostPage } from "./posts.js";
import { sendComment } from "../api/commentAPI.js";
import { editComment } from "../api/commentAPI.js";
import { deleteComment } from "../api/commentAPI.js";
import { toggleShowMoreButton } from "../mainPage/buttonsOnMainPage.js";
import { readMore } from "../mainPage/buttonsOnMainPage.js";
import { CommentDTO } from "../DTO/comment/commentDTO.js";
import { SendCommentDTO } from "../DTO/comment/commentDTO.js";
import { CommentEditDataDTO } from "../DTO/comment/commentDTO.js";

export async function commentView(comments: CommentDTO[], postId: string, userFullName: string) {

    const commentBlock: HTMLDivElement = document.getElementById("comment-block") as HTMLDivElement;
    const commentTemplate: HTMLTemplateElement = document.getElementById("comment-template") as HTMLTemplateElement;
    commentBlock.innerHTML = '';

    for (const comment of comments) {
        const commentClone = document.importNode(commentTemplate.content, true);

        const commentAuthor: HTMLSpanElement = commentClone.querySelector(".comment-author") as HTMLSpanElement;
        const commentContent: HTMLImageElement = commentClone.querySelector(".comment-description") as HTMLImageElement;
        const commentTime: HTMLSpanElement = commentClone.querySelector(".comment-time") as HTMLSpanElement;
        const subCommentBlock: HTMLDivElement = commentClone.querySelector(".sub-comments") as HTMLDivElement
        const showRepliesButton: HTMLAnchorElement = commentClone.querySelector(".show-replies") as HTMLAnchorElement;
        const replyBox: HTMLDivElement = commentClone.querySelector(".reply-box") as HTMLDivElement;
        const commentIsEdited: HTMLAnchorElement = commentClone.querySelector(".comment-modified-date") as HTMLAnchorElement;
        const editCommentButton: HTMLImageElement = commentClone.querySelector(".start-edit-button") as HTMLImageElement;
        const deleteCommentButton: HTMLImageElement = commentClone.querySelector(".delete-button") as HTMLImageElement;
        const applyChangeButton: HTMLButtonElement = commentClone.querySelector(".apply-edit-button") as HTMLButtonElement;
        const editBox: HTMLDivElement = commentClone.querySelector(".comment-edit-box") as HTMLDivElement;
        const inputBox: HTMLInputElement = commentClone.querySelector(".edit-comment-input") as HTMLInputElement;
        const showMoreButton: HTMLAnchorElement = commentClone.querySelector(".show-more-comment") as HTMLAnchorElement;

        if (isUserComment(comment, userFullName) && comment.deleteDate === null) {
            console.log(comment)
            showHiddenInput(editCommentButton);
            showHiddenInput(deleteCommentButton);
        }

        if (localStorage.getItem("token") !== null) {

            const addReplyButton: HTMLAnchorElement = commentClone.querySelector(".give-reply-button") as HTMLAnchorElement;

            addReplyButton.style.display = "block";

            const replyInput: HTMLInputElement = commentClone.querySelector(".sub-comment-input") as HTMLInputElement;
            const sendReply: HTMLButtonElement = commentClone.querySelector(".send-reply-button") as HTMLButtonElement;

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

        commentTime.textContent = formatDateForPostInfo(comment.createTime)

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


async function subCommentsView(commentId: string, subCommentBlock: HTMLDivElement, postId: string, userFullName: string) {

    const subCommentTemplate: HTMLTemplateElement = document.getElementById("comment-template") as HTMLTemplateElement;


    const subCommentsTree: CommentDTO[] = await getCommentTreeAPI(commentId);

    for (const subCommentData of subCommentsTree) {

        const subCommentClone: DocumentFragment = document.importNode(subCommentTemplate.content, true);

        const subCommentAuthor: HTMLSpanElement = subCommentClone.querySelector(".comment-author") as HTMLSpanElement;
        const subCommentContent: HTMLImageElement = subCommentClone.querySelector(".comment-description") as HTMLImageElement;
        const subCommentTime: HTMLSpanElement = subCommentClone.querySelector(".comment-time") as HTMLSpanElement;
        const subCommentIsEdited: HTMLAnchorElement = subCommentClone.querySelector(".comment-modified-date") as HTMLAnchorElement;

        const replyBox: HTMLDivElement = subCommentClone.querySelector(".reply-box") as HTMLDivElement;

        if (localStorage.getItem("token") !== null) {

            const addReplyButton: HTMLAnchorElement = subCommentClone.querySelector(".give-reply-button") as HTMLAnchorElement;

            addReplyButton.style.display = "block";

            const replyInput: HTMLInputElement = subCommentClone.querySelector(".sub-comment-input") as HTMLInputElement;
            const sendReply: HTMLButtonElement = subCommentClone.querySelector(".send-reply-button") as HTMLButtonElement;

            await addReplyFullFunctional(addReplyButton, replyBox, replyInput, subCommentData, sendReply, postId);
        }

        const editCommentButton: HTMLImageElement = subCommentClone.querySelector(".start-edit-button") as HTMLImageElement;
        const deleteCommentButton: HTMLImageElement = subCommentClone.querySelector(".delete-button") as HTMLImageElement;
        const applyChangeButton: HTMLButtonElement = subCommentClone.querySelector(".apply-edit-button") as HTMLButtonElement;
        const editBox: HTMLDivElement = subCommentClone.querySelector(".comment-edit-box") as HTMLDivElement;
        const inputBox: HTMLInputElement = subCommentClone.querySelector(".edit-comment-input") as HTMLInputElement;



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



        subCommentBlock.appendChild(subCommentClone);

    };
}

function showHiddenInput(replyBox: any) {
    if (replyBox.style.display === "inline") {
        replyBox.style.display = "none"
    } else {
        replyBox.style.display = "inline"
    }
}

function showReplies(replies: HTMLDivElement, showRepliesButton: HTMLAnchorElement) {
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

async function addReplyFullFunctional(
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

function isUserComment(comment: CommentDTO, userFullName: string) {
    return (userFullName !== null && comment.author === userFullName)
}

function addEventsOnEditButton(
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

function addEventsOnDeleteButton(deleteButton: HTMLImageElement, commentId: string) {
    deleteButton.addEventListener("click", function () {
        deleteCommentFromPage(commentId);
    });
}

function changeMessageBoxToEditBox(commentContentVisual: HTMLImageElement, editBox: HTMLDivElement, inputBox: HTMLInputElement, commentContentValue: string) {
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

async function applyEditComment(commentId: string, commentContentValue: string) {
    let editCommentData: CommentEditDataDTO = new CommentEditDataDTO();
    editCommentData.content = commentContentValue;

    await editComment(editCommentData, commentId)
    const isReload = true
    showPostPage("", isReload);
}

async function deleteCommentFromPage(commentId: string) {
    await deleteComment(commentId)
    const isReload = true
    showPostPage("", isReload);
}
