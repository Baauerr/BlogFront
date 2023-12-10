import { parseUrlParams } from "../mainPage/getDataFromPage.js";
import { getCommunityPostsAPI } from "../api/communityAPI.js";
import { getConcreteCommunityAPI } from "../api/communityAPI.js";
import { Gender } from "../DTO/users/userDTO.js";
import { getGreatestRoleInCommunityAPI } from "../api/communityAPI.js";
import { UserRoles } from "../DTO/communityDTO/communityDTO.js";
import { subscribeAction } from "./communityList.js";
import { unsubscribeAction } from "./communityList.js";
import { displayPosts } from "../mainPage/mainPagePostView.js";
import { loadCommunitiesToCreatePost } from "../posts/createPost.js";
import { router } from "../routing/routing.js";
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
    const id = parseCommunityId();
    await displayPosts(getCommunityPostsAPI, formData, id);
    const community = await getConcreteCommunityAPI(id);
    showAdministratorsList(community);
    showCommunityInfo(id);
}
async function showCommunityInfo(id) {
    const community = await getConcreteCommunityAPI(id);
    const communityTitle = document.getElementById("concrete-community-title");
    const subscribersCount = document.getElementById("subscribers-amount");
    const typeOfCommunity = document.getElementById("community-type");
    const subscribeButton = document.getElementById("subscribe-button");
    const unsubscribeButton = document.getElementById("unsubscribe-button");
    const createPostButton = document.getElementById("create-community-post-button");
    communityTitle.textContent = "Группа " + '"' + community.name + '"';
    subscribersCount.textContent = community.subscribersCount + " подписчиков";
    const type = community.isClosed ? "закрытое" : "открытое";
    typeOfCommunity.textContent = "Тип сообщества: " + type;
    const fromCommunityPage = true;
    showButtonOnCommunityInfo(id, subscribeButton, unsubscribeButton, createPostButton);
    subscribeAction(subscribeButton, unsubscribeButton, community.id, fromCommunityPage);
    unsubscribeAction(subscribeButton, unsubscribeButton, community.id, fromCommunityPage);
    createPostAction(id, createPostButton);
}
async function showAdministratorsList(community) {
    const adminTemplate = document.getElementById("administrators-template");
    const adminsPlace = document.getElementById("administrators-place");
    const adminsClone = document.importNode(adminTemplate.content, true);
    adminsPlace.innerHTML = '';
    community.administrators.forEach(administrator => {
        const adminNickname = adminsClone.querySelector(".administrator-nickname");
        const adminAvatar = adminsClone.querySelector(".avatar-image");
        adminNickname.href = `/?author=${administrator.fullName}`;
        adminNickname.textContent = administrator.fullName;
        adminAvatar.src = administrator.gender === Gender.Female ? '../images/girlAvatar.svg' : '../images/manAvatar.svg';
        adminsPlace.appendChild(adminsClone);
    });
}
export async function showButtonOnCommunityInfo(id, subscribeButtin, unsubscribeButton, createPostButton) {
    const userRole = await getGreatestRoleInCommunityAPI(id);
    switch (userRole) {
        case UserRoles.Administrator:
            createPostButton.style.display = "inline";
            break;
        case UserRoles.Subscriber:
            unsubscribeButton.style.display = "inline";
            break;
        default:
            subscribeButtin.style.display = "inline";
            break;
    }
}
function createPostAction(id, createPostButton) {
    createPostButton.addEventListener("click", () => {
        window.history.pushState({}, null, '/post/create');
        router();
        loadCommunitiesToCreatePost(id);
    });
}
//# sourceMappingURL=concreteCommunity.js.map