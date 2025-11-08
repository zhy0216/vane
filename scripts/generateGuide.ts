#!/usr/bin/env bun

/**
 * Generate LLM-friendly guide for Vane email components
 * This script creates comprehensive documentation with schemas and examples
 */

import {
  BodyPropsSchema,
  ButtonPropsSchema,
  CodeBlockPropsSchema,
  CodeInlinePropsSchema,
  ColumnPropsSchema,
  ContainerPropsSchema,
  FontPropsSchema,
  HeadPropsSchema,
  HeadingPropsSchema,
  HrPropsSchema,
  HtmlPropsSchema,
  ImgPropsSchema,
  LinkPropsSchema,
  MarkdownPropsSchema,
  PreviewPropsSchema,
  RowPropsSchema,
  SectionPropsSchema,
  TextPropsSchema,
} from "../src/components/schema";

interface ComponentInfo {
  type: string;
  description: string;
  schema: any;
  category: string;
  example: any;
  additionalExample?: any;
  notes?: string[];
}

/**
 * Convert Zod schema to a readable JSON Schema format
 */
function schemaToJson(schema: any): any {
  try {
    // Get the schema shape for documentation
    const shape = schema._def.shape?.();
    if (!shape) return {};

    const result: any = {
      type: "object",
      properties: {},
      required: [] as string[],
    };

    for (const [key, value] of Object.entries(shape)) {
      const field = value as any;
      const isOptional = field._def?.typeName === "ZodOptional";
      const innerType = isOptional ? field._def.innerType : field;

      result.properties[key] = {
        type: getZodType(innerType),
        description: field._def?.description || innerType._def?.description || "",
      };

      if (!isOptional) {
        result.required.push(key);
      }
    }

    return result;
  } catch (e) {
    return { type: "object" };
  }
}

function getZodType(zodType: any): string {
  const typeName = zodType._def?.typeName;
  if (typeName?.includes("String")) return "string";
  if (typeName?.includes("Number")) return "number";
  if (typeName?.includes("Boolean")) return "boolean";
  if (typeName?.includes("Array")) return "array";
  if (typeName?.includes("Object") || typeName?.includes("Record")) return "object";
  if (typeName?.includes("Union")) return "string | number";
  return "any";
}

