export function parseBudgetRange(budgetString: string): { max: number } {
  const matches = budgetString.match(/Hasta (\d+(?:,\d+)*)/);
  if (!matches) throw new Error('Invalid budget string format');
  
  const max = Number.parseInt(matches[1].replace(/,/g, ''));
  
  return { max };
}
