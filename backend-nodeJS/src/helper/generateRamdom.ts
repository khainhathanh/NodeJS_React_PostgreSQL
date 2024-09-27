export const generateRandomNumericString = (length: number): string => {
    return Array.from({ length }, generateRandomDigit).join('');
  };
export const generateRandomDigit = (): number => generateRandomInteger(0, 9);
export const generateRandomInteger = (min: number, max: number): number =>
    Math.floor(Math.random() * (max + 1 - min)) + min;