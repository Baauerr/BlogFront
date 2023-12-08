import { TagDTO } from "../DTO/tagDTO/tagDTO";

export async function getTagsAPI(): Promise<TagDTO[]> {
  try {
    const response = await fetch('https://blog.kreosoft.space/api/tag', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Произошла ошибка:', error);
    throw error;
  }
}