import { Gender } from "../DTO/users/userDTO.js";
import { getListOfAuthorsAPI } from "../api/authorAPI.js";
export async function showAuthorsPlates() {
    const authorTemplate = document.getElementById("author-template");
    const authorsContainer = document.getElementById("authors-place");
    const data = await getListOfAuthorsAPI();
    if (data.length > 0 && Array.isArray(data)) {
        data.forEach(plate => addAuthorToContainer(plate, authorTemplate, authorsContainer));
    }
}
function addAuthorToContainer(plate, authorTemplate, authorsContainer) {
    const authorPlate = document.importNode(authorTemplate.content, true);
    // const authorName: HTMLAnchorElement = document.querySelector<HTMLAnchorElement>(".author-nickname");
    // const createTime: HTMLSpanElement = document.querySelector<HTMLSpanElement>(".create-time");
    // const authorAvatar: HTMLImageElement = document.querySelector<HTMLImageElement>(".avatar-image");
    // const birthDate: HTMLSpanElement = document.querySelector<HTMLSpanElement>(".birth-date");
    // const postAmount: HTMLSpanElement = document.querySelector<HTMLSpanElement>(".posts-amount");
    // const likesAmount: HTMLSpanElement = document.querySelector<HTMLSpanElement>(".likes-amount");
    const authorName = authorPlate.querySelector(".author-nickname");
    const createTime = authorPlate.querySelector(".create-time");
    const authorAvatar = authorPlate.querySelector(".avatar-image");
    const birthDate = authorPlate.querySelector(".birth-date");
    const postAmount = authorPlate.querySelector(".posts-amount");
    const likesAmount = authorPlate.querySelector(".likes-amount");
    authorName.textContent = plate.fullName;
    authorAvatar.src = plate.gender === Gender.Female ? "../images/girlAvatar.svg" : "../images/manAvatar.svg";
    authorName.href = `/?author=${plate.fullName}`;
    createTime.textContent = "Создан: " + plate.created;
    birthDate.textContent = plate.birthDate !== null ? "Дата рождения: " + plate.birthDate : "Дата рождения: -";
    postAmount.textContent = "Постов: " + plate.posts;
    likesAmount.textContent = "Лайков: " + plate.likes;
    authorsContainer.appendChild(authorPlate);
}
//# sourceMappingURL=author.js.map