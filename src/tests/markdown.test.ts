import { describe, expect, test } from "bun:test";
import { renderMarkdown } from "../components/markdown";
import { MarkdownPropsSchema } from "../components/schema";

describe("Markdown Component", () => {
  describe("Basic Rendering", () => {
    test("should render plain text", () => {
      const props = {
        children: "This is plain text",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
    });

    test("should wrap content in markdown container div", () => {
      const props = {
        children: "Test content",
      };

      const html = renderMarkdown(props);
      expect(html).toContain('data-id="react-email-markdown"');
      expect(html).toContain("<div");
      expect(html).toContain("</div>");
    });
  });

  describe("Headers", () => {
    test("should render h1 headers", () => {
      const props = {
        children: "# Heading 1",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
      expect(html).toContain("<h1");
      expect(html).toContain("Heading 1</h1>");
    });

    test("should render h2 headers", () => {
      const props = {
        children: "## Heading 2",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
      expect(html).toContain("<h2");
      expect(html).toContain("Heading 2</h2>");
    });

    test("should render h3 headers", () => {
      const props = {
        children: "### Heading 3",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
      expect(html).toContain("<h3");
      expect(html).toContain("Heading 3</h3>");
    });

    test("should render multiple headers", () => {
      const props = {
        children: "# Title\n## Subtitle\n### Section",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
    });
  });

  describe("Text Formatting", () => {
    test("should render bold text", () => {
      const props = {
        children: "This is **bold** text",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
      expect(html).toContain("<strong");
      expect(html).toContain("bold</strong>");
    });

    test("should render italic text", () => {
      const props = {
        children: "This is *italic* text",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
      expect(html).toContain("<em");
      expect(html).toContain("italic</em>");
    });

    test("should render both bold and italic", () => {
      const props = {
        children: "**bold** and *italic* text",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle nested formatting", () => {
      const props = {
        children: "This is **bold with *italic* inside**",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
    });
  });

  describe("Code Blocks", () => {
    test("should render inline code", () => {
      const props = {
        children: "Use `console.log()` to debug",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
      expect(html).toContain("<code");
      expect(html).toContain("console.log()</code>");
    });

    test("should render code blocks", () => {
      const props = {
        children: "```\nconst x = 42;\nconsole.log(x);\n```",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
      expect(html).toContain("<pre");
      expect(html).toContain("<code>");
      expect(html).toContain("const x = 42;");
    });

    test("should render code block with language", () => {
      const props = {
        children: "```javascript\nconst x = 42;\n```",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle multiple inline code snippets", () => {
      const props = {
        children: "Use `const` or `let` for variables",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
    });
  });

  describe("Links", () => {
    test("should render links", () => {
      const props = {
        children: "[Click here](https://example.com)",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
      expect(html).toContain('<a href="https://example.com"');
      expect(html).toContain('target="_blank"');
      expect(html).toContain("Click here</a>");
    });

    test("should render multiple links", () => {
      const props = {
        children: "Visit [Google](https://google.com) or [GitHub](https://github.com)",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle links with special characters in URL", () => {
      const props = {
        children: "[Search](https://example.com/search?q=test&lang=en)",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
    });
  });

  describe("Lists", () => {
    test("should render unordered list with dash", () => {
      const props = {
        children: "- Item 1\n- Item 2\n- Item 3",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
      expect(html).toContain("<ul");
      expect(html).toContain("<li");
      expect(html).toContain("Item 1</li>");
      expect(html).toContain("Item 2</li>");
      expect(html).toContain("Item 3</li>");
    });

    test("should render unordered list with asterisk", () => {
      const props = {
        children: "* Item 1\n* Item 2\n* Item 3",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
      expect(html).toContain("<ul");
      expect(html).toContain("<li");
    });

    test("should render unordered list with plus", () => {
      const props = {
        children: "+ Item 1\n+ Item 2\n+ Item 3",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
      expect(html).toContain("<ul");
      expect(html).toContain("<li");
    });

    test("should render ordered list", () => {
      const props = {
        children: "1. First item\n2. Second item\n3. Third item",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
      expect(html).toContain("<ol");
      expect(html).toContain("<li");
      expect(html).toContain("First item</li>");
      expect(html).toContain("Second item</li>");
      expect(html).toContain("Third item</li>");
    });

    test("should render ordered list with non-sequential numbers", () => {
      const props = {
        children: "1. First\n5. Second\n10. Third",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
      expect(html).toContain("<ol");
    });

    test("should handle list items with inline formatting", () => {
      const props = {
        children: "- **Bold** item\n- *Italic* item\n- `Code` item",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
      expect(html).toContain("<strong");
      expect(html).toContain("<em");
      expect(html).toContain("<code");
    });

    test("should handle list items with links", () => {
      const props = {
        children: "- Visit [Google](https://google.com)\n- Check [GitHub](https://github.com)",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
      expect(html).toContain('<a href');
    });

    test("should render single list item", () => {
      const props = {
        children: "- Single item",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
      expect(html).toContain("<ul");
      expect(html).toContain("<li");
    });

    test("should handle multiple separate lists", () => {
      const props = {
        children: "- List 1 Item 1\n- List 1 Item 2\n\nText between\n\n- List 2 Item 1\n- List 2 Item 2",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
    });

    test("should apply custom styles to ul", () => {
      const props = {
        children: "- Item 1\n- Item 2",
        markdownCustomStyles: {
          ul: { paddingLeft: '40px', color: 'blue' },
        },
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
      expect(html).toContain("padding-left:40px");
      expect(html).toContain("color:blue");
    });

    test("should apply custom styles to ol", () => {
      const props = {
        children: "1. Item 1\n2. Item 2",
        markdownCustomStyles: {
          ol: { paddingLeft: '30px', fontWeight: 'bold' },
        },
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
      expect(html).toContain("padding-left:30px");
      expect(html).toContain("font-weight:bold");
    });

    test("should apply custom styles to li", () => {
      const props = {
        children: "- Item 1\n- Item 2",
        markdownCustomStyles: {
          li: { marginBottom: '15px', color: 'red' },
        },
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
      expect(html).toContain("margin-bottom:15px");
      expect(html).toContain("color:red");
    });

    test("should handle long list items", () => {
      const props = {
        children: "- This is a very long list item that contains a lot of text to test wrapping\n- Another long item",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle mixed list types", () => {
      const props = {
        children: "- Unordered item\n\n1. Ordered item\n2. Another ordered",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
      expect(html).toContain("<ul");
      expect(html).toContain("<ol");
    });
  });

  describe("Line Breaks", () => {
    test("should convert double newlines to paragraph breaks", () => {
      const props = {
        children: "First paragraph\n\nSecond paragraph",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
      expect(html).toContain("</p><p>");
    });

    test("should convert single newlines to br tags", () => {
      const props = {
        children: "First line\nSecond line",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
      expect(html).toContain("<br />");
    });

    test("should handle multiple line breaks", () => {
      const props = {
        children: "Line 1\nLine 2\n\nParagraph 2",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
    });
  });

  describe("Complex Content", () => {
    test("should render mixed markdown elements", () => {
      const props = {
        children: "# Welcome\n\nThis is **bold** and *italic*.\n\n[Link](https://example.com)",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle markdown with code and links", () => {
      const props = {
        children: "Use `npm install` from [npm](https://npmjs.com)",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
    });

    test("should render full email-like content", () => {
      const props = {
        children: "# Welcome to Our Service\n\n**Thank you** for signing up!\n\nGet started by visiting [our docs](https://example.com/docs).\n\n```\nnpm install example\n```",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
    });

    test("should render content with lists and other elements", () => {
      const props = {
        children: "# Getting Started\n\nFollow these steps:\n\n1. Install the package: `npm install`\n2. Configure your **settings**\n3. Visit [documentation](https://example.com)\n\nFeatures:\n\n- Fast and reliable\n- Easy to use\n- *Open source*",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
      expect(html).toContain("<h1");
      expect(html).toContain("<ol");
      expect(html).toContain("<ul");
      expect(html).toContain("<code");
      expect(html).toContain("<strong");
      expect(html).toContain("<em");
      expect(html).toContain("<a href");
    });
  });

  describe("Custom Styles", () => {
    test("should apply custom styles to h1", () => {
      const props = {
        children: "# Heading",
        markdownCustomStyles: {
          h1: { fontSize: '3rem', color: '#ff0000' },
        },
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
    });

    test("should apply custom styles to multiple elements", () => {
      const props = {
        children: "# Heading\n\n**Bold text**",
        markdownCustomStyles: {
          h1: { fontSize: '2rem' },
          bold: { color: '#0000ff' },
        },
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
    });

    test("should override default styles", () => {
      const props = {
        children: "`code`",
        markdownCustomStyles: {
          codeInline: { background: '#000000', color: '#ffffff' },
        },
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
    });

    test("should replace element styles when custom styles provided", () => {
      const props = {
        children: "**bold**",
        markdownCustomStyles: {
          bold: { color: 'red' },
        },
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
      // Custom styles replace defaults (shallow merge)
      expect(html).toContain("color:red");
      // Default fontWeight is not present since we replaced the bold style
      expect(html).not.toContain("font-weight:bold");
    });
  });

  describe("Container Styles", () => {
    test("should apply container styles", () => {
      const props = {
        children: "Content",
        markdownContainerStyles: {
          padding: "20px",
          backgroundColor: "#f5f5f5",
        },
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
      expect(html).toContain("padding:20px");
      expect(html).toContain("background-color:#f5f5f5");
    });

    test("should handle empty container styles", () => {
      const props = {
        children: "Content",
        markdownContainerStyles: {},
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle numeric container style values", () => {
      const props = {
        children: "Content",
        markdownContainerStyles: {
          padding: 20,
          margin: 10,
        },
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
      expect(html).toContain("padding:20px");
      expect(html).toContain("margin:10px");
    });

    test("should handle camelCase style properties", () => {
      const props = {
        children: "Content",
        markdownContainerStyles: {
          backgroundColor: "#ffffff",
          borderRadius: "5px",
        },
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
      expect(html).toContain("background-color:#ffffff");
      expect(html).toContain("border-radius:5px");
    });
  });

  describe("Schema Validation", () => {
    test("should validate valid markdown props", () => {
      const props = {
        children: "# Test",
        markdownCustomStyles: { h1: { color: 'red' } },
        markdownContainerStyles: { padding: '10px' },
      };

      const result = MarkdownPropsSchema.safeParse(props);
      expect(result.success).toBe(true);
    });

    test("should reject props without children", () => {
      const props = {
        markdownCustomStyles: {},
      };

      const result = MarkdownPropsSchema.safeParse(props);
      expect(result.success).toBe(false);
    });

    test("should allow props without custom styles", () => {
      const props = {
        children: "Test",
      };

      const result = MarkdownPropsSchema.safeParse(props);
      expect(result.success).toBe(true);
    });

    test("should allow props without container styles", () => {
      const props = {
        children: "Test",
        markdownCustomStyles: { h1: { color: 'red' } },
      };

      const result = MarkdownPropsSchema.safeParse(props);
      expect(result.success).toBe(true);
    });

    test("should reject non-string children", () => {
      const props = {
        children: 123,
      };

      const result = MarkdownPropsSchema.safeParse(props);
      expect(result.success).toBe(false);
    });
  });

  describe("Edge Cases", () => {
    test("should handle empty string", () => {
      const props = {
        children: "",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle markdown without matches", () => {
      const props = {
        children: "Just plain text without any markdown",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle special characters", () => {
      const props = {
        children: "Special chars: & < > \" '",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle incomplete markdown syntax", () => {
      const props = {
        children: "This has *incomplete italic",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle backticks without closing", () => {
      const props = {
        children: "Code: `incomplete",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle malformed links", () => {
      const props = {
        children: "[Link without URL",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle very long content", () => {
      const longContent = "Lorem ipsum ".repeat(100);
      const props = {
        children: longContent,
      };

      const html = renderMarkdown(props);
      expect(html).toContain(longContent);
      expect(html).toMatchSnapshot();
    });

    test("should handle content starting with tag-like structure", () => {
      const props = {
        children: "# Header",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
      // Should start with <div not <p
      expect(html).toMatch(/^<div/);
    });

    test("should handle only whitespace", () => {
      const props = {
        children: "   \n\n   ",
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
    });
  });

  describe("CSS to Inline Conversion", () => {
    test("should convert camelCase to kebab-case", () => {
      const props = {
        children: "Test",
        markdownContainerStyles: {
          backgroundColor: "#fff",
          fontSize: "14px",
          fontWeight: "bold",
        },
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
      expect(html).toContain("background-color:#fff");
      expect(html).toContain("font-size:14px");
      expect(html).toContain("font-weight:bold");
    });

    test("should handle numeric values correctly", () => {
      const props = {
        children: "Test",
        markdownContainerStyles: {
          width: 100,
          opacity: 0.5,
          zIndex: 10,
          fontWeight: 700,
        },
      };

      const html = renderMarkdown(props);
      expect(html).toMatchSnapshot();
      expect(html).toContain("width:100px");
      expect(html).toContain("opacity:0.5"); // No px for opacity
      expect(html).toContain("z-index:10"); // No px for z-index
      expect(html).toContain("font-weight:700"); // No px for font-weight
    });
  });
});
