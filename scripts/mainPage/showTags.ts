import { getTagsAPI } from "../api/tagsAPI.js"

export async function showTags() {
    const tagsBlock: HTMLSelectElement = document.getElementById('tags') as HTMLSelectElement
    const tags = await getTagsAPI();
    tags.forEach(element => {
        const option: HTMLOptionElement = document.createElement("option");
        option.value = element.id;
        option.text = element.name;
        tagsBlock.add(option);
    });
} 