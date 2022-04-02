export function toDateTimeDisplayString(datetime) {
  const d = new Date(datetime);
  return d.toLocaleDateString() + ' at ' + d.toLocaleTimeString();
}
