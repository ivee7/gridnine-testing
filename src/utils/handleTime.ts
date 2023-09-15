export function handleDuration(time: number): string {
    const hours = Math.trunc(time / 60);
    const minutes = time % 60;

    const hoursString = hours ? `${hours} ч` : '';
    const minutesString = minutes ? ` ${minutes} мин` : '';

    return hoursString + minutesString
}
