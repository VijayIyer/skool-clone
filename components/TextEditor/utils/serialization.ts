import { createLinkNode } from ".";

export type NodeType = "text" | "link" | "paragraph" | "breakline";

export interface SerializedNode {
  type: NodeType;
  content?: string;
  href?: string;
  children?: SerializedNode[];
}

export function serializeNode(node: Node): SerializedNode {
  if (node.nodeType === Node.TEXT_NODE) {
    return {
      type: "text",
      content: node.nodeValue || "",
    };
  }

  if (node.nodeName === "A") {
    return {
      type: "link",
      content: node.textContent || "",
      href: (node as HTMLAnchorElement).href,
    };
  }

  if (node.nodeName === "DIV") {
    return {
      type: "paragraph",
      children: Array.from(node.childNodes).map(serializeNode),
    };
  }

  if (node.nodeName === "BR") {
    return {
      type: "breakline",
    };
  }

  throw new Error("Unsupported node type");
}

export function serialize(innerHTML: string): SerializedNode[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(innerHTML, "text/html");
  return Array.from(doc.body.childNodes).map(serializeNode);
}

export function deserializeNode(serialized: SerializedNode): Node {
  switch (serialized.type) {
    case "text":
      return document.createTextNode(serialized.content || "");

    case "link":
      const href = serialized.href || "";
      const text = serialized.content || "";
      return createLinkNode({ href, text });

    case "paragraph":
      const div = document.createElement("div");
      (serialized.children || []).forEach((child) => {
        div.appendChild(deserializeNode(child));
      });
      return div;

    case "breakline":
      return document.createElement("br");

    default:
      throw new Error("Unsupported serialized type");
  }
}

export function deserialize(
  serializedNodes: SerializedNode[]
): DocumentFragment {
  const fragment = document.createDocumentFragment();

  serializedNodes.forEach((serialized) => {
    fragment.appendChild(deserializeNode(serialized));
  });

  return fragment;
}
