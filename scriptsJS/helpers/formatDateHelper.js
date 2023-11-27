export function formatDateForServer(usersDate) {
    if (usersDate === "") {
        return null;
    }
    const [day, month, year] = usersDate.split("-");
    const correctDate = {
        year: parseInt(year, 10),
        month: parseInt(month, 10),
        day: parseInt(day, 10),
    };
    return correctDate;
}
export function createDateFromInfo(dateInfo) {
    if (dateInfo === null) {
        return new Date(0, 0, 0);
    }
    return new Date(dateInfo.year, dateInfo.month, dateInfo.day);
}
//# sourceMappingURL=formatDateHelper.js.map