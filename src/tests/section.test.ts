import { describe, expect, test } from "bun:test";
import { renderSection } from "../components/section";
import { SectionPropsSchema } from "../components/schema";

describe("Section Component", () => {
  describe("Basic Rendering", () => {
    test("should render a simple section", () => {
      const props = {
        children: "<p>Hello World</p>",
      };

      const html = renderSection(props);
      expect(html).toMatchSnapshot();
    });

    test("should include table structure", () => {
      const props = {
        children: "<div>Content</div>",
      };

      const html = renderSection(props);
      expect(html).toMatchSnapshot();
    });

    test("should have email-safe table attributes", () => {
      const props = {
        children: "<div>Test</div>",
      };

      const html = renderSection(props);
      expect(html).toMatchSnapshot();
    });

    test("should not include style attribute when no styles provided", () => {
      const props = {
        children: "<p>Content</p>",
      };

      const html = renderSection(props);
      expect(html).toMatchSnapshot();
    });
  });

  describe("Background Color", () => {
    test("should apply backgroundColor prop", () => {
      const props = {
        children: "<p>Content</p>",
        backgroundColor: "#f0f0f0",
      };

      const html = renderSection(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle hex color codes", () => {
      const props = {
        children: "<p>Content</p>",
        backgroundColor: "#ff5a5f",
      };

      const html = renderSection(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle named colors", () => {
      const props = {
        children: "<p>Content</p>",
        backgroundColor: "lightblue",
      };

      const html = renderSection(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle rgba colors", () => {
      const props = {
        children: "<p>Content</p>",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
      };

      const html = renderSection(props);
      expect(html).toMatchSnapshot();
    });
  });

  describe("Padding", () => {
    test("should apply padding prop", () => {
      const props = {
        children: "<p>Content</p>",
        padding: "20px",
      };

      const html = renderSection(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle complex padding values", () => {
      const props = {
        children: "<p>Content</p>",
        padding: "10px 20px 30px 40px",
      };

      const html = renderSection(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle shorthand padding", () => {
      const props = {
        children: "<p>Content</p>",
        padding: "15px 30px",
      };

      const html = renderSection(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle rem units", () => {
      const props = {
        children: "<p>Content</p>",
        padding: "2rem",
      };

      const html = renderSection(props);
      expect(html).toMatchSnapshot();
    });
  });

  describe("Text Align", () => {
    test("should apply textAlign prop", () => {
      const props = {
        children: "<p>Centered text</p>",
        textAlign: "center",
      };

      const html = renderSection(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle left alignment", () => {
      const props = {
        children: "<p>Left aligned</p>",
        textAlign: "left",
      };

      const html = renderSection(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle right alignment", () => {
      const props = {
        children: "<p>Right aligned</p>",
        textAlign: "right",
      };

      const html = renderSection(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle justify alignment", () => {
      const props = {
        children: "<p>Justified text</p>",
        textAlign: "justify",
      };

      const html = renderSection(props);
      expect(html).toMatchSnapshot();
    });
  });

  describe("Custom Styles", () => {
    test("should apply custom style properties", () => {
      const props = {
        children: "<p>Content</p>",
        style: {
          borderRadius: "8px",
          border: "2px solid #ccc",
        },
      };

      const html = renderSection(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle numeric style values", () => {
      const props = {
        children: "<p>Content</p>",
        style: {
          borderWidth: 1,
          opacity: 0.95,
        },
      };

      const html = renderSection(props);
      expect(html).toMatchSnapshot();
    });

    test("should merge all style sources", () => {
      const props = {
        children: "<p>Content</p>",
        backgroundColor: "#ffffff",
        padding: "20px",
        textAlign: "center",
        style: {
          border: "1px solid #e0e0e0",
        },
      };

      const html = renderSection(props);
      expect(html).toMatchSnapshot();
    });

    test("should allow style to override backgroundColor", () => {
      const props = {
        children: "<p>Content</p>",
        backgroundColor: "#ffffff",
        style: {
          backgroundColor: "#000000",
        },
      };

      const html = renderSection(props);
      expect(html).toMatchSnapshot();
    });
  });

  describe("Combined Props", () => {
    test("should apply all props together", () => {
      const props = {
        children: "<h2>Section Title</h2><p>Section content</p>",
        backgroundColor: "#f9f9f9",
        padding: "30px 20px",
        textAlign: "center",
        style: {
          border: "1px solid #ddd",
          borderRadius: "4px",
        },
      };

      const html = renderSection(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle subset of optional props", () => {
      const props = {
        children: "<p>Content</p>",
        backgroundColor: "#f0f0f0",
        textAlign: "left",
      };

      const html = renderSection(props);
      expect(html).toMatchSnapshot();
    });
  });

  describe("Schema Validation", () => {
    test("should validate valid section props", () => {
      const props = {
        children: "<p>Valid content</p>",
        backgroundColor: "#ffffff",
        padding: "20px",
        textAlign: "center",
        style: { border: "1px solid #ccc" },
      };

      const result = SectionPropsSchema.safeParse(props);
      expect(result.success).toBe(true);
    });

    test("should require children prop", () => {
      const props = {
        backgroundColor: "#ffffff",
        padding: "20px",
      };

      const result = SectionPropsSchema.safeParse(props);
      expect(result.success).toBe(false);
    });

    test("should allow props without backgroundColor (optional)", () => {
      const props = {
        children: "<p>Content</p>",
        padding: "20px",
        textAlign: "center",
      };

      const result = SectionPropsSchema.safeParse(props);
      expect(result.success).toBe(true);
    });

    test("should allow props without padding (optional)", () => {
      const props = {
        children: "<p>Content</p>",
        backgroundColor: "#ffffff",
        textAlign: "center",
      };

      const result = SectionPropsSchema.safeParse(props);
      expect(result.success).toBe(true);
    });

    test("should allow props without textAlign (optional)", () => {
      const props = {
        children: "<p>Content</p>",
        backgroundColor: "#ffffff",
        padding: "20px",
      };

      const result = SectionPropsSchema.safeParse(props);
      expect(result.success).toBe(true);
    });

    test("should allow props without style (optional)", () => {
      const props = {
        children: "<p>Content</p>",
        backgroundColor: "#ffffff",
      };

      const result = SectionPropsSchema.safeParse(props);
      expect(result.success).toBe(true);
    });

    test("should validate with only required props", () => {
      const props = {
        children: "<div>Minimal section</div>",
      };

      const result = SectionPropsSchema.safeParse(props);
      expect(result.success).toBe(true);
    });
  });

  describe("HTML Safety", () => {
    test("should preserve children HTML content", () => {
      const props = {
        children: "<p>This is <em>italic</em> and <strong>bold</strong></p>",
      };

      const html = renderSection(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle children with special characters", () => {
      const props = {
        children: "<p>Use & to separate items</p>",
      };

      const html = renderSection(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle complex nested structures", () => {
      const props = {
        children: `
          <div class="content">
            <h3>Heading</h3>
            <div class="inner">
              <p>Paragraph</p>
            </div>
          </div>
        `,
      };

      const html = renderSection(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle children with inline styles", () => {
      const props = {
        children: '<p style="color: red;">Red text</p>',
      };

      const html = renderSection(props);
      expect(html).toMatchSnapshot();
    });
  });

  describe("Edge Cases", () => {
    test("should handle empty children", () => {
      const props = {
        children: "",
      };

      const html = renderSection(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle whitespace-only children", () => {
      const props = {
        children: "   \n\t   ",
      };

      const html = renderSection(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle minimal props with no optional fields", () => {
      const props = {
        children: "<p>Basic</p>",
      };

      const html = renderSection(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle very long content", () => {
      const longContent = "<p>" + "Text content ".repeat(200) + "</p>";
      const props = {
        children: longContent,
      };

      const html = renderSection(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle empty style object", () => {
      const props = {
        children: "<p>Content</p>",
        style: {},
      };

      const html = renderSection(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle style with many properties", () => {
      const props = {
        children: "<p>Content</p>",
        style: {
          margin: "0 auto",
          border: "2px solid #333",
          borderRadius: "12px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          backgroundColor: "#fefefe",
          padding: "25px",
          textAlign: "center",
        },
      };

      const html = renderSection(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle zero values", () => {
      const props = {
        children: "<p>Content</p>",
        padding: "0",
        style: {
          margin: 0,
          borderWidth: 0,
        },
      };

      const html = renderSection(props);
      expect(html).toMatchSnapshot();
    });
  });

  describe("Real-world Use Cases", () => {
    test("should render email header section", () => {
      const props = {
        children: "<img src='logo.png' alt='Logo' /><h1>Welcome!</h1>",
        backgroundColor: "#4a90e2",
        padding: "40px 20px",
        textAlign: "center",
        style: {
          color: "#ffffff",
        },
      };

      const html = renderSection(props);
      expect(html).toMatchSnapshot();
    });

    test("should render content section with styling", () => {
      const props = {
        children: "<p>This is the main content of the email.</p>",
        backgroundColor: "white",
        padding: "30px",
        style: {
          border: "1px solid #e5e5e5",
          borderRadius: "8px",
        },
      };

      const html = renderSection(props);
      expect(html).toMatchSnapshot();
    });

    test("should render footer section", () => {
      const props = {
        children: "<p>© 2024 Company Name. All rights reserved.</p>",
        backgroundColor: "#f4f4f4",
        padding: "20px",
        textAlign: "center",
        style: {
          fontSize: "12px",
          color: "#666666",
        },
      };

      const html = renderSection(props);
      expect(html).toMatchSnapshot();
    });

    test("should render CTA section", () => {
      const props = {
        children: '<a href="#" style="display: inline-block; padding: 15px 30px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px;">Get Started</a>',
        padding: "40px 20px",
        textAlign: "center",
      };

      const html = renderSection(props);
      expect(html).toMatchSnapshot();
    });
  });

  describe("Differences from Container", () => {
    test("should not include max-width by default (unlike container)", () => {
      const props = {
        children: "<p>Content</p>",
      };

      const html = renderSection(props);
      expect(html).toMatchSnapshot();
    });

    test("should support textAlign prop (unlike container)", () => {
      const props = {
        children: "<p>Aligned content</p>",
        textAlign: "right",
      };

      const html = renderSection(props);
      expect(html).toMatchSnapshot();
    });

    test("should omit style attribute when no styles (unlike container which always has max-width)", () => {
      const props = {
        children: "<p>Content</p>",
      };

      const html = renderSection(props);
      expect(html).toMatchSnapshot();
    });
  });
});
