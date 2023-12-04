import { showTags } from "../mainPage/showTags.js";
import { applyFormDataToClass } from "../mainPage/mainPagePostView.js";
import { setupApplyButton } from "../mainPage/buttonsOnMainPage.js";
import { showPostPage } from "../posts/posts.js";

export function prevent(path: string) {
    switch (true) {
        case path.includes("/post/create"):
          //  showPostPage();
            break;
        case path.includes("/post/"):
            showPostPage();
            break;
        case path === '/':
            showTags();
            setupApplyButton();
            applyFormDataToClass();
            break;
    }
}