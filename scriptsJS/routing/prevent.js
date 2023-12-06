import { showTags } from "../mainPage/showTags.js";
import { showMainPagePosts } from "../mainPage/mainPagePostView.js";
import { setupApplyButton } from "../mainPage/buttonsOnMainPage.js";
import { showPostPage } from "../posts/posts.js";
import { loadAvailableCommunities } from "../posts/createPost.js";
import { communityListView } from "../communities/communityList.js";
import { showCommunityPosts } from "../communities/concreteCommunity.js";
export function prevent(path) {
    switch (true) {
        case path.includes("/communities/"):
            showCommunityPosts();
            showTags();
            break;
        case path.includes("/communities"):
            communityListView();
            break;
        case path.includes("/post/create"):
            loadAvailableCommunities();
            showTags();
            break;
        case path.includes("/post/"):
            showPostPage();
            break;
        case path === '/':
            showTags();
            setupApplyButton();
            showMainPagePosts();
            break;
    }
}
//# sourceMappingURL=prevent.js.map