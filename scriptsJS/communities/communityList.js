import { getListOfCommunitiesAPI } from "../api/communityAPI";
export async function communityListView() {
    document.getElementById("postsContainer").innerHTML = '';
    const postTemplate = document.getElementById("postTemplate");
    const postsContainer = document.getElementById("postsContainer");
    const data = await getListOfCommunitiesAPI();
    data.posts.forEach(post => addCommunityToContainer(post, postTemplate, postsContainer));
}
function addCommunityToContainer(post, postTemplate, postsContainer) {
    const postClone = document.importNode(postTemplate.content, true);
    const postTitle = postClone.querySelector(".title");
    const subscribe = postClone.querySelector(".show-more");
    const unsubscribe = postClone.querySelector(".post-like-button");
}
function correctButtons() {
}
//# sourceMappingURL=communityList.js.map