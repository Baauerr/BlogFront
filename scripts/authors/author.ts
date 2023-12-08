import { AuthorDTO } from "../DTO/author/authorDTO.js";
import { Gender } from "../DTO/users/userDTO.js";
import { getListOfAuthorsAPI } from "../api/authorAPI.js";

export async function showAuthorsPlates(){
    const authorTemplate: HTMLTemplateElement = document.getElementById("author-template") as HTMLTemplateElement;
    const authorsContainer: HTMLDivElement = document.getElementById("authors-place") as HTMLDivElement;

    const data: AuthorDTO[] = await getListOfAuthorsAPI();
    if (data.length > 0 && Array.isArray(data)) {
        data.forEach(plate => addAuthorToContainer(plate, authorTemplate, authorsContainer));
    }
}

function addAuthorToContainer(plate: AuthorDTO, authorTemplate: HTMLTemplateElement, authorsContainer: HTMLDivElement){
    const authorPlate: DocumentFragment = document.importNode(authorTemplate.content, true);

    // const authorName: HTMLAnchorElement = document.querySelector<HTMLAnchorElement>(".author-nickname");
    // const createTime: HTMLSpanElement = document.querySelector<HTMLSpanElement>(".create-time");
    // const authorAvatar: HTMLImageElement = document.querySelector<HTMLImageElement>(".avatar-image");
    // const birthDate: HTMLSpanElement = document.querySelector<HTMLSpanElement>(".birth-date");
    // const postAmount: HTMLSpanElement = document.querySelector<HTMLSpanElement>(".posts-amount");
    // const likesAmount: HTMLSpanElement = document.querySelector<HTMLSpanElement>(".likes-amount");

    const authorName: HTMLAnchorElement = authorPlate.querySelector(".author-nickname") as HTMLAnchorElement;
    const createTime: HTMLSpanElement = authorPlate.querySelector(".create-time") as HTMLSpanElement;
    const authorAvatar: HTMLImageElement = authorPlate.querySelector(".avatar-image") as HTMLImageElement;
    const birthDate: HTMLSpanElement = authorPlate.querySelector(".birth-date") as HTMLSpanElement;
    const postAmount: HTMLSpanElement = authorPlate.querySelector(".posts-amount") as HTMLSpanElement;
    const likesAmount: HTMLSpanElement = authorPlate.querySelector(".likes-amount") as HTMLSpanElement;

    authorName.textContent = plate.fullName
    authorAvatar.src = plate.gender === Gender.Female ? "../images/girlAvatar.svg" : "../images/manAvatar.svg"
    authorName.href = `/?author=${plate.fullName}`;
    createTime.textContent = "Создан: " + plate.created;
    birthDate.textContent = plate.birthDate !== null ? "Дата рождения: " + plate.birthDate: "Дата рождения: -";
    postAmount.textContent = "Постов: " + plate.posts;
    likesAmount.textContent = "Лайков: " + plate.likes;

    authorsContainer.appendChild(authorPlate);
}