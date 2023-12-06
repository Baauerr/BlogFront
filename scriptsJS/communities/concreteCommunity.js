import { postLikeView } from "../mainPage/buttonsOnMainPage.js";
import { getPostAuthor } from "../mainPage/getInfo.js";
import { getPostTags } from "../mainPage/getInfo.js";
import { setPostImage } from "../mainPage/getInfo.js";
import { toggleShowMoreButton } from "../mainPage/buttonsOnMainPage.js";
import { attachEventListeners } from "../mainPage/buttonsOnMainPage.js";
import { updateUrl } from "../mainPage/getDataFromPage.js";
import { viewPagination } from "../mainPage/pagination.js";
import { parseUrlParams } from "../mainPage/getDataFromPage.js";
import { getCommunityPostsAPI } from "../api/communityAPI.js";
import { getConcreteCommunityAPI } from "../api/communityAPI.js";
function parseCommunityId() {
    const url = new URL(window.location.href);
    const pathNameParts = url.pathname.split('/');
    const postIdIndex = pathNameParts.indexOf('communities');
    if (postIdIndex !== -1 && postIdIndex < pathNameParts.length - 1) {
        return pathNameParts[postIdIndex + 1];
    }
    else {
        return null;
    }
}
export async function showCommunityPosts() {
    const formData = parseUrlParams();
    updateUrl(formData);
    document.getElementById("postsContainer").innerHTML = '';
    const postTemplate = document.getElementById("postTemplate");
    const postsContainer = document.getElementById("postsContainer");
    const id = parseCommunityId();
    const data = await getCommunityPostsAPI(formData, id);
    data.posts.forEach(post => addPostToContainer(post, postTemplate, postsContainer));
    viewPagination(data.pagination.count, data.pagination.current);
    showAdministratorsList(id);
}
function showCommunityInfo() {
}
export function addPostToContainer(post, postTemplate, postsContainer) {
    const postClone = document.importNode(postTemplate.content, true);
    const postDescription = postClone.querySelector(".post-description");
    const postImage = postClone.querySelector(".post-image");
    const postLikes = postClone.querySelector(".post-likes");
    const postTitle = postClone.querySelector(".post-title");
    const postAuthor = postClone.querySelector(".post-author");
    const postTags = postClone.querySelector(".post-tags");
    const readingTime = postClone.querySelector(".reading-time");
    const postComments = postClone.querySelector(".post-comments");
    const showMoreButton = postClone.querySelector(".show-more");
    const likeButton = postClone.querySelector(".post-like-button");
    postLikeView(likeButton, post.hasLike);
    postTitle.textContent = post.title;
    postTitle.href = `/post/${post.id}`;
    postAuthor.textContent = getPostAuthor(post);
    postTags.textContent = getPostTags(post);
    readingTime.textContent = `Время чтения: ${post.readingTime} мин.`;
    postLikes.textContent = post.likes;
    postDescription.textContent = post.description.substring(0, 200);
    postComments.textContent = post.commentsCount;
    if (post.image) {
        setPostImage(postImage, post.image);
    }
    if (postDescription) {
        postDescription.dataset.fullDescription = post.description;
    }
    toggleShowMoreButton(showMoreButton, post.description);
    attachEventListeners(post, postDescription, showMoreButton, likeButton, postLikes);
    postsContainer.appendChild(postClone);
}
;
async function showAdministratorsList(id) {
    const community = await getConcreteCommunityAPI(id);
    const adminTemplate = document.getElementById("administrators-template");
    const adminsClone = document.importNode(adminTemplate.content, true);
    const adminsPlace = document.getElementById("administrators-place");
    community.administrators.forEach(administrator => {
        const adminNickname = adminsClone.querySelector(".administrator-nickname");
        const adminAvatar = adminsClone.querySelector(".avatar-image");
        adminNickname.href = `/?author=${administrator.fullName}`;
        adminNickname.textContent = administrator.fullName;
        if (administrator.gender === "Female") {
            adminAvatar.src = '../images/manAvatar.svg';
        }
        else {
            adminAvatar.src = '../images/girlAvatar.svg';
        }
        console.log(adminAvatar.src);
        adminsPlace.appendChild(adminsClone);
    });
}
//# sourceMappingURL=concreteCommunity.js.map