function generateGuide(): string {
  const components: ComponentInfo[] = [
    // Basic Structure Components
    {
      type: "html",
      description: "Root HTML element wrapper for the email document",
      category: "Structure",
      schema: schemaToJson(HtmlPropsSchema),
      example: {
        type: "html",
        props: { lang: "en", dir: "ltr" },
        children: [{ type: "body", props: {}, children: [] }],
      },
      notes: [
        "Should be the root element of your component tree",
        "Use 'lang' prop to specify document language",
        "Use 'dir' prop for text direction (ltr/rtl)",
      ],
    },
    {
      type: "head",
      description: "Container for metadata and styles in the email head section",
      category: "Structure",
      schema: schemaToJson(HeadPropsSchema),
      example: {
        type: "head",
        props: {},
        children: [],
      },
      notes: [
        "Place inside html component",
        "Can contain font definitions and other metadata",
      ],
    },
    {
      type: "body",
      description: "Email body with table wrapper for maximum email client compatibility",
      category: "Structure",
      schema: schemaToJson(BodyPropsSchema),
      example: {
        type: "body",
        props: {
          style: {
            backgroundColor: "#f6f9fc",
            fontFamily: "Arial, sans-serif",
          },
        },
        children: "Body content here",
      },
      notes: [
        "Automatically wraps content in a table for email client compatibility",
        "Background styles are applied to both body and inner table cell",
        "Margin properties are automatically reset for consistency",
      ],
    },

    // Layout Components
    {
      type: "container",
      description: "Centered container with fixed maximum width for email layout",
      category: "Layout",
      schema: schemaToJson(ContainerPropsSchema),
      example: {
        type: "container",
        props: {
          backgroundColor: "#ffffff",
          padding: "20px",
          style: { maxWidth: "600px" },
        },
        children: "Container content",
      },
      notes: [
        "Typically used as the main content wrapper",
        "Provides consistent width across email clients",
        "Supports backgroundColor and padding shortcuts",
      ],
    },
    {
      type: "section",
      description: "Full-width section for grouping content with background and padding",
      category: "Layout",
      schema: schemaToJson(SectionPropsSchema),
      example: {
        type: "section",
        props: {
          backgroundColor: "#f0f0f0",
          padding: "40px 20px",
          textAlign: "center",
        },
        children: "Section content",
      },
      notes: [
        "Use for distinct content areas with different backgrounds",
        "Supports textAlign for easy content alignment",
      ],
    },
    {
      type: "row",
      description: "Horizontal row container for column-based layouts",
      category: "Layout",
      schema: schemaToJson(RowPropsSchema),
      example: {
        type: "row",
        props: {},
        children: [
          { type: "column", props: {}, children: "Column 1" },
          { type: "column", props: {}, children: "Column 2" },
        ],
      },
      notes: [
        "Use with column components for multi-column layouts",
        "Automatically handles email-safe table structure",
      ],
    },
    {
      type: "column",
      description: "Column within a row for multi-column layouts",
      category: "Layout",
      schema: schemaToJson(ColumnPropsSchema),
      example: {
        type: "column",
        props: {
          style: { width: "50%", padding: "10px" },
        },
        children: "Column content",
      },
      notes: [
        "Must be used inside a row component",
        "Set width via style prop for custom column sizes",
      ],
    },

    // Content Components
    {
      type: "text",
      description: "Styled text paragraph with support for nested components",
      category: "Content",
      schema: schemaToJson(TextPropsSchema),
      example: {
        type: "text",
        props: {
          color: "#374151",
          fontSize: "16px",
          lineHeight: "24px",
          marginBottom: "16px",
        },
        children: "This is a paragraph of text.",
      },
      additionalExample: {
        type: "text",
        props: {
          fontSize: "14px",
          color: "#666666",
          children: [
            "Your appointment is scheduled for ",
            {
              type: "strong",
              children: "5:00 - 6:00 PM",
            },
            " on ",
            {
              type: "em",
              children: "Monday, January 15th",
            },
            ". Read our ",
            {
              type: "link",
              props: {
                href: "https://example.com/privacy",
                children: "privacy policy",
                style: { color: "#2563eb", textDecoration: "underline" },
              },
            },
            ".",
          ],
        },
      },
      notes: [
        "Renders as a <p> tag",
        "Can contain nested components like links or inline code",
        "To display inline text with another text component, add it to this text's children array",
        "Supports margin shortcuts (marginTop, marginBottom, etc.)",
        "Use align prop for text alignment",
        "IMPORTANT: HTML is escaped in text content. Cannot write '<strong>5:00 - 6:00 PM</strong>' directly",
        "To use HTML tags like strong, em, span, etc., wrap them with type property: {type: 'strong', children: '5:00 - 6:00 PM'}",
      ],
    },
    {
      type: "heading",
      description: "Semantic heading element (h1-h6) with styling options",
      category: "Content",
      schema: schemaToJson(HeadingPropsSchema),
      example: {
        type: "heading",
        props: {
          as: "h1",
          content: "Welcome to Our Newsletter",
          color: "#1f2937",
          fontSize: "32px",
          fontWeight: "bold",
          marginBottom: "24px",
        },
      },
      notes: [
        "Use 'as' prop to specify heading level (h1-h6)",
        "Alternatively use 'level' prop (1-6)",
        "Supports margin shortcuts (m, mx, my, mt, mr, mb, ml)",
        "Use 'content' or 'children' for the text",
      ],
    },
    {
      type: "link",
      description: "Hyperlink with styling support",
      category: "Content",
      schema: schemaToJson(LinkPropsSchema),
      example: {
        type: "link",
        props: {
          href: "https://example.com",
          target: "_blank",
          style: {
            color: "#2563eb",
            textDecoration: "underline",
          },
        },
        children: "Click here",
      },
      notes: [
        "Can be used standalone or nested within text",
        "Always specify href attribute",
        "Target defaults to '_blank' for external links",
      ],
    },
    {
      type: "button",
      description: "Call-to-action button with Outlook-compatible padding",
      category: "Content",
      schema: schemaToJson(ButtonPropsSchema),
      example: {
        type: "button",
        props: {
          href: "https://example.com/action",
          children: "Get Started",
          style: {
            backgroundColor: "#2563eb",
            color: "#ffffff",
            padding: "12px 24px",
            borderRadius: "6px",
            fontWeight: "600",
          },
        },
      },
      notes: [
        "Implements MSO conditional comments for Outlook compatibility",
        "Padding is automatically handled for consistent rendering",
        "Use href to specify the button's destination",
        "Children prop contains the button text",
      ],
    },
    {
      type: "image",
      description: "Responsive image with alt text support",
      category: "Content",
      schema: schemaToJson(ImgPropsSchema),
      example: {
        type: "image",
        props: {
          src: "https://example.com/logo.png",
          alt: "Company Logo",
          width: "200",
          height: "50",
          style: { display: "block" },
        },
      },
      notes: [
        "Always provide alt text for accessibility",
        "Specify width and height for consistent rendering",
        "Use display: block to remove bottom spacing",
      ],
    },
    {
      type: "hr",
      description: "Horizontal rule divider",
      category: "Content",
      schema: schemaToJson(HrPropsSchema),
      example: {
        type: "hr",
        props: {
          color: "#e5e7eb",
          style: { margin: "24px 0" },
        },
      },
      notes: ["Use for visual separation between content sections"],
    },

    // Special Components
    {
      type: "preview",
      description: "Preview text shown in email inbox (hidden from email body)",
      category: "Special",
      schema: schemaToJson(PreviewPropsSchema),
      example: {
        type: "preview",
        props: {
          children: "This preview text appears in the inbox",
        },
      },
      notes: [
        "Place near the top of your email for best results",
        "Not visible in the email body itself",
        "Helps improve email open rates with compelling preview text",
      ],
    },
    {
      type: "font",
      description: "Custom web font definition",
      category: "Special",
      schema: schemaToJson(FontPropsSchema),
      example: {
        type: "font",
        props: {
          fontFamily: "Inter",
          fallbackFontFamily: "Arial",
          webFont: {
            url: "https://fonts.googleapis.com/css2?family=Inter",
            format: "woff2",
          },
        },
      },
      notes: [
        "Place inside head component",
        "Always provide fallback fonts",
        "Not all email clients support web fonts",
      ],
    },
    {
      type: "code-inline",
      description: "Inline code snippet with monospace styling",
      category: "Special",
      schema: schemaToJson(CodeInlinePropsSchema),
      example: {
        type: "code-inline",
        props: {
          children: "const x = 42;",
          style: {
            backgroundColor: "#f3f4f6",
            padding: "2px 6px",
            borderRadius: "4px",
          },
        },
      },
      notes: ["Use within text for inline code references"],
    },
    {
      type: "code-block",
      description: "Multi-line code block with syntax highlighting",
      category: "Special",
      schema: schemaToJson(CodeBlockPropsSchema),
      example: {
        type: "code-block",
        props: {
          code: 'function hello() {\n  console.log("Hello!");\n}',
          language: "javascript",
          lineNumbers: true,
          style: {
            backgroundColor: "#1f2937",
            padding: "16px",
            borderRadius: "8px",
          },
        },
      },
      notes: [
        "Supports syntax highlighting for various languages",
        "Line numbers are optional",
        "Use for displaying code examples",
      ],
    },
    {
      type: "markdown",
      description: "Markdown content converted to email-safe HTML",
      category: "Special",
      schema: schemaToJson(MarkdownPropsSchema),
      example: {
        type: "markdown",
        props: {
          children:
            "# Hello\n\nThis is **bold** and this is *italic*.\n\n- Item 1\n- Item 2",
          markdownContainerStyles: {
            padding: "20px",
          },
        },
      },
      notes: [
        "Converts markdown to HTML automatically",
        "Supports custom styles for markdown elements",
        "Great for content-rich emails",
      ],
    },
  ];

  const guide = `# Vane Email Component System - LLM Guide

## Overview

Vane is a server-side email component rendering system that generates email-safe HTML. Components are defined as JSON objects with a specific structure and then rendered to HTML strings.

## Core Concepts

### Component Structure

Every component follows this structure:

\`\`\`json
{
  "type": "component-name",
  "props": {
    // Component-specific properties
  },
  "children": [] // Optional: array of child components or string content
}
\`\`\`

### Email Request Format

When making requests to the /generate endpoint, use this structure:

\`\`\`json
{
  "subject": "Email Subject (optional)",
  "component": {
    // Your root component here
  }
}
\`\`\`

### Nesting Components

Components can be nested by including child components in the "children" array:

\`\`\`json
{
  "type": "container",
  "props": {},
  "children": [
    {
      "type": "heading",
      "props": { "as": "h1", "content": "Welcome" }
    },
    {
      "type": "text",
      "props": {},
      "children": "This is a paragraph."
    }
  ]
}
\`\`\`

### Components That Accept String Children

Some components accept string content directly in their children property:
- body
- container
- section
- row
- column
- text (can also accept nested components)
- link (can also accept nested components)

### Components With Special Children Handling

- **button**: Uses "children" in props to specify button text (string only)
- **heading**: Uses "content" or "children" in props for the heading text
- **image**: No children (self-closing)
- **hr**: No children (self-closing)

### Using HTML Tags

HTML content is escaped for security. Standard HTML tags (strong, em, span, b, i, u, div, etc.) can be used anywhere as components by specifying them in the type property:

\`\`\`json
{
  "type": "container",
  "props": {},
  "children": [
    {
      "type": "strong",
      "children": "This is bold text as a standalone component"
    },
    {
      "type": "text",
      "props": {},
      "children": [
        "Or use inline: ",
        {
          "type": "strong",
          "children": "bold"
        },
        " and ",
        {
          "type": "em",
          "children": "italic"
        }
      ]
    }
  ]
}
\`\`\`

Do NOT write raw HTML like "<strong>text</strong>" - it will be escaped and displayed literally.

## Component Categories

${components
  .reduce((acc, comp) => {
    if (!acc.includes(comp.category)) acc.push(comp.category);
    return acc;
  }, [] as string[])
  .map((category) => {
    const categoryComponents = components.filter((c) => c.category === category);
    return `
### ${category} Components

${categoryComponents
  .map(
    (comp) => `
#### ${comp.type}

**Description:** ${comp.description}

**Schema:**
\`\`\`json
${JSON.stringify(comp.schema, null, 2)}
\`\`\`

**Example Usage:**
\`\`\`json
${JSON.stringify(comp.example, null, 2)}
\`\`\`

${comp.additionalExample ? `**Example with inline components:**
\`\`\`json
${JSON.stringify(comp.additionalExample, null, 2)}
\`\`\`

` : ""}${comp.notes ? `**Notes:**\n${comp.notes.map((note) => `- ${note}`).join("\n")}` : ""}
`
  )
  .join("\n")}`;
  })
  .join("\n")}

