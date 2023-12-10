import { showTags } from "../mainPage/showTags.js";
import { showMainPagePosts } from "../mainPage/mainPagePostView.js";
import { setupApplyButton } from "../mainPage/buttonsOnMainPage.js";
import { showPostPage } from "../posts/posts.js";
import { communityListView } from "../communities/communityList.js";
import { showCommunityPosts } from "../communities/concreteCommunity.js";
import { showAuthorsPlates } from "../authors/author.js";
import { router } from "./routing.js";
import { tokenValidChecker } from "./jwtChecker.js";


export function prevent(path: string) {
    switch (true) {
        case path.includes("/communities/"):
            checkAuthorize();
            showTags();
            setupApplyButton(showCommunityPosts)
            showCommunityPosts();
            break;
        case path.includes("/authors"):
            checkAuthorize()
            showAuthorsPlates();
            break;
        case path.includes("/communities"):
            checkAuthorize();
            communityListView();
            break;
        case path.includes("/post/create"):
            checkAuthorize();
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


function checkAuthorize(){
    if (localStorage.getItem("token") === null && !tokenValidChecker()){
        window.history.pushState({}, null, '/');
        router();
    }
}