import { publicPostAPI } from "../api/createPostAPI.js";
import { getUsersCommunitiesAPI } from "../api/communityAPI.js";
import { getConcreteCommunityAPI } from "../api/communityAPI.js";
import { createPostInCommunityAPI } from "../api/communityAPI.js";

export class PostInfo {
    readingTime?: number = 0;
    title: string;
    tags: string[];
    description: string;
    addressId?: string | null = null;
    image?: string | null = null;

    constructor(title: string, tags: string[], description: string) {
        this.title = title;
        this.tags = tags;
        this.description = description;
    }
}

export function collectDataForPosrCreating() {

    const formData = new PostInfo("", [], "");

    const tagsInput: NodeListOf<HTMLOptionElement> = document.querySelectorAll('#tags option:checked') as NodeListOf<HTMLOptionElement>;
    formData.tags = tagsInput.length > 0 ? Array.from(tagsInput).map(option => option.value).filter(tag => tag !== "null") : undefined;

    const readingTimeInput: HTMLInputElement = document.getElementById('reading-time-input') as HTMLInputElement;
    formData.readingTime = readingTimeInput.value ? parseInt(readingTimeInput.value, 10) : undefined;

    const titleInput: HTMLInputElement = document.getElementById('title') as HTMLInputElement;
    formData.title = titleInput.value || undefined;

    const descriptionInput: HTMLInputElement = document.getElementById('description') as HTMLInputElement;
    formData.description = descriptionInput.value || undefined;

    const imageInput: HTMLInputElement = document.getElementById('image') as HTMLInputElement;
    formData.image = imageInput.value || undefined;

    const addressInput: HTMLSelectElement = document.getElementById('address-input') as HTMLSelectElement;
    formData.addressId = addressInput.value || undefined;

    return formData;
}

const createPostButton: HTMLButtonElement = document.getElementById("apply_button") as HTMLButtonElement

if (createPostButton) {
    createPostButton.addEventListener('click', async () => {
        await publishPost();
    });
}

async function publishPost(){
    const dataFromPage = collectDataForPosrCreating();

    const postSource: HTMLSelectElement = document.getElementById("user-communities") as HTMLSelectElement
        if (postSource.value !== null && postSource.value !== "user"){
           await createPostInCommunityAPI(dataFromPage, postSource.value);
        }
        else{
            await publicPostAPI(dataFromPage);
        }
}


export async function loadAvailableCommunities() {
    const userCommunities = await getUsersCommunitiesAPI();
    const userCommunitySelect: HTMLSelectElement = document.getElementById("user-communities") as HTMLSelectElement;

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