## Complete Email Example

Here's a complete example showing how to structure a full email:

\`\`\`json
{
  "subject": "Welcome to Our Platform",
  "component": {
    "type": "html",
    "props": {
      "lang": "en"
    },
    "children": [
      {
        "type": "head",
        "props": {}
      },
      {
        "type": "body",
        "props": {
          "style": {
            "backgroundColor": "#f6f9fc"
          }
        },
        "children": [
          {
            "type": "container",
            "props": {
              "backgroundColor": "#ffffff",
              "padding": "40px"
            },
            "children": [
              {
                "type": "preview",
                "props": {
                  "children": "Welcome to our platform! Get started today."
                }
              },
              {
                "type": "heading",
                "props": {
                  "as": "h1",
                  "content": "Welcome Aboard!",
                  "color": "#1f2937",
                  "fontSize": "32px",
                  "marginBottom": "16px"
                }
              },
              {
                "type": "text",
                "props": {
                  "color": "#6b7280",
                  "fontSize": "16px",
                  "lineHeight": "24px",
                  "marginBottom": "24px"
                },
                "children": "We're excited to have you join us. Click the button below to get started."
              },
              {
                "type": "button",
                "props": {
                  "href": "https://example.com/get-started",
                  "children": "Get Started",
                  "style": {
                    "backgroundColor": "#2563eb",
                    "color": "#ffffff",
                    "padding": "12px 24px",
                    "borderRadius": "6px",
                    "fontWeight": "600"
                  }
                }
              },
              {
                "type": "hr",
                "props": {
                  "color": "#e5e7eb",
                  "style": {
                    "margin": "32px 0"
                  }
                }
              },
              {
                "type": "text",
                "props": {
                  "color": "#9ca3af",
                  "fontSize": "14px"
                },
                "children": "If you have any questions, feel free to reach out!"
              }
            ]
          }
        ]
      }
    ]
  }
}
\`\`\`

## Best Practices

### 1. Always Wrap Content Properly
- Start with \`html\` as root
- Include \`head\` and \`body\` components
- Use \`container\` for main content area

### 2. Use Semantic Components
- Use \`heading\` with appropriate levels (h1-h6)
- Use \`section\` for distinct content areas
- Use \`row\` and \`column\` for multi-column layouts

### 3. Style Consistently
- Define colors and spacing using style props
- Use inline styles for best email client compatibility
- Test with common email clients (Gmail, Outlook, Apple Mail)

### 4. Accessibility
- Always provide \`alt\` text for images
- Use semantic heading hierarchy
- Ensure sufficient color contrast

### 5. Mobile Responsiveness
- Keep container width around 600px
- Use relative units (percentages) for column widths
- Test on mobile devices

### 6. Button Links
- Always use the \`button\` component for CTAs (not just links)
- Ensure adequate padding and size for touch targets
- Use contrasting colors for visibility

### 7. Email Client Compatibility
- The system automatically handles Outlook-specific rendering
- Padding on buttons is handled with MSO conditional comments
- Tables are used for layout (required for email clients)

## Common Patterns

### Hero Section
\`\`\`json
{
  "type": "section",
  "props": {
    "backgroundColor": "#2563eb",
    "padding": "60px 20px",
    "textAlign": "center"
  },
  "children": [
    {
      "type": "heading",
      "props": {
        "as": "h1",
        "content": "Big Announcement",
        "color": "#ffffff",
        "fontSize": "48px"
      }
    }
  ]
}
\`\`\`

### Two-Column Layout
\`\`\`json
{
  "type": "row",
  "props": {},
  "children": [
    {
      "type": "column",
      "props": { "style": { "width": "50%" } },
      "children": "Left column content"
    },
    {
      "type": "column",
      "props": { "style": { "width": "50%" } },
      "children": "Right column content"
    }
  ]
}
\`\`\`

### Call-to-Action Block
\`\`\`json
{
  "type": "section",
  "props": {
    "padding": "40px",
    "textAlign": "center"
  },
  "children": [
    {
      "type": "heading",
      "props": {
        "as": "h2",
        "content": "Ready to get started?",
        "marginBottom": "16px"
      }
    },
    {
      "type": "text",
      "props": {
        "marginBottom": "24px"
      },
      "children": "Join thousands of users today."
    },
    {
      "type": "button",
      "props": {
        "href": "https://example.com/signup",
        "children": "Sign Up Now",
        "style": {
          "backgroundColor": "#16a34a",
          "color": "#ffffff",
          "padding": "14px 28px",
          "borderRadius": "8px"
        }
      }
    }
  ]
}
\`\`\`

---

This guide provides all the information needed to construct valid email components for the Vane system. Use the schemas and examples as references when building your email templates.
`;

  return guide;
}

// Main execution
const outputFile = process.argv[2] || "./guides/component-guide.md";
const guide = generateGuide();

// Write to file
await Bun.write(outputFile, guide);
console.log(`✅ Guide generated successfully: ${outputFile}`);
console.log(`📄 File size: ${guide.length} characters`);
console.log(`\nYou can now use this guide to help LLMs understand how to use Vane components.`);
