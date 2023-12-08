import { getListOfCommunitiesAPI } from "../api/communityAPI.js";
import { getGreatestRoleInCommunityAPI } from "../api/communityAPI.js";
import { subscribeAPI } from "../api/communityAPI.js";
import { unsubscribeAPI } from "../api/communityAPI.js";
import { UserRoles } from "../../DTO/communityDTO/communityDTO.js";
export async function communityListView() {
    document.getElementById("community-plates-place").innerHTML = '';
    const communityTemplate = document.getElementById("communities-template");
    const communitiesContainer = document.getElementById("community-plates-place");
    const data = await getListOfCommunitiesAPI();
    if (data.length > 0 && Array.isArray(data)) {
        data.forEach(plate => addCommunityToContainer(plate, communityTemplate, communitiesContainer));
    }
}
function addCommunityToContainer(plate, communityTemplate, communitiesContainer) {
    const communityPlate = document.importNode(communityTemplate.content, true);
    const communityTitle = communityPlate.querySelector(".community-title");
    communityTitle.textContent = plate.name;
    communityTitle.href = `/communities/${plate.id}`;
    const subscribeButton = communityPlate.querySelector(".subscribe");
    const unsubscribeButton = communityPlate.querySelector(".unsubscribe");
    correctButtons(subscribeButton, unsubscribeButton, plate.id);
    subscribeAction(subscribeButton, unsubscribeButton, plate.id);
    unsubscribeAction(subscribeButton, unsubscribeButton, plate.id);
    communitiesContainer.appendChild(communityPlate);
}
async function correctButtons(subscribe, unsubscribe, id) {
    const userRole = await getGreatestRoleInCommunityAPI(id);
    console.log(userRole);
    console.log(UserRoles.Subscriber);
    if (userRole === UserRoles.Subscriber) {
        unsubscribe.style.display = "block";
    }
    else if (userRole === UserRoles.NoRole) {
        subscribe.style.display = "block";
    }
}
async function subscribeAction(subscribeButton, unsubscribeButton, id) {
    subscribeButton.addEventListener("click", function () {
        subscribeAPI(id);
        subscribeButton.style.display = "none";
        unsubscribeButton.style.display = "block";
    });
}
async function unsubscribeAction(subscribeButton, unsubscribeButton, id) {
    unsubscribeButton.addEventListener("click", function () {
        unsubscribeAPI(id);
        subscribeButton.style.display = "block";
        unsubscribeButton.style.display = "none";
    });
}
//# sourceMappingURL=communityList.js.map