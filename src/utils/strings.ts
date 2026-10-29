/**
 * Truncates a string to a maximum length, adding ellipsis if truncated
 * @param input - The string to truncate
 * @param maxLength - Maximum length before truncation (default: 5)
 * @returns The truncated string
 */
export const truncate = (input: string, maxLength: number = 5): string => {
  return input.length > maxLength ? `${input.substring(0, maxLength)}...` : input;
};