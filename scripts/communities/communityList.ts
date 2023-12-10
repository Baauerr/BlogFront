import { getListOfCommunitiesAPI } from "../api/communityAPI.js";
import { getGreatestRoleInCommunityAPI } from "../api/communityAPI.js";
import { subscribeAPI } from "../api/communityAPI.js";
import { unsubscribeAPI } from "../api/communityAPI.js";
import { CommunityDTO, UserRoles } from "../DTO/communityDTO/communityDTO.js";
import { showCommunityPosts } from "./concreteCommunity.js";

export async function communityListView() {
    document.getElementById("community-plates-place").innerHTML = '';

    const communityTemplate: HTMLTemplateElement = document.getElementById("communities-template") as HTMLTemplateElement;
    const communitiesContainer: HTMLDivElement = document.getElementById("community-plates-place") as HTMLDivElement;

    const data: CommunityDTO[] = await getListOfCommunitiesAPI();
    if (data.length > 0 && Array.isArray(data)) {
        data.forEach(plate => addCommunityToContainer(plate, communityTemplate, communitiesContainer));
    }
}

function addCommunityToContainer(plate: CommunityDTO, communityTemplate: HTMLTemplateElement, communitiesContainer: HTMLDivElement) {
    const communityPlate: DocumentFragment = document.importNode(communityTemplate.content, true);

    const communityTitle: HTMLAnchorElement = communityPlate.querySelector(".community-title") as HTMLAnchorElement;
    communityTitle.textContent = plate.name;
    communityTitle.href = `/communities/${plate.id}`

    const subscribeButton: HTMLButtonElement = communityPlate.querySelector(".subscribe") as HTMLButtonElement;
    const unsubscribeButton: HTMLButtonElement = communityPlate.querySelector(".unsubscribe") as HTMLButtonElement;

    correctButtons(subscribeButton, unsubscribeButton, plate.id);
    subscribeAction(subscribeButton, unsubscribeButton, plate.id);
    unsubscribeAction(subscribeButton, unsubscribeButton, plate.id);

    communitiesContainer.appendChild(communityPlate);
}

async function correctButtons(subscribe: HTMLButtonElement, unsubscribe: HTMLButtonElement, id: string) {
    const userRole: UserRoles = await getGreatestRoleInCommunityAPI(id);

    if (userRole === UserRoles.Subscriber) {
        unsubscribe.style.display = "block";
    }
    else if (userRole === UserRoles.NoRole) {
        subscribe.style.display = "block"
    }
}

export async function subscribeAction(
    subscribeButton: HTMLButtonElement, unsubscribeButton: HTMLButtonElement, id: string, fromCommunityPage?: boolean
    ) {
    subscribeButton.addEventListener("click", async function () {
        subscribeAPI(id);
        subscribeButton.style.display = "none";
        unsubscribeButton.style.display = "block"
        if (fromCommunityPage){
            showCommunityPosts(); 
        }
    })
}

export async function unsubscribeAction(
    subscribeButton: HTMLButtonElement, unsubscribeButton: HTMLButtonElement, id: string, fromCommunityPage?: boolean
) {
    unsubscribeButton.addEventListener("click", async function () {
        unsubscribeAPI(id);
        subscribeButton.style.display = "block";
        unsubscribeButton.style.display = "none"
        if (fromCommunityPage){
            showCommunityPosts(); 
        }
    })
}
