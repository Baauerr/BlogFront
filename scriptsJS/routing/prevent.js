import { showTags } from "../mainPage/showTags.js";
import { applyFormDataToClass } from "../mainPage/mainPagePostView.js";
import { setupApplyButton } from "../mainPage/buttonsOnMainPage.js";
import { showPostPage } from "../posts/posts.js";
import { loadAvailableCommunities } from "../posts/createPost.js";
export function prevent(path) {
    switch (true) {
        case path.includes("/post/create"):
            loadAvailableCommunities();
            showTags();
            //   document.title = "Создать пост"
            break;
        case path.includes("/post/"):
            //    document.title = "Запись"
            showPostPage();
            break;
        case path === '/':
            //    document.title = "Главная"
            showTags();
            setupApplyButton();
            applyFormDataToClass();
            break;
    }
}
//# sourceMappingURL=prevent.js.map