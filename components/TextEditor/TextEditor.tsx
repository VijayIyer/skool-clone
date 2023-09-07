import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
  ChangeEvent,
  ClipboardEvent,
  KeyboardEvent,
} from "react";
import styles from "./styles.module.css";
import { useLastRange } from "./hooks";
import { serialize, deserialize, createLinkNode, searchLink } from "./utils";
import { matchesMiddleware } from "next/dist/shared/lib/router/router";

export interface TextEditorProps {
  id: string; // will be stored inside dataset
  placeholder: string; //eg: Write Something... | Write Reply...
  ariaLabel: string; // You have to provide aria-label to give a clear hint what this textbox is for
  readOnly?: boolean; // readOnly is for Read Operation like showing post or comment, then quickly switch to editable mode
  initialData?: string; // JSON (will be deserialize before rendering), only in readOnly can you pass in initialData
  className?: string; // Let you style the container freely, and this component is very styleless
}

export interface TextEditorRef {
  getEditor: () => HTMLDivElement | null;
  getData: () => string;
  focus: () => void;
  insertEmoji: (emojiUnicode: string) => void;
}

// Explicitly uncontroll everything for better performance
// You should only pass in initialData for display purpose, that is to say, you pass in intialData only when readOnly = true
// Since it is uncontrolled, so if you decided to do optimitic update, you must remember the previous snapshot of your initialData,
// and then just passed in again, to kinda like roll back to previous state.
const TextEditor = forwardRef<TextEditorRef, TextEditorProps>(
  function TextEditor(props: TextEditorProps, ref) {
    const {
      id,
      placeholder,
      ariaLabel,
      readOnly = false,
      initialData = "",
      className = "",
    } = props;
    const editorRef = useRef<HTMLDivElement | null>(null); // To refer to the real Editor TextBox Div
    const lastRange = useLastRange(id, readOnly); // keep track of the last selected range before blur out of textbox
    const [showPlaceholder, setShowPlaceholder] = useState<boolean>(true);

    // This is for display the UI for Post and Comment card in readOnly mode.
    useEffect(() => {
      if (!initialData) return;
      if (!editorRef.current) return;

      try {
        const fragment = deserialize(JSON.parse(initialData));
        editorRef.current.innerHTML = "";
        editorRef.current.append(fragment);
      } catch (err) {
        const errorMessage = document.createTextNode(
          "Unfortunately, this post/comment was broken..."
        );
        editorRef.current.append(errorMessage);
        console.error(err);
      }
    }, [initialData]);

    useEffect(() => {
      if (!editorRef.current) return;

      const observer = new MutationObserver(() => {
        if (
            editorRef.current?.innerHTML === "" ||
            editorRef.current?.innerHTML === "<br>"
        ) {
          setShowPlaceholder(true);
        } else {
          setShowPlaceholder(false);
        }
      });

      observer.observe(editorRef.current, { childList: true });

      return () => observer.disconnect();
    }, [editorRef.current]);

    // Expose methods to get the raw Refernce to the editor, which I do not recommend doing so
    // the getData() function is more useful when creating POST and UPDATE request.
    useImperativeHandle(ref, () => {
      return {
        // this is a raw Ref to the editor (the content-editable textbox)
        getEditor() {
          return editorRef.current;
        },
        // this is where you get serialize data
        getData() {
          if (!editorRef.current) return JSON.stringify([]);
          return JSON.stringify(serialize(editorRef.current.innerHTML));
        },
        // Use this function to focus on the editor.
        // Will be refactor to autofocus on fucntion, but now you have to manually focus that
        focus() {
          if (!editorRef.current) return;

          editorRef.current.focus();

          // Find the last TextNode
          const selection = document.getSelection();
          let lastNode: Text | HTMLElement = editorRef.current;

          while (lastNode && lastNode.nodeType !== 3) {
            if (lastNode.nodeName === "BR") break;
            const childNodes = lastNode.childNodes;
            lastNode = childNodes[childNodes.length - 1];
          }

          if (!lastNode) return;

          if (lastNode.nodeName === "BR") selection?.setPosition(lastNode);
          else selection?.setPosition(lastNode, lastNode.textContent?.length);
        },
        // to insert anything after the current selection, has to be string
        // this function is limited, that you can only insert at collapsed
        insertEmoji(emojiUnicode: string) {
          if (!lastRange) return;

          let start = lastRange.startContainer.parentElement;
          let end = lastRange.endContainer.parentElement;
          let between = lastRange.cloneContents();

          // cannot contain anchor ( this is the limitation of this functioanlity)
          if (
            start?.matches("a") ||
            start?.matches("a") ||
            between.querySelector("a")
          ) {
            return;
          }

          const selection = document.getSelection();
          const emojiNode = document.createTextNode(
            String.fromCodePoint(parseInt(emojiUnicode, 16))
          );

          lastRange.deleteContents();
          lastRange.insertNode(emojiNode);
          selection?.collapseToEnd();
        },
      };
    });

    // Replace the default paste event, to automatically auto format all those valid links
    function handlePaste(event: ClipboardEvent<HTMLDivElement>) {
      event.preventDefault();

      // An array of paragraph from the clipboard
      const paragraphs = event.clipboardData
        .getData("text")
        .split(/\r\n|\r|\n/);
      // console.log(paragraphs);

      const frag = new DocumentFragment();

      for (let index = 0; index < paragraphs.length; index++) {
        // The first paragraph should be inline, due to the contenteditalbe web nature
        // The container is only to hold each paragraph either div or nothing
        const container =
          index === 0 ? new DocumentFragment() : document.createElement("div");

        // when there is no text content and ther is a paragraph
        // Then that is an breakline, it is an edge case
        if (!paragraphs[index]) {
          container.append(document.createElement("br"));
          frag.append(container);
          continue;
        }

        // Normal a paragrah contains words, and because of the nature of contenteditable so far
        // You cannot nest paragraph inside another, therefore, we only special treat linkNode
        // and treat every other thing as textnode
        const words = paragraphs[index].split(" ");
        const nodes: Array<HTMLAnchorElement | Text> = [];

        for (const word of words) {
          let newNode: HTMLAnchorElement | Text;

          if (searchLink(word)) {
            newNode = createLinkNode({
              href: word,
              text: word,
              linkType: "autoLink",
            });
            if (nodes.length && nodes.at(-1)!.nodeType === 3) {
              nodes.at(-1)!.textContent += " ";
            }
            nodes.push(newNode);
          } else {
            newNode = document.createTextNode(" " + word);
            if (nodes.length && nodes.at(-1)!.nodeType === 3) {
              nodes.at(-1)!.textContent += "" + newNode.textContent;
            } else {
              nodes.push(newNode);
            }
          }
        }

        container.append(...nodes);
        frag.append(container);
      }

      if (lastRange) {
        lastRange.deleteContents(); // this work for collapsed and non-collapsed selection copy and paste
        lastRange.insertNode(frag);
      }
    }

    // Now the functionality is limited such that it only auto format if what preceded the cursor is a textnode,
    // if cursor follows a ombination of linknode and textnode, it cannot merge them into one linknode automatically like Skool does
    // if the combination forms a valid URL
    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
      if (event.code === "Enter" || event.code === "Space") {
        const selection = document.getSelection();
        if (!selection) return;

        const precedingTextNode = selection?.focusNode;

        // If preceding node is a LinkNode, then do nothing
        const precedingNode = precedingTextNode?.parentElement;
        if (!precedingNode || precedingNode.matches("a")) return;

        // Detect if the preceding word contains any valid link
        // This is tricky, we pass in the preceding TextNode textcontent which will be the preceding sentence
        // However, it is not possible to have valid link besides the previous word, because otherwise it will be found out and auto format
        // into LinkNode prevously. We use preceding sentence for convenient, the performance should not be a consideration here
        const match = searchLink(precedingTextNode.textContent ?? "");
        if (match === null) return;

        const { url, startIndex, endIndex } = match;
        const range = document.createRange();
        // console.log(precedingTextNode, startIndex, endIndex);
        range.setStart(precedingTextNode, startIndex);
        range.setEnd(precedingTextNode, endIndex);

        const linkNode = createLinkNode({
          href: url,
          linkType: "autoLink",
        });
        range.surroundContents(linkNode);
        selection.setPosition(linkNode.childNodes[0], url.length);
      }
    }

    return (
      <div className={`${styles.container} ${className}`}>
        <div
          data-editor-id={id}
          className={styles.editor}
          contentEditable={!readOnly}
          aria-label={ariaLabel}
          ref={editorRef}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
        ></div>
        {showPlaceholder && !readOnly ? (
          <p className={styles.placeholder} aria-hidden>
            {placeholder}
          </p>
        ) : null}
      </div>
    );
  }
);

export default TextEditor;
