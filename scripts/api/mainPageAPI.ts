import { PostsDTO } from "../DTO/postDTO/postDTO.js";
import { FilterDTO } from "../DTO/filterDTO/filterDTO.js";

export async function getInfoOnPageAPI(filterData: FilterDTO): Promise<PostsDTO> {
  const queryString: string = filtersToUrl(filterData);
  try {
    const token: string = localStorage.getItem("token")
    const response = await fetch(`https://blog.kreosoft.space/api/post?${queryString}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Произошла ошибка:', error);
    throw error;
  }
}

export function filtersToUrl(filterData: FilterDTO) {
  return (Object.entries(filterData)
    .filter(([key, value]) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      } else {
        return value !== null && value !== "" && !Number.isNaN(value);
      }
    })
    .flatMap(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map(tag => `${encodeURIComponent(key)}=${encodeURIComponent(tag)}`);
      } else {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      }
    })
    .join('&'));
}

