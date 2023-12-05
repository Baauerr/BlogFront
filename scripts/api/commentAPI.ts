import { CommentData } from "../posts/commentFunction.js";
import { CommentEditData } from "../posts/commentFunction.js";


export async function getCommentTreeAPI(commentId): Promise<any> {
  try {
    const response = await fetch(`https://blog.kreosoft.space/api/comment/${commentId}/tree`, {
      method: 'GET',
      headers: {
        //  'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Произошла ошибка:', error);
    throw error;
  }
}

export async function sendComment(commentInfo: CommentData, id): Promise<any> {
  try {
    console.log(id);
    const token = localStorage.getItem("token")
    console.log(commentInfo)
    await fetch(`https://blog.kreosoft.space/api/post/${id}/comment`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentInfo),
    });
  } catch (error) {
    console.error('Произошла ошибка:', error);
    throw error;
  }
}


export async function editComment(content: CommentEditData, commentId) {
  try {
    const token = localStorage.getItem("token")
    console.log(content)
    await fetch(`https://blog.kreosoft.space/api/comment/${commentId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(content),
    });
  } catch (error) {
    console.error('Произошла ошибка:', error);
    throw error;
  }
}

export async function deleteComment(commentId) {
  try {
      const token = localStorage.getItem("token");
      await fetch(`https://blog.kreosoft.space/api/comment/${commentId}`, {
          method: 'DELETE',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
      });
  } catch (error) {
      console.error('Произошла ошибка:', error);
      throw error;
  }
}