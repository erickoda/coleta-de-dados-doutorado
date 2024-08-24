export default function canBeConvertedToInteger(value: any): boolean {
  const parsed = parseInt(value);
  return !isNaN(parsed) && isFinite(parsed);
}
