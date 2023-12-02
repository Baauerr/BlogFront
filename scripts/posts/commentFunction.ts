import { formatDateForPostInfo } from "../helpers/formatDateHelper.js";
import { getCommentTree } from "../api/commentAPI.js";
import { showSinglePost } from "./posts.js";
import { sendComment } from "../api/commentAPI.js";
import { getProfile } from "../api/profileAPI.js";

export class CommentData {
    content: string
    parentId?: string;

    constructor(content: string, parentId?: string) {
        this.content = content;
        this.parentId = parentId || null;
    }
}

export function commentView(comments, postId) {

    const commentBlock = document.getElementById("comment-block") as HTMLDivElement;
    const commentTemplate = document.getElementById("comment-template") as HTMLTemplateElement;
    commentBlock.innerHTML = '';

    comments.forEach(comment => {
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

        
        commentAuthor.textContent = comment.deleteDate !== null ? "[Комментарий удалён]" : comment.author;
        commentContent.textContent = comment.deleteDate !== null ? "[Комментарий удалён]" : comment.content;

        commentTime.textContent = formatDateForPostInfo(comment.createTime)

        addReplyFullFunctional(addReplyButton, replyBox, replyInput, comment, sendReply, postId);

        if (comment.subComments !== 0) {
            showRepliesButton.style.display = "block"
            subCommentsView(comment.id, subCommentBlock, postId);
        }

        showRepliesButton.addEventListener("click", function () {
            showReplies(subCommentBlock, showRepliesButton);
        });

        if (comment.modifiedDate !== null){
            commentIsEdited.style.display = "block"
            commentIsEdited.title = formatDateForPostInfo(comment.modifiedDate);
        }

        commentBlock.appendChild(commentClone);
    });

}

async function subCommentsView(commentId, subCommentBlock, postId) {

    const subCommentTemplate = document.getElementById("comment-template") as HTMLTemplateElement;


    const subCommentsTree = await getCommentTree(commentId);

    subCommentsTree.forEach(subCommentData => {

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

        
        subCommentAuthor.textContent = subCommentData.deleteDate !== null ? "[Комментарий удалён]" : subCommentData.author;
        subCommentContent.textContent = subCommentData.deleteDate !== null ? "[Комментарий удалён]" :subCommentData.content;
        subCommentTime.textContent = formatDateForPostInfo(subCommentData.createTime);

        if (subCommentData.modifiedDate !== null && subCommentData.deleteDate === null){
            subCommentIsEdited.style.display = "block"
            subCommentIsEdited.title = formatDateForPostInfo(subCommentData.modifiedDate);
        }

        addReplyFullFunctional(addReplyButton, replyBox, replyInput, subCommentData, sendReply, postId);

        subCommentBlock.appendChild(subCommentClone);

    });

}

function showHiddenInput(replyBox) {
    if (replyBox.style.display === "block") {
        replyBox.style.display = "none"
    } else {
        replyBox.style.display = "block"
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

function addReplyFullFunctional(addReplyButton, replyBox, replyInput, commentData, sendReply, postId){
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
            await showSinglePost();
        }
    });
}

async function isUserComment(comment){
    const user = localStorage.getItem("token") === null ? null : await getProfile();
    return (comment.author === user.fullName)
}



