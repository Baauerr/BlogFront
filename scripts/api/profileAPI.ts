const token = localStorage.getItem('token');

export async function getProfile() {
    try {
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
    } catch (error) {
      console.error('Произошла ошибка:', error);
      throw error;
    }
  }

export async function editProfile(editData){
    await fetch('https://blog.kreosoft.space/api/account/profile', {
        method: 'PUT',
        headers: {
        'Authorization': 'Bearer ${token}',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(editData),
    })
        .then(response => response.json())
        .then(data => {
                console.log('request:', data);
    })
    .catch(error => {
        console.error('Message:', error);
    });
}

