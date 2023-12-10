import { ProfileInfoDTO } from "../DTO/users/userDTO.js";

export async function getProfileAPI(): Promise<ProfileInfoDTO> {
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

export async function editProfileAPI(editData) {
  const token: string = localStorage.getItem('token');
  await fetch('https://blog.kreosoft.space/api/account/profile', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(editData),
  })
    .then(async (response) => {
      const data = await response.json();
      const duplicateEmailError = document.getElementById("repetitive-email-error");
      if (data) {
        console.log("agagaga")
        duplicateEmailError.style.display = "block"
      }
      else {
        duplicateEmailError.style.display = "block"
      }
    })

}

