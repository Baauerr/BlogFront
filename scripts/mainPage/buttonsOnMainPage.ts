import { updateUrl } from "./getDataFromPage.js";
import { collectFormData } from "./getDataFromPage.js";
import { clickOnLikeButton } from "./likeFunction.js";
import { PostDTO } from "../DTO/postDTO/postDTO.js";


export function attachEventListeners(post: PostDTO, postDescription: HTMLSpanElement, showMoreButton: HTMLAnchorElement, likeButton: HTMLImageElement, postLikesCountElement: HTMLSpanElement) {
    showMoreButton.addEventListener("click", function () {
        readMore(postDescription, showMoreButton);
    });

    likeButton.addEventListener("click", async function () {
        await clickOnLikeButton(likeButton, post, postLikesCountElement);
    });
}

export function toggleShowMoreButton(showMoreButton: HTMLAnchorElement, description: string) {
    if (description.length > 200) {
        showMoreButton.style.display = "block";
    }
}

export function readMore(postDescription: HTMLSpanElement, showMoreButton: HTMLAnchorElement) {
    const fullDescription = postDescription.dataset.fullDescription;
    const shortDescription = fullDescription.substring(0, 200);

    if (postDescription.textContent === shortDescription) {
        postDescription.textContent = fullDescription;
        showMoreButton.textContent = "Скрыть";
    } else {
        postDescription.textContent = shortDescription;
        showMoreButton.textContent = "Читать полностью";
    }
}

export function postLikeView(likePicture: HTMLImageElement, hasLike: boolean) {
    const token = localStorage.getItem("token")
    if (token) {
        if (hasLike) {
            likePicture.src = "../images/liked.png"
        }
        else {
            likePicture.src = "../images/like.png"
        }
    }
}

export function setupApplyButton(callback: () => Promise<void>) {
    const applyButton: HTMLButtonElement = document.getElementById('apply_button') as HTMLButtonElement;

    if (applyButton) {
        applyButton.addEventListener('click', async function (event) {
            event.preventDefault();
            const formData = collectFormData();
            updateUrl(formData);
            await callback(); 
        });
    } else {
        console.log("Apply button doesn't exist");
    }
}
