export function getDays(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

export function formatDate(dateInfomed?: string, simpleYear?: boolean) {
  if (!dateInfomed) return '';
  const date = new Date(dateInfomed);
  const day = date.getDate().toString();
  const dayFormated = day.length == 1 ? '0' + day : day;
  const month = (date.getMonth() + 1).toString();
  const monthFormated = month.length == 1 ? '0' + month : month;
  let yearFormated = date.getFullYear().toString();
  if (simpleYear) {
    yearFormated = yearFormated.slice(2, 4);
  }
  return `${dayFormated}/${monthFormated}/${yearFormated}`;
}

export function formatDatePTBR(data: string | number | Date) {
  const date = new Date(data);
  const formatedDate = date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  return formatedDate;
}

export function getDaysInMonth(month: number, year: number) {
  const daysInMonth = new Date(year, month, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
}
