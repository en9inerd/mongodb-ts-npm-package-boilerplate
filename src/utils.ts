export function addS(str: string): string {
  const word = str.toLowerCase();
  const exceptions = ['s', 'x', 'z', 'ch', 'sh'];

  if (exceptions.some(ex => word.endsWith(ex))) {
    return word + 'es';
  } else if (word.endsWith('y') && !['a', 'e', 'i', 'o', 'u'].includes(word[word.length - 2])) {
    return word.slice(0, -1) + 'ies';
  } else {
    return word + 's';
  }
}
