import { publicPostAPI } from "../api/createPostAPI.js";
import { getUsersCommunitiesAPI } from "../api/communityAPI.js";
import { getConcreteCommunityAPI } from "../api/communityAPI.js";
import { createPostInCommunityAPI } from "../api/communityAPI.js";
import { PostInfoDTO } from "../DTO/postDTO/postDTO.js";
import { ErrorsDTO } from "../DTO/errorDTO/errorDTO.js";
import { validateNewPostInfo } from "./postValidation.js";
import { takeErrorTextAsync } from "../helpers/errorCreateHelper.js";
import { router } from "../routing/routing.js";
export function collectDataForPosrCreating() {
    const formData = new PostInfoDTO("", [], "");
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
    let errorsArray = new ErrorsDTO();
    errorsArray = validateNewPostInfo(dataFromPage, errorsArray);
    const container = document.getElementById('input-create-post');
    const inputElements = container.querySelectorAll('input, select, textarea');
    const postSource = document.getElementById("user-communities");
    if (errorsArray.errors.length > 0) {
        await takeErrorTextAsync(errorsArray, container, inputElements);
    }
    else {
        await takeErrorTextAsync(errorsArray, container, inputElements);
        if (postSource.value !== null && postSource.value !== "user") {
            await createPostInCommunityAPI(dataFromPage, postSource.value);
        }
        else {
            await publicPostAPI(dataFromPage);
        }
    }
}
export async function loadCommunitiesToCreatePost(selectedId) {
    const userCommunities = await getUsersCommunitiesAPI();
    const userCommunitySelect = document.getElementById("user-communities");
    for (const community of userCommunities) {
        if (community.role === "Administrator") {
            const thisCommunity = await getConcreteCommunityAPI(community.communityId);
            const newOption = document.createElement("option");
            newOption.value = thisCommunity.id;
            newOption.text = thisCommunity.name;
            if (selectedId && thisCommunity.id === selectedId) {
                newOption.selected = true;
            }
            userCommunitySelect.add(newOption);
        }
    }
}
export function createPostAction(id, createPostButton) {
    createPostButton.addEventListener("click", () => {
        window.history.pushState({}, null, '/post/create');
        router();
        loadCommunitiesToCreatePost(id);
    });
}
//# sourceMappingURL=createPost.js.map