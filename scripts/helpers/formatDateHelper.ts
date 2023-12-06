import { DateInfo } from "../account/registration.js";


export function createDateFromInfo(dateInfo: DateInfo | null): Date {
    if (dateInfo === null) {
        return new Date(0, 0, 0);
    }
    return new Date(dateInfo.year, dateInfo.month, dateInfo.day);
}

export function formatDateForPostInfo(dateString: string){
    const date = new Date(dateString)
    const day: string = date.getDate().toString().padStart(2, '0');
    const month: string = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year: number = date.getFullYear();
    const hours: string = date.getHours().toString().padStart(2, '0');
    const minutes: string = date.getMinutes().toString().padStart(2, '0');
    return(`${day}.${month}.${year} ${hours}:${minutes}`)
}