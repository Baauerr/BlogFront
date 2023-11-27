import { mainPageData } from "../mainPage/mainPage.js";

export async function getInfoOnPage(filterData: mainPageData){
    const queryString = Object.entries(filterData)
        .filter(([key, value]) => value !== null)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
    console.log(queryString)
    await fetch('https://blog.kreosoft.space/api/post?${queryString}', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
    },
    })
        .then(response => response.json())
        .then(data => {
                console.log('request:', data);
    })
    .catch(error => {
        console.error('Message:', error);
    });
}