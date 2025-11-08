import { describe, expect, test } from "bun:test";
import { renderContainer } from "../components/container";
import { ContainerPropsSchema } from "../components/schema";

describe("Container Component", () => {
  describe("Basic Rendering", () => {
    test("should render a simple container", () => {
      const props = {
        children: "<p>Hello World</p>",
      };

      const html = renderContainer(props);
      expect(html).toMatchSnapshot();
    });

    test("should include table structure", () => {
      const props = {
        children: "<div>Content</div>",
      };

      const html = renderContainer(props);
      expect(html).toMatchSnapshot();
    });

    test("should include default max-width style", () => {
      const props = {
        children: "<p>Content</p>",
      };

      const html = renderContainer(props);
      expect(html).toMatchSnapshot();
    });

    test("should have email-safe table attributes", () => {
      const props = {
        children: "<div>Test</div>",
      };

      const html = renderContainer(props);
      expect(html).toMatchSnapshot();
    });
  });

  describe("Background Color", () => {
    test("should apply backgroundColor prop", () => {
      const props = {
        children: "<p>Content</p>",
        backgroundColor: "#f0f0f0",
      };

      const html = renderContainer(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle hex color codes", () => {
      const props = {
        children: "<p>Content</p>",
        backgroundColor: "#ff5a5f",
      };

      const html = renderContainer(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle named colors", () => {
      const props = {
        children: "<p>Content</p>",
        backgroundColor: "white",
      };

      const html = renderContainer(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle rgb colors", () => {
      const props = {
        children: "<p>Content</p>",
        backgroundColor: "rgb(255, 255, 255)",
      };

      const html = renderContainer(props);
      expect(html).toMatchSnapshot();
    });
  });

  describe("Padding", () => {
    test("should apply padding prop", () => {
      const props = {
        children: "<p>Content</p>",
        padding: "20px",
      };

      const html = renderContainer(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle complex padding values", () => {
      const props = {
        children: "<p>Content</p>",
        padding: "10px 20px 30px 40px",
      };

      const html = renderContainer(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle em units", () => {
      const props = {
        children: "<p>Content</p>",
        padding: "1em 2em",
      };

      const html = renderContainer(props);
      expect(html).toMatchSnapshot();
    });
  });

  describe("Custom Styles", () => {
    test("should apply custom style properties", () => {
      const props = {
        children: "<p>Content</p>",
        style: {
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        },
      };

      const html = renderContainer(props);
      expect(html).toMatchSnapshot();
    });

    test("should merge custom styles with default max-width", () => {
      const props = {
        children: "<p>Content</p>",
        style: {
          border: "1px solid #ccc",
        },
      };

      const html = renderContainer(props);
      expect(html).toMatchSnapshot();
    });

    test("should allow overriding max-width", () => {
      const props = {
        children: "<p>Content</p>",
        style: {
          maxWidth: "600px",
        },
      };

      const html = renderContainer(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle numeric style values", () => {
      const props = {
        children: "<p>Content</p>",
        style: {
          borderWidth: 2,
          opacity: 0.9,
        },
      };

      const html = renderContainer(props);
      expect(html).toMatchSnapshot();
    });
  });

  describe("Combined Props", () => {
    test("should apply all props together", () => {
      const props = {
        children: "<h1>Title</h1><p>Body text</p>",
        backgroundColor: "#ffffff",
        padding: "40px",
        style: {
          border: "1px solid #e0e0e0",
          borderRadius: "4px",
        },
      };

      const html = renderContainer(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle empty style object with other props", () => {
      const props = {
        children: "<p>Content</p>",
        backgroundColor: "#f5f5f5",
        padding: "20px",
        style: {},
      };

      const html = renderContainer(props);
      expect(html).toMatchSnapshot();
    });
  });

  describe("Schema Validation", () => {
    test("should validate valid container props", () => {
      const props = {
        children: "<p>Valid content</p>",
        backgroundColor: "#ffffff",
        padding: "20px",
        style: { border: "1px solid #ccc" },
      };

      const result = ContainerPropsSchema.safeParse(props);
      expect(result.success).toBe(true);
    });

    test("should require children prop", () => {
      const props = {
        backgroundColor: "#ffffff",
      };

      const result = ContainerPropsSchema.safeParse(props);
      expect(result.success).toBe(false);
    });

    test("should allow props without backgroundColor (optional)", () => {
      const props = {
        children: "<p>Content</p>",
        padding: "20px",
      };

      const result = ContainerPropsSchema.safeParse(props);
      expect(result.success).toBe(true);
    });

    test("should allow props without padding (optional)", () => {
      const props = {
        children: "<p>Content</p>",
        backgroundColor: "#ffffff",
      };

      const result = ContainerPropsSchema.safeParse(props);
      expect(result.success).toBe(true);
    });

    test("should allow props without style (optional)", () => {
      const props = {
        children: "<p>Content</p>",
      };

      const result = ContainerPropsSchema.safeParse(props);
      expect(result.success).toBe(true);
    });

    test("should validate with only required props", () => {
      const props = {
        children: "<div>Minimal container</div>",
      };

      const result = ContainerPropsSchema.safeParse(props);
      expect(result.success).toBe(true);
    });
  });

  describe("HTML Safety", () => {
    test("should preserve children HTML content", () => {
      const props = {
        children: "<p>This is <strong>bold</strong> text</p>",
      };

      const html = renderContainer(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle children with special characters", () => {
      const props = {
        children: "<p>Price: $100 & Save 20%</p>",
      };

      const html = renderContainer(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle complex nested HTML", () => {
      const props = {
        children: `
          <div>
            <h1>Title</h1>
            <p>Paragraph with <a href="#">link</a></p>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
          </div>
        `,
      };

      const html = renderContainer(props);
      expect(html).toMatchSnapshot();
    });
  });

  describe("Edge Cases", () => {
    test("should handle empty children", () => {
      const props = {
        children: "",
      };

      const html = renderContainer(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle whitespace-only children", () => {
      const props = {
        children: "   \n   ",
      };

      const html = renderContainer(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle minimal props with no optional fields", () => {
      const props = {
        children: "<p>Basic</p>",
      };

      const html = renderContainer(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle very long content", () => {
      const longContent = "<p>" + "Lorem ipsum ".repeat(100) + "</p>";
      const props = {
        children: longContent,
      };

      const html = renderContainer(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle style with many properties", () => {
      const props = {
        children: "<p>Content</p>",
        style: {
          maxWidth: "600px",
          margin: "0 auto",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          backgroundColor: "#fafafa",
          padding: "20px",
        },
      };

      const html = renderContainer(props);
      expect(html).toMatchSnapshot();
    });
  });

  describe("Real-world Use Cases", () => {
    test("should render email wrapper container", () => {
      const props = {
        children: "<h1>Welcome Email</h1><p>Thank you for signing up!</p>",
        backgroundColor: "#f4f4f4",
        padding: "40px 20px",
        style: {
          fontFamily: "Arial, sans-serif",
        },
      };

      const html = renderContainer(props);
      expect(html).toMatchSnapshot();
    });

    test("should render card-style container", () => {
      const props = {
        children: "<div class='card'>Content</div>",
        backgroundColor: "white",
        padding: "30px",
        style: {
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        },
      };

      const html = renderContainer(props);
      expect(html).toMatchSnapshot();
    });
  });
});
