import { applyFormDataToClass } from "./mainPagePostView.js";
import { updateUrl } from "./getDataFromPage.js";
import { collectFormData } from "./getDataFromPage.js";
import { clickOnLikeButton } from "./likeFunction.js";
export function attachEventListeners(post, postDescription, showMoreButton, likeButton, postLikes) {
    showMoreButton.addEventListener("click", function () {
        readMore(postDescription, showMoreButton);
    });
    likeButton.addEventListener("click", async function () {
        await clickOnLikeButton(likeButton, post, postLikes);
    });
}
export function toggleShowMoreButton(showMoreButton, description) {
    if (description.length > 200) {
        showMoreButton.style.display = "block";
    }
}
function readMore(postDescription, showMoreButton) {
    const fullDescription = postDescription.dataset.fullDescription;
    const shortDescription = fullDescription.substring(0, 200);
    if (postDescription.textContent === shortDescription) {
        postDescription.textContent = fullDescription;
        showMoreButton.textContent = "Скрыть";
    }
    else {
        postDescription.textContent = shortDescription;
        showMoreButton.textContent = "Читать полностью";
    }
}
export function postLikeView(likePicture, hasLike) {
    const token = localStorage.getItem("token");
    if (token) {
        if (hasLike) {
            likePicture.src = "../images/liked.png";
        }
        else {
            likePicture.src = "../images/like.png";
        }
    }
}
export function setupApplyButton() {
    const applyButton = document.getElementById('apply_button');
    if (applyButton) {
        applyButton.addEventListener('click', function (event) {
            console.log("jija");
            event.preventDefault();
            const formData = collectFormData();
            updateUrl(formData);
            applyFormDataToClass();
        });
    }
    else {
        console.log("booooooob");
    }
}
//# sourceMappingURL=buttonsOnMainPage.js.map