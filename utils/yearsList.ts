export const yearsList = (startYear: number | null) => {
  if (!startYear) return [];
  let years = [];
  let currentYear = new Date().getFullYear();
  for (let i = startYear; i <= currentYear; i++) {
    years.push({
      id: i,
      label: i.toString(),
    });
  }
  return years;
};
