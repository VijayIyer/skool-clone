import { SerializedNode } from "@/components/TextEditor/utils/serialization";

// Checks if a given URL seems malicious
function isURLSafe(url: string): boolean {
  // This is just a basic example. You might want to employ more comprehensive URL validation
  // and checks against blacklisted domains or specific patterns typical for malicious URLs.
  const maliciousPatterns: RegExp[] = [
    /javascript:/i, // Checks for JavaScript pseudo-URLs
    // ... Add other patterns or checks as needed
  ];

  return !maliciousPatterns.some((pattern) => pattern.test(url));
}

function validateNode(node: SerializedNode): boolean {
  switch (node.type) {
    case "text":
      return typeof node.content === "string";
    case "link":
      if (
        typeof node.content !== "string" ||
        typeof node.href !== "string" ||
        !isURLSafe(node.href)
      ) {
        return false;
      }
      break;
    case "paragraph":
      if (!Array.isArray(node.children)) {
        return false;
      }
      for (let child of node.children) {
        if (!validateNode(child)) {
          return false;
        }
      }
      break;
    case "breakline":
      // Nothing to validate for breakline
      break;
    default:
      return false; // Unsupported node type
  }
  return true;
}

// Use this function in /post or /comment API to test the user text input is valid or not
export default function validateUserTextInput(json: string): boolean {
  const nodes = JSON.parse(json);

  for (let node of nodes) {
    if (!validateNode(node)) {
      return false;
    }
  }
  return true;
}
