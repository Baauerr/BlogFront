import { formatDateForPostInfo } from "../helpers/formatDateHelper.js";
import { getCommentTree } from "../api/commentAPI.js";

export function commentView(comments){

    const commentBlock = document.getElementById("comment-block") as HTMLDivElement;
    const commentTemplate = document.getElementById("comment-template") as HTMLTemplateElement; 
    commentBlock.innerHTML = '';

    comments.forEach( comment =>{
        const commentClone = document.importNode(commentTemplate.content, true);

        const commentAuthor = commentClone.querySelector(".comment-author") as HTMLElement;
        const commentContent = commentClone.querySelector(".post-description") as HTMLImageElement;
        const commentTime = commentClone.querySelector(".comment-time") as HTMLElement;
        const subCommentBlock = commentClone.querySelector(".sub-comments") as HTMLDivElement
        const showRepliesButton = commentClone.querySelector(".show-replies") as HTMLElement ;

        commentAuthor.textContent = comment.author;
        commentContent.textContent = comment.content
        commentTime.textContent = formatDateForPostInfo(comment.createTime)

        if (comment.subComments !== 0){
            showRepliesButton.style.display = "block"
            subCommentsView(comment.id, subCommentBlock);
        }

        showRepliesButton.addEventListener("click", function () {
            showReplies(subCommentBlock, showRepliesButton);
        });

        commentBlock.appendChild(commentClone);
    });
    
}

async function subCommentsView(commentId, subCommentBlock) {
    const subCommentTemplate = document.getElementById("comment-template") as HTMLTemplateElement;

    const subCommentsTree = await getCommentTree(commentId);

    subCommentsTree.forEach(subCommentData => {

        const subCommentClone = document.importNode(subCommentTemplate.content, true);

        const subCommentAuthor = subCommentClone.querySelector(".comment-author") as HTMLElement;
        const subCommentContent = subCommentClone.querySelector(".post-description") as HTMLImageElement;
        const subCommentTime = subCommentClone.querySelector(".comment-time") as HTMLElement;

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
        replies.style.display = "none"
        showRepliesButton.textContent = "Показать ответы";
    } else {
        replies.style.display = "block"
        showRepliesButton.textContent = "Скрыть";
    }
}