import { describe, expect, test } from "bun:test";
import { renderComponent } from "../renderer";

describe("Footer Component", () => {
  describe("Stack Overflow Email Footer", () => {
    test("should render complete footer section with links and company info", () => {
      const footerComponent = {
        type: "section",
        props: {
          maxWidth: "680px",
          margin: "32px auto 0",
          padding: "0 30px",
        },
        children: [
          {
            type: "text",
            props: {
              fontSize: "12px",
              color: "#9199a1",
              lineHeight: "15px",
              marginTop: "0",
              marginBottom: "0",
            },
            children: "You're receiving this email because your Stack Overflow activity triggered this tip or reminder.",
          },
          {
            type: "text",
            props: {
              fontSize: "12px",
              marginTop: "8px",
            },
            children: [
              {
                type: "link",
                props: {
                  href: "/",
                  color: "#9199a1",
                  textDecoration: "underline",
                  fontSize: "12px",
                },
                children: "Unsubscribe from emails like this",
              },
              " | ",
              {
                type: "link",
                props: {
                  href: "/",
                  color: "#9199a1",
                  textDecoration: "underline",
                  fontSize: "12px",
                },
                children: "Edit email settings",
              },
              " | ",
              {
                type: "link",
                props: {
                  href: "/",
                  color: "#9199a1",
                  textDecoration: "underline",
                  fontSize: "12px",
                },
                children: "Contact us",
              },
              " | ",
              {
                type: "link",
                props: {
                  href: "/",
                  color: "#9199a1",
                  textDecoration: "underline",
                  fontSize: "12px",
                },
                children: "Privacy",
              },
            ],
          },
          {
            type: "hr",
            props: {
              color: "#d6d8db",
              margin: "30px 0",
            },
          },
          {
            type: "image",
            props: {
              src: "/stack-overflow-logo-sm.png",
              alt: "Stack Overflow",
              width: "111",
            },
          },
          {
            type: "text",
            props: {
              fontSize: "12px",
              color: "#9199a1",
              lineHeight: "15px",
              marginTop: "4px",
              marginBottom: "32px",
            },
            children: "Stack Overflow, 110 William Street, 28th Floor, New York, NY 10038",
          },
        ],
      };

      const html = renderComponent(footerComponent);
      expect(html).toMatchSnapshot();
    });

    test("should render simplified footer with common styles", () => {
      // Simplified version - demonstrating reusable style patterns
      const linkStyle = {
        color: "#9199a1",
        textDecoration: "underline",
        fontSize: "12px",
      };

      const grayTextStyle = {
        fontSize: "12px",
        color: "#9199a1",
        lineHeight: "15px",
      };

      const footerComponent = {
        type: "section",
        props: {
          maxWidth: "680px",
          margin: "32px auto 0",
          padding: "0 30px",
        },
        children: [
          {
            type: "text",
            props: {
              ...grayTextStyle,
              marginTop: "0",
              marginBottom: "0",
            },
            children: "You're receiving this email because your Stack Overflow activity triggered this tip or reminder.",
          },
          {
            type: "text",
            props: {
              fontSize: "12px",
              marginTop: "8px",
            },
            children: [
              { type: "link", props: { ...linkStyle, href: "/" }, children: "Unsubscribe" },
              " | ",
              { type: "link", props: { ...linkStyle, href: "/" }, children: "Settings" },
              " | ",
              { type: "link", props: { ...linkStyle, href: "/" }, children: "Contact" },
              " | ",
              { type: "link", props: { ...linkStyle, href: "/" }, children: "Privacy" },
            ],
          },
          {
            type: "hr",
            props: {
              color: "#d6d8db",
              margin: "30px 0",
            },
          },
          {
            type: "image",
            props: {
              src: "/stack-overflow-logo-sm.png",
              alt: "Stack Overflow",
              width: "111",
            },
          },
          {
            type: "text",
            props: {
              ...grayTextStyle,
              marginTop: "4px",
              marginBottom: "32px",
            },
            children: "Stack Overflow, 110 William Street, 28th Floor, New York, NY 10038",
          },
        ],
      };

      const html = renderComponent(footerComponent);
      expect(html).toMatchSnapshot();
    });

    test("should validate footer contains all required elements", () => {
      const footerComponent = {
        type: "section",
        props: {
          maxWidth: "680px",
          margin: "32px auto 0",
          padding: "0 30px",
        },
        children: [
          {
            type: "text",
            props: {
              fontSize: "12px",
              color: "#9199a1",
              lineHeight: "15px",
              marginTop: "0",
              marginBottom: "0",
            },
            children: "You're receiving this email because your Stack Overflow activity triggered this tip or reminder.",
          },
          {
            type: "text",
            props: {
              fontSize: "12px",
              marginTop: "8px",
            },
            children: [
              {
                type: "link",
                props: {
                  href: "/",
                  color: "#9199a1",
                  textDecoration: "underline",
                  fontSize: "12px",
                },
                children: "Unsubscribe from emails like this",
              },
              " | ",
              {
                type: "link",
                props: {
                  href: "/",
                  color: "#9199a1",
                  textDecoration: "underline",
                  fontSize: "12px",
                },
                children: "Edit email settings",
              },
              " | ",
              {
                type: "link",
                props: {
                  href: "/",
                  color: "#9199a1",
                  textDecoration: "underline",
                  fontSize: "12px",
                },
                children: "Contact us",
              },
              " | ",
              {
                type: "link",
                props: {
                  href: "/",
                  color: "#9199a1",
                  textDecoration: "underline",
                  fontSize: "12px",
                },
                children: "Privacy",
              },
            ],
          },
          {
            type: "hr",
            props: {
              color: "#d6d8db",
              margin: "30px 0",
            },
          },
          {
            type: "image",
            props: {
              src: "/stack-overflow-logo-sm.png",
              alt: "Stack Overflow",
              width: "111",
            },
          },
          {
            type: "text",
            props: {
              fontSize: "12px",
              color: "#9199a1",
              lineHeight: "15px",
              marginTop: "4px",
              marginBottom: "32px",
            },
            children: "Stack Overflow, 110 William Street, 28th Floor, New York, NY 10038",
          },
        ],
      };

      const html = renderComponent(footerComponent);
      
      // Verify footer contains key elements (note: apostrophe is HTML-escaped)
      expect(html).toContain("You&#39;re receiving this email");
      expect(html).toContain("Unsubscribe from emails like this");
      expect(html).toContain("Edit email settings");
      expect(html).toContain("Contact us");
      expect(html).toContain("Privacy");
      expect(html).toContain("Stack Overflow");
      expect(html).toContain("110 William Street");
      expect(html).toContain("stack-overflow-logo-sm.png");
    });

    test("should handle minimal footer structure", () => {
      const footerComponent = {
        type: "section",
        props: {
          maxWidth: "600px",
          padding: "20px",
        },
        children: [
          {
            type: "text",
            props: {
              fontSize: "11px",
              color: "#888",
            },
            children: "© 2024 Company. All rights reserved.",
          },
          {
            type: "hr",
            props: {
              color: "#ccc",
              margin: "20px 0",
            },
          },
          {
            type: "text",
            props: {
              fontSize: "11px",
              color: "#888",
            },
            children: "123 Main St, City, State 12345",
          },
        ],
      };

      const html = renderComponent(footerComponent);
      expect(html).toMatchSnapshot();
    });

    test("should handle children inside props object", () => {
      // Test that children can be placed inside props instead of at component level
      const footerComponent = {
        type: "section",
        props: {
          maxWidth: "600px",
          padding: "20px",
          children: [
            {
              type: "text",
              props: {
                fontSize: "11px",
                color: "#888",
                children: "© 2024 Company. All rights reserved.",
              },
            },
            {
              type: "hr",
              props: {
                color: "#ccc",
                margin: "20px 0",
              },
            },
            {
              type: "text",
              props: {
                fontSize: "11px",
                color: "#888",
                children: "123 Main St, City, State 12345",
              },
            },
          ],
        },
      };

      const html = renderComponent(footerComponent);
      expect(html).toContain("© 2024 Company. All rights reserved.");
      expect(html).toContain("123 Main St, City, State 12345");
      expect(html).toMatchSnapshot();
    });
  });
});
