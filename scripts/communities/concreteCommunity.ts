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
import { MainPageData } from "../mainPage/mainPage.js";

function parseCommunityId(): string {
    const url = new URL(window.location.href);
    const pathNameParts = url.pathname.split('/');
    const postIdIndex = pathNameParts.indexOf('communities');

    if (postIdIndex !== -1 && postIdIndex < pathNameParts.length - 1) {
        return pathNameParts[postIdIndex + 1];
    } else {
        return null;
    }
}

export async function showCommunityPosts() {
    const formData: MainPageData = parseUrlParams();
    updateUrl(formData);
    document.getElementById("postsContainer").innerHTML = '';
    const postTemplate: HTMLTemplateElement = document.getElementById("postTemplate") as HTMLTemplateElement;
    const postsContainer: HTMLDivElement = document.getElementById("postsContainer") as HTMLDivElement;

    const id: string = parseCommunityId();

    const data = await getCommunityPostsAPI(formData, id);
    data.posts.forEach(post => addPostToContainer(post, postTemplate, postsContainer));

    viewPagination(data.pagination.count, data.pagination.current);

    showAdministratorsList(id);
}

function showCommunityInfo(){
    
}


export function addPostToContainer(post: any, postTemplate: HTMLTemplateElement, postsContainer: HTMLDivElement) {
    const postClone: DocumentFragment = document.importNode(postTemplate.content, true);
    const postDescription: HTMLElement = postClone.querySelector(".post-description") as HTMLElement;
    const postImage: HTMLImageElement = postClone.querySelector(".post-image") as HTMLImageElement;
    const postLikes: HTMLSpanElement = postClone.querySelector(".post-likes") as HTMLSpanElement;
    const postTitle: HTMLAnchorElement = postClone.querySelector(".post-title") as HTMLAnchorElement;
    const postAuthor: HTMLElement = postClone.querySelector(".post-author") as HTMLElement;
    const postTags: HTMLElement = postClone.querySelector(".post-tags") as HTMLElement;
    const readingTime: HTMLElement = postClone.querySelector(".reading-time") as HTMLElement;
    const postComments: HTMLElement = postClone.querySelector(".post-comments") as HTMLElement;
    const showMoreButton: HTMLAnchorElement = postClone.querySelector(".show-more") as HTMLAnchorElement;
    const likeButton: HTMLImageElement = postClone.querySelector(".post-like-button") as HTMLImageElement;

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
};

async function showAdministratorsList(id: string) {
    const community = await getConcreteCommunityAPI(id);

    const adminTemplate: HTMLTemplateElement = document.getElementById("administrators-template") as HTMLTemplateElement;
    const adminsClone = document.importNode(adminTemplate.content, true);
    const adminsPlace: HTMLDivElement = document.getElementById("administrators-place") as HTMLDivElement;

    community.administrators.forEach(administrator => {

        const adminNickname: HTMLAnchorElement = adminsClone.querySelector(".administrator-nickname") as HTMLAnchorElement;
        const adminAvatar: HTMLImageElement = adminsClone.querySelector(".avatar-image") as HTMLImageElement;

        adminNickname.href = `/?author=${administrator.fullName}`
        adminNickname.textContent = administrator.fullName
        if (administrator.gender === "Female") {
            adminAvatar.src = '../images/manAvatar.svg'
        }
        else {
            adminAvatar.src = '../images/girlAvatar.svg'
        }

        console.log(adminAvatar.src)

        adminsPlace.appendChild(adminsClone);
    });
}