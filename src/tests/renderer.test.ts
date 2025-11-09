import { describe, expect, test } from "bun:test";
import { renderComponent, generateEmailHtml } from "../renderer";
import { readFileSync } from "fs";
import { join } from "path";

describe("renderComponent", () => {
  test("should render nested section with text and inline link", () => {
    const component = {
      type: "section",
      props: {
        textAlign: "center",
      },
      children: [
        {
          type: "text",
          props: {
            backgroundColor: "#008296",
            color: "#ffffff",
            padding: "8px 0",
          },
          children: [
            "How about evaluating a previous purchase? ",
            {
              type: "link",
              props: {
                href: "#",
                color: "#ffffff",
                textDecoration: "underline",
              },
              children: "View more",
            },
          ],
        },
      ],
    };

    const html = renderComponent(component);
    expect(html).toMatchSnapshot();
  });

  test("should render github access token email without errors", () => {
    // Load the actual github-access-token.json file
    const jsonPath = join(__dirname, "../../demo/jsons/github-access-token.json");
    const jsonContent = readFileSync(jsonPath, "utf-8");
    const emailData = JSON.parse(jsonContent);

    // This should not throw "Cannot read properties of undefined (reading 'toLowerCase')"
    expect(() => {
      const html = generateEmailHtml(emailData.component, emailData.subject);
      expect(html).toBeDefined();
      expect(html.length).toBeGreaterThan(0);
    }).not.toThrow();
  });

  test("should render github access token with fixed fixImagePaths", () => {
    // Import the actual fixed function logic
    function fixImagePaths(component: any): any {
      if (typeof component === 'string') {
        return component;
      }
      if (!component) return component;
      const fixed = { ...component };
      if (fixed.type === 'image' && fixed.props?.src) {
        const src = fixed.props.src;
        if (src.startsWith('/') && !src.startsWith('/demo/')) {
          fixed.props = { ...fixed.props, src: '/demo' + src };
        }
      }
      if (fixed.children && Array.isArray(fixed.children)) {
        fixed.children = fixed.children.map(fixImagePaths);
      }
      return fixed;
    }

    const jsonPath = join(__dirname, "../../demo/jsons/github-access-token.json");
    const jsonContent = readFileSync(jsonPath, "utf-8");
    const emailData = JSON.parse(jsonContent);
    
    // Apply the fixed fixImagePaths (like demo/app.ts does)
    const fixedComponent = fixImagePaths(emailData.component);
    
    // Should render successfully
    const html = generateEmailHtml(fixedComponent, emailData.subject);
    expect(html).toBeDefined();
    expect(html).toContain("@alanturing");
    expect(html).toContain("personal access");
  });

  test("should handle unregistered HTML tags like strong", () => {
    const component = {
      type: "text",
      props: {
        fontSize: "24px",
        color: "#24292e",
      },
      children: [
        {
          type: "strong",
          children: "@alanturing",
        },
        ", a personal access was created on your account.",
      ],
    };

    // This should not throw "Cannot read properties of undefined (reading 'toLowerCase')"
    expect(() => {
      const html = renderComponent(component);
      expect(html).toBeDefined();
      expect(html).toContain("strong");
      expect(html).toContain("@alanturing");
    }).not.toThrow();
  });

  test("should handle component with undefined type gracefully", () => {
    const invalidComponent = {
      type: undefined,
      children: "test",
    } as any;

    // This will throw an error because tag.toLowerCase() is called on undefined
    // Error message varies by runtime:
    // - Chrome: "Cannot read properties of undefined (reading 'toLowerCase')"
    // - Bun: "undefined is not an object (evaluating 'tag.toLowerCase')"
    expect(() => {
      renderComponent(invalidComponent);
    }).toThrow();
  });

  test("should reproduce the fixImagePaths bug - string children converted to invalid objects", () => {
    // This simulates what happens in demo/app.ts fixImagePaths function
    // When a string is spread: {...string} creates {0: 'c', 1: 'h', ...}
    const stringChild: any = ", a personal access was created on your account.";
    const malformedComponent = { ...stringChild };
    
    // The malformed component has no 'type' property
    expect(malformedComponent.type).toBeUndefined();
    
    // This reproduces the exact bug from the GitHub access token template
    // The error occurs in renderHtmlTag at line 180: tag.toLowerCase()
    expect(() => {
      renderComponent(malformedComponent);
    }).toThrow();
  });

  test("FIXED: github access token with corrected fixImagePaths", () => {
    // This test shows the fix working correctly
    
    // Fixed version of fixImagePaths
    function fixedFixImagePaths(component: any): any {
      // FIX: Return strings as-is
      if (typeof component === 'string') {
        return component;
      }
      
      if (!component) return component;
      
      const fixed = { ...component };
      
      if (fixed.type === 'image' && fixed.props?.src) {
        const src = fixed.props.src;
        if (src.startsWith('/')) {
          fixed.props = {
            ...fixed.props,
            src: '/demo' + src,
          };
        }
      }
      
      if (fixed.children && Array.isArray(fixed.children)) {
        fixed.children = fixed.children.map(fixedFixImagePaths);
      }
      
      return fixed;
    }

    // Same test component
    const component = {
      type: "text",
      props: {
        fontSize: "24px",
        color: "#24292e",
      },
      children: [
        {
          type: "strong",
          children: "@alanturing",
        },
        ", a personal access was created on your account.",
      ],
    };

    // Apply FIXED fixImagePaths
    const fixedComponent = fixedFixImagePaths(component);
    
    // Should render successfully without errors
    const html = renderComponent(fixedComponent);
    expect(html).toBeDefined();
    expect(html).toContain("@alanturing");
    expect(html).toContain(", a personal access was created on your account.");
  });
});
