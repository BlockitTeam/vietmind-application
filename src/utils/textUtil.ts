// utils/textUtils.ts
export const normalizeText = (text: string): string => {
  return text
    .toLowerCase() // Convert to lowercase
    .replace(/\s+/g, ' ') // Remove extra spaces if any
    .trim() // Remove leading or trailing spaces
}
