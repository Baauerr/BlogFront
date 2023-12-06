export async function getProfileAPI() {
  const token: string = localStorage.getItem('token');
    const response = await fetch('https://blog.kreosoft.space/api/account/profile', {
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
}

export async function editProfileAPI(editData){
  const token: string = localStorage.getItem('token');
  console.log(editData)
    await fetch('https://blog.kreosoft.space/api/account/profile', {
        method: 'PUT',
        headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(editData),
    })
    .catch(error => {
        console.error('Message:', error);
    });
}

