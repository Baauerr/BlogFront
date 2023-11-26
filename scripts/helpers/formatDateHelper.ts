import { DateInfo } from "../registration.js";

export function formatDateForServer(usersDate: string){
    if (usersDate === ""){
        return null
    };
    const [day, month, year] = usersDate.split("-");
    const correctDate: DateInfo = {
        year: parseInt(year, 10),
        month: parseInt(month, 10),
        day: parseInt(day, 10),
    };
    return correctDate
}

export function createDateFromInfo(dateInfo: DateInfo): Date {
    if (dateInfo === null){
        return new Date(0, 0, 0);
    }
    return new Date(dateInfo.year, dateInfo.month, dateInfo.day);
}