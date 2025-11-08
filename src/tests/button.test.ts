import { describe, expect, test } from "bun:test";
import { renderButton } from "../components/button";
import { ButtonPropsSchema } from "../components/schema";

describe("Button Component", () => {
  describe("Airbnb Review Button - User Specific Case", () => {
    test("should render button with all styling properties from Airbnb review JSON", () => {
      const props = {
        href: "https://www.airbnb.com",
        children: "Send My Feedback",
        style: {
          backgroundColor: "#ff5a5f",
          color: "#ffffff",
          fontSize: "18px",
          borderRadius: "3px",
          padding: "19px 30px",
          textAlign: "center",
          textDecoration: "none",
        },
      };

      const html = renderButton(props);
      expect(html).toMatchSnapshot();
    });

    test("should validate props schema for Airbnb button", () => {
      const props = {
        href: "https://www.airbnb.com",
        children: "Send My Feedback",
        style: {
          backgroundColor: "#ff5a5f",
          color: "#ffffff",
          fontSize: "18px",
          borderRadius: "3px",
          padding: "19px 30px",
          textAlign: "center",
          textDecoration: "none",
        },
      };

      const result = ButtonPropsSchema.safeParse(props);
      expect(result.success).toBe(true);
    });
  });

  describe("Basic Rendering", () => {
    test("should render a simple button", () => {
      const props = {
        href: "https://example.com",
        children: "Click me",
      };

      const html = renderButton(props);
      expect(html).toMatchSnapshot();
    });

    test("should use custom target attribute", () => {
      const props = {
        href: "https://example.com",
        children: "Click me",
        target: "_self",
      };

      const html = renderButton(props);
      expect(html).toMatchSnapshot();
    });
  });

  describe("Style Handling", () => {
    test("should apply custom styles", () => {
      const props = {
        href: "https://example.com",
        children: "Styled Button",
        style: {
          backgroundColor: "#007bff",
          color: "#ffffff",
          fontSize: "16px",
          fontWeight: "bold",
        },
      };

      const html = renderButton(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle numeric style values", () => {
      const props = {
        href: "https://example.com",
        children: "Button",
        style: {
          fontSize: 20,
          padding: "10px 20px",
        },
      };

      const html = renderButton(props);
      expect(html).toMatchSnapshot();
    });
  });

  describe("Padding Handling", () => {
    test("should parse shorthand padding (2 values)", () => {
      const props = {
        href: "https://example.com",
        children: "Button",
        style: {
          padding: "10px 20px",
        },
      };

      const html = renderButton(props);
      expect(html).toMatchSnapshot();
    });

    test("should parse shorthand padding (4 values)", () => {
      const props = {
        href: "https://example.com",
        children: "Button",
        style: {
          padding: "10px 15px 20px 25px",
        },
      };

      const html = renderButton(props);
      expect(html).toMatchSnapshot();
    });

    test("should parse single value padding", () => {
      const props = {
        href: "https://example.com",
        children: "Button",
        style: {
          padding: "15px",
        },
      };

      const html = renderButton(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle individual padding properties", () => {
      const props = {
        href: "https://example.com",
        children: "Button",
        style: {
          paddingTop: "10px",
          paddingRight: "20px",
          paddingBottom: "10px",
          paddingLeft: "20px",
        },
      };

      const html = renderButton(props);
      expect(html).toMatchSnapshot();
    });
  });

  describe("MSO (Outlook) Compatibility", () => {
    test("should include MSO conditional comments", () => {
      const props = {
        href: "https://example.com",
        children: "Button",
        style: {
          padding: "15px 25px",
        },
      };

      const html = renderButton(props);
      expect(html).toMatchSnapshot();
    });

    test("should calculate mso-text-raise based on vertical padding", () => {
      const props = {
        href: "https://example.com",
        children: "Button",
        style: {
          padding: "20px 30px",
        },
      };

      const html = renderButton(props);
      expect(html).toMatchSnapshot();
    });

    test("should include zero-width characters for MSO padding workaround", () => {
      const props = {
        href: "https://example.com",
        children: "Button",
        style: {
          padding: "15px 30px",
        },
      };

      const html = renderButton(props);
      expect(html).toMatchSnapshot();
    });
  });

  describe("HTML Safety", () => {
    test("should escape HTML in href", () => {
      const props = {
        href: 'https://example.com?foo=bar&baz=qux"onclick="alert(1)"',
        children: "Button",
      };

      const html = renderButton(props);
      expect(html).toMatchSnapshot();
    });

    test("should escape HTML in children text", () => {
      const props = {
        href: "https://example.com",
        children: '<script>alert("xss")</script>',
      };

      const html = renderButton(props);
      expect(html).toMatchSnapshot();
    });

    test("should escape HTML in target attribute", () => {
      const props = {
        href: "https://example.com",
        children: "Button",
        target: '_blank" onclick="alert(1)',
      };

      const html = renderButton(props);
      expect(html).toMatchSnapshot();
    });
  });

  describe("Schema Validation", () => {
    test("should validate valid button props", () => {
      const props = {
        href: "https://example.com",
        children: "Button",
        target: "_blank",
        style: { color: "red" },
      };

      const result = ButtonPropsSchema.safeParse(props);
      expect(result.success).toBe(true);
    });

    test("should reject props without href", () => {
      const props = {
        children: "Button",
      };

      const result = ButtonPropsSchema.safeParse(props);
      expect(result.success).toBe(false);
    });

    test("should reject props without children", () => {
      const props = {
        href: "https://example.com",
      };

      const result = ButtonPropsSchema.safeParse(props);
      expect(result.success).toBe(false);
    });

    test("should allow props without target (optional)", () => {
      const props = {
        href: "https://example.com",
        children: "Button",
      };

      const result = ButtonPropsSchema.safeParse(props);
      expect(result.success).toBe(true);
    });

    test("should allow props without style (optional)", () => {
      const props = {
        href: "https://example.com",
        children: "Button",
      };

      const result = ButtonPropsSchema.safeParse(props);
      expect(result.success).toBe(true);
    });
  });

  describe("Edge Cases", () => {
    test("should handle button with no padding", () => {
      const props = {
        href: "https://example.com",
        children: "Button",
        style: {},
      };

      const html = renderButton(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle empty style object", () => {
      const props = {
        href: "https://example.com",
        children: "Button",
        style: {},
      };

      const html = renderButton(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle long text content", () => {
      const props = {
        href: "https://example.com",
        children: "This is a very long button text that might wrap",
      };

      const html = renderButton(props);
      expect(html).toMatchSnapshot();
    });

    test("should handle special characters in text", () => {
      const props = {
        href: "https://example.com",
        children: "Subscribe & Save 20%",
      };

      const html = renderButton(props);
      expect(html).toMatchSnapshot();
    });
  });
});
