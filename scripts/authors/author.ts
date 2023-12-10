import { AuthorDTO } from "../DTO/author/authorDTO.js";
import { Gender } from "../DTO/users/userDTO.js";
import { getListOfAuthorsAPI } from "../api/authorAPI.js";
import { router } from "../routing/routing.js";

export async function showAuthorsPlates() {
    const authorTemplate: HTMLTemplateElement = document.getElementById("author-template") as HTMLTemplateElement;
    const authorsContainer: HTMLDivElement = document.getElementById("authors-place") as HTMLDivElement;

    const data: AuthorDTO[] = await getListOfAuthorsAPI();
    const sortedAuthors: AuthorDTO[] = [...data];

    sortedAuthors.sort(compareAuthors);
    const topAuthors: AuthorDTO[] = sortedAuthors.slice(0, 3);
    if (data.length > 0 && Array.isArray(data)) {
        data.forEach(plate => addAuthorToContainer(plate, authorTemplate, authorsContainer, topAuthors));
    }

}

function addAuthorToContainer(plate: AuthorDTO, authorTemplate: HTMLTemplateElement, authorsContainer: HTMLDivElement, topAuthors: AuthorDTO[]) {
    const authorPlate: DocumentFragment = document.importNode(authorTemplate.content, true);

    const authorName: HTMLAnchorElement = authorPlate.querySelector(".author-nickname") as HTMLAnchorElement;
    const createTime: HTMLSpanElement = authorPlate.querySelector(".create-time") as HTMLSpanElement;
    const authorAvatar: HTMLImageElement = authorPlate.querySelector(".avatar-image") as HTMLImageElement;
    const birthDate: HTMLSpanElement = authorPlate.querySelector(".birth-date") as HTMLSpanElement;
    const postAmount: HTMLSpanElement = authorPlate.querySelector(".posts-amount") as HTMLSpanElement;
    const likesAmount: HTMLSpanElement = authorPlate.querySelector(".likes-amount") as HTMLSpanElement;
    const userPosition: HTMLImageElement = authorPlate.querySelector(".avatar-crown-image") as HTMLImageElement;
    const authorPlateButton: HTMLDivElement = authorPlate.querySelector(".author-plate") as HTMLDivElement;

    authorName.textContent = plate.fullName
    authorAvatar.src = plate.gender === Gender.Female ? "../images/girlAvatar.svg" : "../images/manAvatar.svg"

    addEventOnPlate(authorPlateButton, plate.fullName);

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

function compareAuthors(a: AuthorDTO, b: AuthorDTO): number {
    if (a.posts !== b.posts) {
        return b.posts - a.posts;
    } else if (a.likes !== b.likes) {
        return b.likes - a.likes;
    } else {
        return new Date(b.created).getTime() - new Date(a.created).getTime();
    }
}

function normalizeDate(date: string): string {
    let normalDate: Date = new Date(date);
    return normalDate.toLocaleDateString();
}

function addEventOnPlate(plate: HTMLDivElement, fullName: string) {
    plate.addEventListener("click", () => {
        window.history.pushState({}, null, `/?author=${fullName}`);
        router();
    })
}