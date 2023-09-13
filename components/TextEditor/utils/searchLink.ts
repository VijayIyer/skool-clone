/**
 * Represents a matched URL within a string, providing details about the URL
 * and its position within the string.
 */
export interface MatchURL {
  url: string;          // The matched URL.
  startIndex: number;   // The starting position of the URL in the string.
  endIndex: number;     // The ending position of the URL in the string.
}

// Default regular expression for matching URLs.
const defaultRegex = /\bhttps?:\/\/[^\s<>"]+|www\.[^\s<>"]+\b/;

/**
 * Searches for the first URL within a given string using a provided regex pattern.
 * 
 * @param str - The input string to search for URLs.
 * @param regex - (Optional) The regex pattern for URL matching. If not provided, a default regex is used.
 * 
 * @returns An object containing details of the matched URL or null if no URL is found.
 */
export default function searchLink(str: string, regex: RegExp = defaultRegex): MatchURL | null {
  const match = str.match(regex);
  
  // If no match is found, return null.
  if (!match) return null;

  // If a match is found, return details about the matched URL.
  return {
    url: match[0],
    startIndex: match.index!,
    endIndex: match.index! + match[0].length
  };
}
