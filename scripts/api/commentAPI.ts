import { CommentEditDataDTO } from "../DTO/comment/commentDTO.js";
import { SendCommentDTO } from "../DTO/comment/commentDTO.js";
import { CommentDTO } from "../DTO/comment/commentDTO.js";
import { makeRequestAPI } from "./mainFetcherAPI.js";
import { Request } from "./mainFetcherAPI.js";


export async function getCommentTreeAPI(commentId: string): Promise<CommentDTO[]> {
  const url = `https://blog.kreosoft.space/api/comment/${commentId}/tree`;
  return makeRequestAPI(url, Request.GET);
}

export async function sendComment(commentInfo: SendCommentDTO, id: string) {
  console.log(commentInfo)
  const url = `https://blog.kreosoft.space/api/post/${id}/comment`;
  const bruh = await makeRequestAPI(url, Request.POST, commentInfo);
}

export async function editComment(content: CommentEditDataDTO, commentId: string) {
  const url = `https://blog.kreosoft.space/api/comment/${commentId}`;
  await makeRequestAPI(url, Request.PUT, content);
}

export async function deleteComment(commentId: string) {
  const url = `https://blog.kreosoft.space/api/comment/${commentId}`;
  await makeRequestAPI(url, Request.DELETE);
}