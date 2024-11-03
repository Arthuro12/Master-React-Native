export function getFormatedDate(date) {
  return `${date.toLocaleString("de-De", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  })}`;
}

export function getDateMinusDay(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
