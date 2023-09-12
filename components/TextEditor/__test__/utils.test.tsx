import { createLinkNode, searchLink, serialize, deserialize } from "../utils";
import { SerializedNode } from "../utils/serialization";

describe("Text Editor: Utility Functions", () => {
  describe("createLinkNode", () => {
    it("creates an anchor element with given href", () => {
      const props = {
        href: "www.example.com",
      };

      const link = createLinkNode(props);
      expect(link.href).toBe("https://www.example.com/");
    });

    it("preserves https when provided", () => {
      const props = {
        href: "https://www.example.com",
      };

      const link = createLinkNode(props);
      expect(link.href).toBe("https://www.example.com/");
    });

    it("preserves http when provided", () => {
      const props = {
        href: "http://www.example.com",
      };

      const link = createLinkNode(props);
      expect(link.href).toBe("http://www.example.com/");
    });

    it("creates a link with a custom text", () => {
      const props = {
        href: "www.example.com",
        text: "Example Link",
      };

      const link = createLinkNode(props);
      expect(link.textContent).toBe("Example Link");
    });

    it("assigns the default linkType when none is provided", () => {
      const props = {
        href: "www.example.com",
      };

      const link = createLinkNode(props);
      expect(link.dataset.linkType).toBe("embedLink");
    });

    it("assigns a custom linkType when provided", () => {
      const props = {
        href: "www.example.com",
        linkType: "autoLink",
      };

      const link = createLinkNode(props);
      expect(link.dataset.linkType).toBe("autoLink");
    });

    it("adds the appropriate className", () => {
      const props = {
        href: "www.example.com",
      };

      const link = createLinkNode(props);
      expect(link.className).toBe("text-editor__link");
    });
  });

  describe("searchLink", () => {
    it("should find the first URL in a string", () => {
      const input =
        "Check out my website at https://example.com for more details.";
      const result = searchLink(input);

      expect(result).toEqual({
        url: "https://example.com",
        startIndex: 24,
        endIndex: 43,
      });
    });

    it("should return null if no URL is found", () => {
      const input = "This string has no URL.";
      const result = searchLink(input);

      expect(result).toBe(null);
    });

    it("should use the provided regex if one is given", () => {
      const customRegex = /example\.com/;
      const input = 'Find the word "example.com" in this sentence.';
      const result = searchLink(input, customRegex);

      expect(result).toEqual({
        url: "example.com",
        startIndex: 15,
        endIndex: 26,
      });
    });

    it("should detect URLs starting with www", () => {
      const input = "Visit www.example.com for more.";
      const result = searchLink(input);

      expect(result).toEqual({
        url: "www.example.com",
        startIndex: 6,
        endIndex: 21,
      });
    });

    it("should only find the first URL if multiple are present", () => {
      const input = "We have www.example1.com and http://example2.com here.";
      const result = searchLink(input);

      expect(result).toEqual({
        url: "www.example1.com",
        startIndex: 8,
        endIndex: 24,
      });
    });

    it("should handle edge case with URL at the start", () => {
      const input = "https://example.com is my site.";
      const result = searchLink(input);

      expect(result).toEqual({
        url: "https://example.com",
        startIndex: 0,
        endIndex: 19,
      });
    });

    it("should handle edge case with URL at the end", () => {
      const input = "My site is https://example.com";
      const result = searchLink(input);

      expect(result).toEqual({
        url: "https://example.com",
        startIndex: 11,
        endIndex: 30,
      });
    });
  });

  describe("serialize", () => {
    it("should serialize text nodes", () => {
      const innerHTML = "Hello World";
      const result = serialize(innerHTML);
      expect(result).toEqual([{ type: "text", content: "Hello World" }]);
    });

    it("should serialize link nodes", () => {
      const innerHTML = '<a href="https://example.com/">Visit</a>';
      const result = serialize(innerHTML);
      expect(result).toEqual([
        { type: "link", content: "Visit", href: "https://example.com/" },
      ]);
    });

    it("should serialize paragraph nodes", () => {
      const innerHTML = "<div>Hello World</div>";
      const result = serialize(innerHTML);
      expect(result).toEqual([
        {
          type: "paragraph",
          children: [{ type: "text", content: "Hello World" }],
        },
      ]);
    });

    it("should serialize breakline nodes", () => {
      const innerHTML = "<br>";
      const result = serialize(innerHTML);
      expect(result).toEqual([{ type: "breakline" }]);
    });

    it("should throw for unsupported nodes", () => {
      const innerHTML = '<img src="image.jpg">';
      expect(() => serialize(innerHTML)).toThrow("Unsupported node type");
    });

    it("should serialize links within a paragraph", () => {
      const innerHTML =
        '<div>Check out <a href="https://example.com/">this link</a> now.</div>';
      const result = serialize(innerHTML);
      expect(result).toEqual([
        {
          type: "paragraph",
          children: [
            { type: "text", content: "Check out " },
            {
              type: "link",
              content: "this link",
              href: "https://example.com/",
            },
            { type: "text", content: " now." },
          ],
        },
      ]);
    });
  });

  describe("deserialize", () => {
    it("should deserialize text nodes", () => {
      const serializedNodes: SerializedNode[] = [
        { type: "text", content: "Hello World" },
      ];
      const fragment = deserialize(serializedNodes);
      expect(fragment.textContent).toBe("Hello World");
    });

    it("should deserialize link nodes", () => {
      const serializedNodes: SerializedNode[] = [
        { type: "link", content: "Visit", href: "https://example.com" },
      ];
      const fragment = deserialize(serializedNodes);
      const link = fragment.querySelector("a");
      expect(link?.textContent).toBe("Visit");
      expect(link?.href).toBe("https://example.com/");
    });

    it("should deserialize paragraph nodes", () => {
      const serializedNodes: SerializedNode[] = [
        {
          type: "paragraph",
          children: [{ type: "text", content: "Hello World" }],
        },
      ];
      const fragment = deserialize(serializedNodes);
      const div = fragment.querySelector("div");
      expect(div?.textContent).toBe("Hello World");
    });

    it("should deserialize breakline nodes", () => {
      const serializedNodes: SerializedNode[] = [{ type: "breakline" }];
      const fragment = deserialize(serializedNodes);
      const br = fragment.querySelector("br");
      expect(br).not.toBeNull();
    });

    it("should handle breakline as the only child of a paragraph", () => {
      const serializedNodes: SerializedNode[] = [
        {
          type: "paragraph",
          children: [{ type: "breakline" }],
        },
      ];
      const fragment = deserialize(serializedNodes);
      const para = fragment.querySelector("div");
      expect(para?.children.length).toBe(1);
      expect(para?.children[0].tagName).toBe("BR");
    });

    it("should not contain breakline inside a link", () => {
      const serializedNodes: SerializedNode[] = [
        {
          type: "link",
          content: "Click me",
          href: "https://example.com",
          children: [{ type: "breakline" }], // This is an incorrect use case as per your rules.
        },
      ];
      const fragment = deserialize(serializedNodes);
      const link = fragment.querySelector("a");
      expect(link?.querySelector("br")).toBeNull();
    });

    it("should throw for unsupported serialized types", () => {
      const serializedNodes = [{ type: "image" }];
      // @ts-ignore: Runtime check, thus TS will report bad type in Compiletime
      expect(() => deserialize(serializedNodes)).toThrow(
        "Unsupported serialized type"
      );
    });

    it("should treat <script> tags as text during deserialization", () => {
      const serializedNodes: SerializedNode[] = [
        { type: "text", content: "<script>evilFunction()</script>" },
      ];
      const fragment = deserialize(serializedNodes);
      // Check if there's any script tag in the deserialized content
      const scripts = fragment.querySelectorAll("script");
      expect(scripts.length).toBe(0);
      // Ensure the content is as expected
      expect(fragment.textContent).toContain("<script>evilFunction()</script>");
    });

    it("should handle missing content property for text node", () => {
      const serializedNodes: SerializedNode[] = [{ type: "text" }];
      const fragment = deserialize(serializedNodes);
      expect(fragment.textContent).toBe("");
    });
  });

  describe("serialize + deserialize", () => {
    it("should handle nested children within a paragraph", () => {
      const innerHTML =
        '<div>Some text <a href="https://example.com/">Click here</a>Another line</div>';
      const serialized = serialize(innerHTML);
      expect(serialized).toEqual([
        {
          type: "paragraph",
          children: [
            { type: "text", content: "Some text " },
            {
              type: "link",
              content: "Click here",
              href: "https://example.com/",
            },
            { type: "text", content: "Another line" },
          ],
        },
      ]);

      const deserialized = deserialize(serialized);
      const div = deserialized.querySelector("div");
      expect(div?.textContent).toBe("Some text Click hereAnother line");
      expect(div?.querySelector("a")?.textContent).toBe("Click here");
      expect(div?.querySelector("a")?.href).toBe("https://example.com/");
    });

    it("should handle text nodes immediately after a link", () => {
      const innerHTML =
        '<div><a href="https://example.com/">Visit</a> for more details</div>';
      const serialized = serialize(innerHTML);
      expect(serialized).toEqual([
        {
          type: "paragraph",
          children: [
            {
              type: "link",
              content: "Visit",
              href: "https://example.com/",
            },
            { type: "text", content: " for more details" },
          ],
        },
      ]);

      const deserialized = deserialize(serialized);
      const div = deserialized.querySelector("div");
      expect(div?.textContent).toBe("Visit for more details");
      expect(div?.querySelector("a")?.nextSibling?.nodeValue).toBe(
        " for more details"
      );
    });

    it("should maintain order of nested children within a paragraph", () => {
      const innerHTML =
        '<div>Some initial text <a href="https://example.com/">Visit</a> for more details</div>';
      const serialized = serialize(innerHTML);
      expect(serialized).toEqual([
        {
          type: "paragraph",
          children: [
            { type: "text", content: "Some initial text " },
            {
              type: "link",
              content: "Visit",
              href: "https://example.com/",
            },
            { type: "text", content: " for more details" },
          ],
        },
      ]);

      const deserialized = deserialize(serialized);
      const div = deserialized.querySelector("div");
      expect(div?.textContent).toBe("Some initial text Visit for more details");
      expect(div?.querySelector("a")?.previousSibling?.nodeValue).toBe(
        "Some initial text "
      );
      expect(div?.querySelector("a")?.nextSibling?.nodeValue).toBe(
        " for more details"
      );
    });
  });
});
