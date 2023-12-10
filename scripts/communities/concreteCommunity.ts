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
import { parseIdFromUrl } from "../helpers/parserIdFromUrl.js";
import { createPostAction } from "../posts/createPost.js";


export async function showCommunityPosts() {
    const formData: FilterDTO = parseUrlParams();
    const id: string = parseIdFromUrl('communities');
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

    const fromCommunityPage = true;

    showButtonOnCommunityInfo(id, subscribeButton, unsubscribeButton, createPostButton)
    subscribeAction(subscribeButton, unsubscribeButton, community.id, fromCommunityPage);
    unsubscribeAction(subscribeButton, unsubscribeButton, community.id, fromCommunityPage);
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



