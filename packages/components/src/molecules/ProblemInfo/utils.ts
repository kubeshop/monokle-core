export function renderToolComponentName(name: string) {
  const words = name.split('-');
  const result = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return result;
}
