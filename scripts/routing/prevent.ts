import { showTags } from "../mainPage/showTags.js";
import { applyFormDataToClass } from "../mainPage/mainPagePostView.js";
import { setupApplyButton } from "../mainPage/buttonsOnMainPage.js";
import { showSinglePost } from "../posts/posts.js";

export function prevent(path: string) {
    console.log(path)
    switch (true) {
        case path.includes("/post/"):
            showSinglePost();
            console.log(path)
            break;
        case path === '/':
            showTags();
            setupApplyButton();
            applyFormDataToClass();
            break;
    }
}