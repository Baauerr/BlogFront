import { getTags } from "../api/tagsAPI.js";
export async function showTags() {
    const tagsBlock = document.getElementById('tagsSquare');
    const tags = await getTags();
    tags.forEach(element => {
        var option = document.createElement("option");
        option.value = element.id;
        option.text = element.name;
        tagsBlock.add(option);
    });
}
//# sourceMappingURL=showTags.js.map