import { Gender } from "../DTO/users/userDTO.js";
import { getListOfAuthorsAPI } from "../api/authorAPI.js";
export async function showAuthorsPlates() {
    const authorTemplate = document.getElementById("author-template");
    const authorsContainer = document.getElementById("authors-place");
    const data = await getListOfAuthorsAPI();
    const sortedAuthors = [...data];
    sortedAuthors.sort(compareAuthors);
    const topAuthors = sortedAuthors.slice(0, 3);
    if (data.length > 0 && Array.isArray(data)) {
        data.forEach(plate => addAuthorToContainer(plate, authorTemplate, authorsContainer, topAuthors));
    }
}
function addAuthorToContainer(plate, authorTemplate, authorsContainer, topAuthors) {
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
    const userPosition = authorPlate.querySelector(".avatar-crown-image");
    authorName.textContent = plate.fullName;
    authorAvatar.src = plate.gender === Gender.Female ? "../images/girlAvatar.svg" : "../images/manAvatar.svg";
    authorName.href = `/?author=${plate.fullName}`;
    createTime.textContent = "Создан: " + plate.created;
    birthDate.textContent = plate.birthDate !== null ? "Дата рождения: " + plate.birthDate : "Дата рождения: -";
    postAmount.textContent = "Постов: " + plate.posts;
    likesAmount.textContent = "Лайков: " + plate.likes;
    const index = topAuthors.findIndex((author) => author.fullName === plate.fullName);
    switch (index) {
        case 2:
        case 1:
        case 0:
            userPosition.src = `../images/${index}.svg`;
            userPosition.style.display = "block";
            break;
        default:
            break;
    }
    authorsContainer.appendChild(authorPlate);
}
function compareAuthors(a, b) {
    if (a.posts !== b.posts) {
        return b.posts - a.posts;
    }
    else if (a.likes !== b.likes) {
        return b.likes - a.likes;
    }
    else {
        return new Date(b.created).getTime() - new Date(a.created).getTime();
    }
}
//# sourceMappingURL=author.js.map