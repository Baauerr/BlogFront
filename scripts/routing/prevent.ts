import { showTags } from "../mainPage/showTags.js";
import { showMainPagePosts } from "../mainPage/mainPagePostView.js";
import { setupApplyButton } from "../mainPage/buttonsOnMainPage.js";
import { showPostPage } from "../posts/posts.js";
import { communityListView } from "../communities/communityList.js";
import { showCommunityPosts } from "../communities/concreteCommunity.js";
import { showAuthorsPlates } from "../authors/author.js";
import { authorizeChecker } from "../api/errorHandler.js";


export function prevent(path: string) {
    switch (true) {
        case path.includes("/communities/"):
            authorizeChecker();
            showTags();
            setupApplyButton(showCommunityPosts)
            showCommunityPosts();
            break;
        case path.includes("/authors"):
            authorizeChecker();
            showAuthorsPlates();
            break;
        case path.includes("/communities"):
            authorizeChecker();
            communityListView();
            break;
        case path.includes("/post/create"):
            authorizeChecker();
            showTags();
            break;
        case path.includes("/post/"):
            showPostPage();
            break;
        case path === '/':
            showTags();
            setupApplyButton(showMainPagePosts);
            showMainPagePosts();
            break;
    }
}


