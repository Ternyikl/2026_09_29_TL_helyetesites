export function getNextDayName(): string {
    const date = new Date();
    const today = date.getDay();

    let skipToSchoolDay = NextSchoolDay(today);

    date.setDate(date.getDate() + skipToSchoolDay);

    let daysName = date.toLocaleDateString("hu-HU", { weekday: "long" });

    return daysName.charAt(0).toUpperCase() + daysName.slice(1);
}

function NextSchoolDay(day: number): number {
    let skipToSchoolDay = 1;
    if (day === 5) skipToSchoolDay = 3
    else if (day === 6) skipToSchoolDay = 2

    return skipToSchoolDay;
}