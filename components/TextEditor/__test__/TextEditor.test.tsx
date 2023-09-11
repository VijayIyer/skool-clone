import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import TextEditor, { TextEditorRef } from "../TextEditor";
import { serialize, deserialize } from "../utils";

describe("TextEditor Component Functionality", () => {
  describe("ReadOnly mode vs Editor Mode", () => {
    it("should display serialized data when in readOnly mode", () => {
      // Could refactor to more complex data to test
      const serializedData = JSON.stringify([
        { type: "text", content: "Test Example" },
      ]);

      render(
        <TextEditor
          id="test"
          placeholder="Test Placeholder"
          ariaLabel="Test Aria Label"
          readOnly={true}
          initialData={serializedData}
        />
      );

      expect(screen.getByText("Test Example")).toBeInTheDocument();
    });

    it("should not allow editing when in readOnly mode", () => {
      render(
        <TextEditor
          id="test"
          placeholder="Test Placeholder"
          ariaLabel="Test Aria Label"
          readOnly={true}
        />
      );

      const editor = screen.getByLabelText("Test Aria Label");

      expect(editor).toHaveAttribute("contentEditable", "false");

      userEvent.type(editor, "Test Input");
      expect(editor).not.toHaveTextContent("Test Input");
    });

    it("should show placeholder when no content is present", () => {
      render(
        <TextEditor
          id="test"
          placeholder="Test Placeholder"
          ariaLabel="Test Aria Label"
          readOnly={false}
        />
      );

      expect(screen.getByText("Test Placeholder")).toBeInTheDocument();
    });

    it("should hide placeholder on user input", async () => {
      render(
        <TextEditor
          id="test"
          placeholder="Test Placeholder"
          ariaLabel="Test Aria Label"
          readOnly={false}
        />
      );

      const editor = screen.getByLabelText("Test Aria Label") as HTMLElement;
      userEvent.type(editor, "Test Input");

      await waitFor(() => {
        expect(screen.queryByText("Test Placeholder")).not.toBeInTheDocument();
      });
    });

    it("should not show placeholder when initialData is provided", () => {
      const serializedData = JSON.stringify([
        { type: "text", content: "Test Example" },
      ]);

      render(
        <TextEditor
          id="test"
          placeholder="Test Placeholder"
          ariaLabel="Test Aria Label"
          readOnly={true}
          initialData={serializedData}
        />
      );

      expect(screen.queryByText("Test Placeholder")).not.toBeInTheDocument();
    });
  });

  describe("Auto-Format Valid Link Input", () => {
    it("should wrap valid URLs in a link when Enter is pressed", async () => {
      const user = userEvent.setup({ delay: 10 });

      const { getByLabelText } = render(
        <TextEditor
          id="test"
          placeholder="Write something..."
          ariaLabel="Editor"
          readOnly={false}
        />
      );

      const editor = getByLabelText("Editor");

      // Simulate typing a valid URL and then pressing Enter
      // await user.type(editor, "https://www.example.com");
      await user.type(editor, "www.example.com");
      await user.keyboard("{Enter}");

      await waitFor(() => {
        // Check if the content has been wrapped in a link
        const linkElement = document.querySelector("a");
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveTextContent("www.example.com");
      });
    });

    it("should wrap valid URLs in a link when Space is pressed", async () => {
      const user = userEvent.setup({ delay: 20 });

      const { getByLabelText } = render(
        <TextEditor
          id="test"
          placeholder="Write something..."
          ariaLabel="Editor"
          readOnly={false}
        />
      );

      const editor = getByLabelText("Editor");

      // Simulate typing a valid URL
      // Simulate pressing Space
      await user.type(editor, "www.example.com ");
      // await user.type(editor, "{Space}"); // Using Space is not working weird, very werid
      // gonna check it out later

      await waitFor(() => {
        // Check if the content has been wrapped in a link
        const linkElement = document.querySelector("a");
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveTextContent("www.example.com");
      });
    });

    it("should not auto-format a valid link when user is still typing without Enter or Space", async () => {
      const user = userEvent.setup({ delay: 10 });

      const { getByLabelText } = render(
        <TextEditor
          id="test"
          placeholder="Write something..."
          ariaLabel="Editor"
          readOnly={false}
        />
      );

      const editor = getByLabelText("Editor");
      await user.type(editor, "https://openai.com");

      // At this moment, the link should not appear yet
      await waitFor(() => {
        expect(() =>
          screen.getByRole("link", { name: "https://openai.com" })
        ).toThrow();
      });
    });

    // This one is not working properly in RTL, gonna refactor it later
    // it("should format valid URLs into anchors when pasting text", async () => {
    //   const user = userEvent.setup({ delay: 50 });

    //   const { getByLabelText } = render(
    //     <TextEditor
    //       id="test"
    //       placeholder="Write something..."
    //       ariaLabel="Editor"
    //       readOnly={false}
    //     />
    //   );

    //   const editor = getByLabelText("Editor");
    //   const pasteData =
    //     "Visit https://www.example.com for more details. This is a test.";

    //   // // Simulate pasting content with a valid URL and other text
    //   // editor.focus();
    //   // expect(editor).toHaveFocus();
    //   await user.click(editor);
    //   await user.paste(pasteData);
    //   // fireEvent.paste(editor, {
    //   //   clipboardData: {
    //   //     getData: () => pasteData,
    //   //   },
    //   // });

    //   await waitFor(() => {
    //     const linkElement = document.querySelector("a");
    //     expect(linkElement).toBeInTheDocument();
    //     expect(linkElement).toHaveTextContent("https://www.example.com");

    //     // Check that the other text remains unchanged
    //     const surroundingText = editor.textContent?.replace(
    //       linkElement?.textContent || "",
    //       ""
    //     );
    //     expect(surroundingText).toBe(
    //       "Visit  for more details. This is a test."
    //     );
    //   });
    // });
  });

  describe("Forwarded Methods", () => {
    let ref: React.RefObject<TextEditorRef>;

    beforeEach(() => {
      ref = React.createRef();
    });

    test("getEditor returns the editor ref", () => {
      const { getByLabelText } = render(
        <TextEditor
          id="test"
          placeholder="Write something..."
          ariaLabel="Editor"
          readOnly={false}
          ref={ref}
        />
      );

      expect(ref.current).toBeTruthy();
      expect(ref.current?.getEditor()).toBe(getByLabelText("Editor"));
    });

    test("getData returns serialized data", () => {
      const { getByLabelText } = render(
        <TextEditor
          id="test"
          placeholder="Write something..."
          ariaLabel="Editor"
          readOnly={false}
          ref={ref}
        />
      );
      const editor = getByLabelText("Editor");
      const html =
        '<div>Some initial text <a href="https://example.com/">Visit</a> for more details</div>';
      const expectedData = JSON.stringify(serialize(html));

      editor.innerHTML = html;

      expect(ref?.current?.getData()).toEqual(expectedData);
    });

    test("focus sets focus to the editor and reset cursor at the end of textContent", async () => {
      const { getByLabelText } = render(
        <TextEditor
          id="test"
          placeholder="Write something..."
          ariaLabel="Editor"
          readOnly={false}
          ref={ref}
        />
      );
      const editor = getByLabelText("Editor");
      expect(editor).not.toHaveFocus();

      await userEvent.type(editor, "This is a test paragraph");
      ref.current!.focus();

      await waitFor(() => {
        expect(document.activeElement).toBe(editor);

        // Should put the cursor at the end of the last TextNode
        expect(document.getSelection()?.anchorOffset).toBe(
          "This is a test paragraph".length
        );
      });
    });

    xtest("insertEmoji will insert after or replace the current selection with the emojiString(unicode)", async () => {
      const user = userEvent.setup();

      render(
        <TextEditor
          id="test"
          placeholder="Write something..."
          ariaLabel="Editor"
          readOnly={false}
          ref={ref}
        />
      );

      const editor = screen.getByLabelText("Editor");

      // write some text
      await user.type(editor, "This is a test paragraph");

      // Put cursor at the end and insert it
      ref.current.focus();
      setTimeout(() => {
        ref.current!.insertEmoji("1F604");
      }, 1000);

      await waitFor(() => {
        expect(editor.innerHTML).toContain("🙂");
      });
    });

    // ... Similarly, you can test other methods like insertEmoji etc.
  });

  describe("Hooks: useAddLink", () => {});
});
