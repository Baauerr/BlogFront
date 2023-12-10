import { PostInfoDTO } from "../DTO/postDTO/postDTO.js";
import { takeErrorTextAsync } from "../helpers/errorCreateHelper.js";
import { makeRequestAPI } from "./mainFetcherAPI.js";
import { Request } from "./mainFetcherAPI.js";

export async function publicPostAPI(responseData: PostInfoDTO) {
  const url = 'https://blog.kreosoft.space/api/post';
  try {
      const data = await makeRequestAPI(url, Request.POST, responseData);

      if (data.errors) {
          const container = document.getElementById('input-create-post');
          const inputElements = container.querySelectorAll('input, select, textarea');
          await takeErrorTextAsync(data, container, inputElements);
      } else {
          window.location.pathname = '';
      }
  } catch (error) {
      console.error('Произошла ошибка:', error);
      throw error;
  }
}




