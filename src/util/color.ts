export function valueToRgbString(value: number, maxValue = 200) {
  if (value >= maxValue) return '#ff0000';
  const r = Math.floor((255 * value) / maxValue).toString();
  const g = Math.floor(-255 * (value / maxValue - 1)).toString();

  return `rgb(${r}, ${g}, 0)`;
}
