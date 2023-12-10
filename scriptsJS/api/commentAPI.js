import { makeRequestAPI } from "./mainFetcherAPI.js";
import { Request } from "./mainFetcherAPI.js";
export async function getCommentTreeAPI(commentId) {
    const url = `https://blog.kreosoft.space/api/comment/${commentId}/tree`;
    return makeRequestAPI(url, Request.GET);
}
export async function sendComment(commentInfo, id) {
    console.log(commentInfo);
    const url = `https://blog.kreosoft.space/api/post/${id}/comment`;
    const bruh = await makeRequestAPI(url, Request.POST, commentInfo);
}
export async function editComment(content, commentId) {
    const url = `https://blog.kreosoft.space/api/comment/${commentId}`;
    await makeRequestAPI(url, Request.PUT, content);
}
export async function deleteComment(commentId) {
    const url = `https://blog.kreosoft.space/api/comment/${commentId}`;
    await makeRequestAPI(url, Request.DELETE);
}
//# sourceMappingURL=commentAPI.js.map