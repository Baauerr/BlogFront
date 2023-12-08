import { PostDTO } from "../DTO/postDTO/postDTO.js";
import { formatDateForPostInfo } from "../helpers/formatDateHelper.js";

export function getPostAuthor(post: PostDTO): string {
    if (post.communityName === null) {
        return `${post.author} - ${formatDateForPostInfo(post.createTime)}`;
    } else {
        return `${post.author} - ${formatDateForPostInfo(post.createTime)} в сообществе "${post.communityName}"`;
    }
}

export function getPostTags(post: PostDTO) {
    return post.tags.map(tag => `#${tag.name}`).join(' ');
}

export function setPostImage(postImage: HTMLImageElement, imageUrl: string) {
    postImage.src = imageUrl;
    postImage.alt = "Post Image";
    postImage.style.display = "block";
}