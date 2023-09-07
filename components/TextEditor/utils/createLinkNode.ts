/**
 * Props for the `createLinkNode` function.
 */
export interface Props {
  href: string;                // The URL for the anchor's href attribute.
  text?: string;               // The text content to display for the link. If not provided, the link serves mainly as a wrapper.
  linkType?: string; // An optional type for the link. Currently for future extensibility.
}

/**
 * Creates an anchor (`<a>`) element with the given properties.
 * 
 * @param props - The properties for the anchor element, including href, optional text content, and optional link type.
 * 
 * @returns A new anchor element (`<a>`) with the provided properties.
 */
export default function createLinkNode(props: Props): HTMLAnchorElement {
  let { href, text, linkType = 'embedLink' } = props;

  if (!href.startsWith('https') && !href.startsWith('http')) {
    href = 'https://' + href;
  }

  const linkNode = document.createElement('a');
  linkNode.target = '_blank';
  linkNode.rel = 'noopener noreferrer nofollow';
  linkNode.className = 'text-editor__link';
  linkNode.href = linkNode.title = href;

  // Currently, the linkType data attribute is added but not utilized.
  // It's reserved for future enhancements or features.
  linkNode.dataset.linkType = linkType;

  // If text content is provided, set it for the anchor element.
  // Otherwise, the created anchor will serve mainly as a wrapper.
  // This is especially useful for scenarios where the user might want to linkify a selected text.
  if (text) linkNode.textContent = text;

  return linkNode;
}
