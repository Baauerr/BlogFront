export async function getTags() {
  try {
    const response = await fetch('https://blog.kreosoft.space/api/tag', {
      method: 'GET',
      headers: {
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