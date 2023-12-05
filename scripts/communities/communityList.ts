import { getListOfCommunitiesAPI } from "../api/communityAPI";
import { getGreatestRoleInCommunityAPI } from "../api/communityAPI";


export async function communityListView(){
    document.getElementById("postsContainer").innerHTML = '';

    const postTemplate = document.getElementById("postTemplate") as HTMLTemplateElement;
    const postsContainer = document.getElementById("postsContainer") as HTMLDivElement;
        
    const data = await getListOfCommunitiesAPI();
    data.posts.forEach(post => addCommunityToContainer(post, postTemplate, postsContainer));

}

function addCommunityToContainer(post, postTemplate, postsContainer){

    const postClone = document.importNode(postTemplate.content, true);

    const postTitle = postClone.querySelector(".title") as HTMLElement;

    const subscribe = postClone.querySelector(".show-more") as HTMLElement;
    const unsubscribe = postClone.querySelector(".post-like-button") as HTMLElement;
}

function correctButtons(){

}