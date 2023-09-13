import { useState, useEffect } from "react";
import { useLastRange } from ".";
import { createLinkNode } from "../utils";

export default function useAddLink(editorId: string) {
  const [isAddLinkDisabled, setIsAddLinkDisabled] = useState<boolean>(false);
  const lastRange = useLastRange(editorId);
  // const [lastRange, setLastRange] = useState<Range | null>(null);

  useEffect(() => {
    if (!lastRange) return;

    // // this function not only update lastRange, but also update isAddLinkDisabled
    // function updateStates() {
    //   const selection = document.getSelection() as Selection;
    //   const editor = document.querySelector(
    //     '[data-editor-id="${editorId}"]'
    //   ) as HTMLElement;
    // }

    if (
      lastRange.startContainer.parentElement!.matches("a") &&
      lastRange.startContainer.parentElement ===
        lastRange.endContainer.parentElement
    ) {
      setIsAddLinkDisabled(true);
    } else if (!lastRange.collapsed) {
      const fragment = lastRange.cloneContents();
      const matches = fragment.querySelectorAll("a, div");

      if (matches.length) {
        setIsAddLinkDisabled(true);
      }

      let start = lastRange.startContainer;
      let end = lastRange.endContainer;

      if (start.nodeType === 3 && start.parentElement.matches("a")) {
        setIsAddLinkDisabled(true);
      }
      if (end.nodeType === 3 && end.parentElement.matches("a")) {
        setIsAddLinkDisabled(true);
      }
    } else setIsAddLinkDisabled(false);

    // console.log(lastRange);
  }, [lastRange]);

  function addLink(href: string) {
    const selection = document.getSelection();
    if (!lastRange) return;

    if (lastRange?.collapsed) {
      // Senario #1
      const linkNode = createLinkNode({ href, text: href });
      lastRange.insertNode(linkNode);
      selection?.setPosition(linkNode.childNodes[0], href.length);
    } else {
      // Senario #2
      const surroundedText = lastRange.cloneContents().textContent;
      const linkNode = createLinkNode({ href });
      lastRange.surroundContents(linkNode);
      selection?.setPosition(linkNode.childNodes[0], surroundedText!.length);
    }
  }

  return { isAddLinkDisabled, addLink };
}
