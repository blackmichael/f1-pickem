export function toDateTimeDisplayString(datetime) {
    let d = new Date(datetime);
    return d.toLocaleDateString() + " at " + d.toLocaleTimeString();
}