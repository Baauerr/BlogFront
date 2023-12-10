// export function createDateFromInfo(dateInfo: DateInfo | null): Date {
//     if (dateInfo === null) {
//         return new Date(0, 0, 0);
//     }
//     return new Date(dateInfo.year, dateInfo.month, dateInfo.day);
// }
export function formatDateForPostInfo(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return (`${day}.${month}.${year} ${hours}:${minutes}`);
}
//# sourceMappingURL=formatDateHelper.js.map