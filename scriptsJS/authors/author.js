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
    createTime.textContent = "Создан: " + normalizeDate(plate.created);
    birthDate.textContent = plate.birthDate !== null ?
        "Дата рождения: " + normalizeDate(plate.birthDate) : "Дата рождения: -";
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
function normalizeDate(date) {
    let normalDate = new Date(date);
    return normalDate.toLocaleDateString();
}
//# sourceMappingURL=author.js.map