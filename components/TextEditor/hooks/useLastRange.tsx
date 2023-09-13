import { useState, useEffect } from "react";

export default function useLastRange(
  editorId: string,
  readOnly: boolean = false
) {
  const [lastRange, setLastRange] = useState<Range | null>(null);

  useEffect(() => {
    /**
     * Handler for the `selectionchange` event. This function checks if the
     * current selection is within the designated editor and updates the
     * `lastRange` state accordingly.
     */
    function updateLastRange() {
      const selection = document.getSelection() as Selection;
      const editorElem = document.querySelector(
        `[data-editor-id="${editorId}"]`
      );

      // Check if there's a valid selection, if the editor exists, and if
      // the selection is inside the editor.

      // console.log(selection);

      if (
        selection &&
        selection.rangeCount > 0 &&
        editorElem &&
        editorElem.contains(selection.anchorNode)
      ) {
        setLastRange(selection.getRangeAt(0));
      }
    }

    // Attach the `selectionchange` event listener to the document.
    if (!readOnly) {
      document.addEventListener("selectionchange", updateLastRange);
    }

    // Cleanup: Detach the event listener when the component is unmounted.
    return () => {
      document.removeEventListener("selectionchange", updateLastRange);
    };
  }, [editorId, readOnly]); // Dependency on editorId ensures that if the editor ID changes, our effect runs again.

  return lastRange;
}
