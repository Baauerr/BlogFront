import { parseUrlParams } from "../mainPage/getDataFromPage.js";
import { getCommunityPostsAPI } from "../api/communityAPI.js";
import { getConcreteCommunityAPI } from "../api/communityAPI.js";
import { FilterDTO } from "../DTO/filterDTO/filterDTO.js";
import { Gender } from "../DTO/users/userDTO.js";
import { getGreatestRoleInCommunityAPI } from "../api/communityAPI.js";
import { ConcreteCommunityDTO, UserRoles } from "../DTO/communityDTO/communityDTO.js";
import { subscribeAction } from "./communityList.js";
import { unsubscribeAction } from "./communityList.js";
import { displayPosts } from "../mainPage/mainPagePostView.js";
import { setupApplyButton } from "../mainPage/buttonsOnMainPage.js";
import { loadCommunitiesToCreatePost } from "../posts/createPost.js";
import { router } from "../routing/routing.js";


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
    const formData: FilterDTO = parseUrlParams();
    const id: string = parseCommunityId();
    await displayPosts(getCommunityPostsAPI, formData, id);

    const community: ConcreteCommunityDTO = await getConcreteCommunityAPI(id);
    showAdministratorsList(community);
    showCommunityInfo(id);
}



async function showCommunityInfo(id: string) {

    const community: ConcreteCommunityDTO = await getConcreteCommunityAPI(id);

    const communityTitle: HTMLParagraphElement = document.getElementById("concrete-community-title") as HTMLParagraphElement;
    const subscribersCount: HTMLParagraphElement = document.getElementById("subscribers-amount") as HTMLParagraphElement;
    const typeOfCommunity: HTMLParagraphElement = document.getElementById("community-type") as HTMLParagraphElement;
    const subscribeButton: HTMLButtonElement = document.getElementById("subscribe-button") as HTMLButtonElement;
    const unsubscribeButton: HTMLButtonElement = document.getElementById("unsubscribe-button") as HTMLButtonElement;
    const createPostButton: HTMLButtonElement = document.getElementById("create-community-post-button") as HTMLButtonElement;

    communityTitle.textContent = "Группа " + '"' + community.name + '"';
    subscribersCount.textContent = community.subscribersCount + " подписчиков"

    const type: string = community.isClosed ? "закрытое" : "открытое"

    typeOfCommunity.textContent = "Тип сообщества: " + type;

    showButtonOnCommunityInfo(id, subscribeButton, unsubscribeButton, createPostButton)
    subscribeAction(subscribeButton, unsubscribeButton, community.id);
    unsubscribeAction(subscribeButton, unsubscribeButton, community.id);
    createPostAction(id, createPostButton);
}

async function showAdministratorsList(community: ConcreteCommunityDTO) {

    const adminTemplate: HTMLTemplateElement = document.getElementById("administrators-template") as HTMLTemplateElement;
    const adminsPlace: HTMLDivElement = document.getElementById("administrators-place") as HTMLDivElement;
    const adminsClone = document.importNode(adminTemplate.content, true);

    adminsPlace.innerHTML = '';

    community.administrators.forEach(administrator => {


        const adminNickname: HTMLAnchorElement = adminsClone.querySelector(".administrator-nickname") as HTMLAnchorElement;
        const adminAvatar: HTMLImageElement = adminsClone.querySelector(".avatar-image") as HTMLImageElement;

        adminNickname.href = `/?author=${administrator.fullName}`
        adminNickname.textContent = administrator.fullName
        adminAvatar.src = administrator.gender === Gender.Female ? '../images/girlAvatar.svg' : '../images/manAvatar.svg';

        adminsPlace.appendChild(adminsClone);
    });
}


export async function showButtonOnCommunityInfo(id: string, subscribeButtin: HTMLButtonElement, unsubscribeButton: HTMLButtonElement, createPostButton: HTMLButtonElement) {

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

function createPostAction(id: string, createPostButton: HTMLButtonElement) {
    createPostButton.addEventListener("click", () => {
        window.history.pushState({}, null, '/post/create');
        router();
        loadCommunitiesToCreatePost(id);
    })
}


