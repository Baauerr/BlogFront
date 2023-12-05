import { publicPostAPI } from "../api/createPostAPI.js";
import { getUsersCommunitiesAPI } from "../api/communityAPI.js";
import { getConcreteCommunityAPI } from "../api/communityAPI.js";
import { createPostInCommunityAPI } from "../api/communityAPI.js";
export class PostInfo {
    readingTime = 0;
    title;
    tags;
    description;
    addressId = null;
    image = null;
    constructor(title, tags, description) {
        this.title = title;
        this.tags = tags;
        this.description = description;
    }
}
export function collectDataForPosrCreating() {
    const formData = new PostInfo("", [], "");
    const tagsInput = document.querySelectorAll('#tags option:checked');
    formData.tags = tagsInput.length > 0 ? Array.from(tagsInput).map(option => option.value).filter(tag => tag !== "null") : undefined;
    const readingTimeInput = document.getElementById('reading-time-input');
    formData.readingTime = readingTimeInput.value ? parseInt(readingTimeInput.value, 10) : undefined;
    const titleInput = document.getElementById('title');
    formData.title = titleInput.value || undefined;
    const descriptionInput = document.getElementById('description');
    formData.description = descriptionInput.value || undefined;
    const imageInput = document.getElementById('image');
    formData.image = imageInput.value || undefined;
    const addressInput = document.getElementById('address-input');
    formData.addressId = addressInput.value || undefined;
    return formData;
}
const createPostButton = document.getElementById("apply_button");
if (createPostButton) {
    createPostButton.addEventListener('click', async () => {
        await publishPost();
    });
}
async function publishPost() {
    const dataFromPage = collectDataForPosrCreating();
    const postSource = document.getElementById("user-communities");
    if (postSource.value !== null && postSource.value !== "user") {
        await createPostInCommunityAPI(dataFromPage, postSource.value);
    }
    else {
        await publicPostAPI(dataFromPage);
    }
}
export async function loadAvailableCommunities() {
    const userCommunities = await getUsersCommunitiesAPI();
    const userCommunitySelect = document.getElementById("user-communities");
    for (const community of userCommunities) {
        if (community.role === "Administrator") {
            const thisCommunity = await getConcreteCommunityAPI(community.communityId);
            const newOption = document.createElement("option");
            newOption.value = thisCommunity.id;
            newOption.text = thisCommunity.name;
            userCommunitySelect.add(newOption);
        }
    }
}
//# sourceMappingURL=createPost.js.map