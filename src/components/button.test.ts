import { describe, expect, test } from "bun:test";
import { renderButton, ButtonPropsSchema } from "./button";

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

      // Check that the link has correct href
      expect(html).toContain('href="https://www.airbnb.com"');
      
      // Check target attribute (default is _blank)
      expect(html).toContain('target="_blank"');
      
      // Check button text content
      expect(html).toContain("Send My Feedback");
      
      // Check that all style properties are included
      expect(html).toContain("background-color: #ff5a5f");
      expect(html).toContain("color: #ffffff");
      expect(html).toContain("font-size: 18px");
      expect(html).toContain("border-radius: 3px");
      expect(html).toContain("text-align: center");
      expect(html).toContain("text-decoration: none");
      
      // Check padding is correctly parsed (19px top/bottom, 30px left/right)
      expect(html).toContain("padding-top: 19px");
      expect(html).toContain("padding-right: 30px");
      expect(html).toContain("padding-bottom: 19px");
      expect(html).toContain("padding-left: 30px");
      
      // Check default styles are applied
      expect(html).toContain("line-height: 100%");
      expect(html).toContain("display: inline-block");
      expect(html).toContain("max-width: 100%");
      expect(html).toContain("mso-padding-alt: 0px");
      
      // Check MSO conditional comments for Outlook compatibility
      expect(html).toContain("<!--[if mso]>");
      expect(html).toContain("<![endif]-->");
      expect(html).toContain("mso-font-width:");
      expect(html).toContain("mso-text-raise:");
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

      expect(html).toContain('href="https://example.com"');
      expect(html).toContain("Click me");
      expect(html).toContain('target="_blank"');
    });

    test("should use custom target attribute", () => {
      const props = {
        href: "https://example.com",
        children: "Click me",
        target: "_self",
      };

      const html = renderButton(props);

      expect(html).toContain('target="_self"');
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

      expect(html).toContain("background-color: #007bff");
      expect(html).toContain("color: #ffffff");
      expect(html).toContain("font-size: 16px");
      expect(html).toContain("font-weight: bold");
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

      expect(html).toContain("font-size: 20px");
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

      expect(html).toContain("padding-top: 10px");
      expect(html).toContain("padding-right: 20px");
      expect(html).toContain("padding-bottom: 10px");
      expect(html).toContain("padding-left: 20px");
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

      expect(html).toContain("padding-top: 10px");
      expect(html).toContain("padding-right: 15px");
      expect(html).toContain("padding-bottom: 20px");
      expect(html).toContain("padding-left: 25px");
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

      expect(html).toContain("padding-top: 15px");
      expect(html).toContain("padding-right: 15px");
      expect(html).toContain("padding-bottom: 15px");
      expect(html).toContain("padding-left: 15px");
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

      expect(html).toContain("padding-top: 10px");
      expect(html).toContain("padding-right: 20px");
      expect(html).toContain("padding-bottom: 10px");
      expect(html).toContain("padding-left: 20px");
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

      expect(html).toContain("<!--[if mso]>");
      expect(html).toContain("<![endif]-->");
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

      // Total vertical padding: 20px + 20px = 40px
      // mso-text-raise should be in pt: 40 * 3/4 = 30pt
      expect(html).toContain("mso-text-raise:");
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

      expect(html).toContain("&#8202;");
    });
  });

  describe("HTML Safety", () => {
    test("should escape HTML in href", () => {
      const props = {
        href: 'https://example.com?foo=bar&baz=qux"onclick="alert(1)"',
        children: "Button",
      };

      const html = renderButton(props);

      expect(html).not.toContain('onclick="alert(1)"');
      expect(html).toContain("&quot;");
    });

    test("should escape HTML in children text", () => {
      const props = {
        href: "https://example.com",
        children: '<script>alert("xss")</script>',
      };

      const html = renderButton(props);

      expect(html).not.toContain("<script>");
      expect(html).toContain("&lt;script&gt;");
    });

    test("should escape HTML in target attribute", () => {
      const props = {
        href: "https://example.com",
        children: "Button",
        target: '_blank" onclick="alert(1)',
      };

      const html = renderButton(props);

      expect(html).not.toContain('onclick="alert(1)');
      expect(html).toContain("&quot;");
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

      expect(html).toContain('href="https://example.com"');
      expect(html).toContain("Button");
    });

    test("should handle empty style object", () => {
      const props = {
        href: "https://example.com",
        children: "Button",
        style: {},
      };

      const html = renderButton(props);

      // Should still include default styles
      expect(html).toContain("line-height: 100%");
      expect(html).toContain("display: inline-block");
    });

    test("should handle long text content", () => {
      const props = {
        href: "https://example.com",
        children: "This is a very long button text that might wrap",
      };

      const html = renderButton(props);

      expect(html).toContain("This is a very long button text that might wrap");
    });

    test("should handle special characters in text", () => {
      const props = {
        href: "https://example.com",
        children: "Subscribe & Save 20%",
      };

      const html = renderButton(props);

      expect(html).toContain("Subscribe &amp; Save 20%");
    });
  });
});
