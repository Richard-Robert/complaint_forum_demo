export function dateComparer(a, b) {
  const aDate = new Date(a.date_updated);
  const bDate = new Date(b.date_updated);
  return bDate.getSeconds() - aDate.getSeconds();
}
