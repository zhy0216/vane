import { Component } from "./types";
import { renderText } from "./components/text";
import { renderContainer } from "./components/container";
import { renderSection } from "./components/section";
import { renderHeading } from "./components/heading";
import { renderImg } from "./components/img";
import { renderHr } from "./components/hr";
import { renderLink } from "./components/link";
import { renderButton } from "./components/button";
import { renderRow } from "./components/row";
import { renderColumn } from "./components/column";
import {
  TextPropsSchema,
  ContainerPropsSchema,
  SectionPropsSchema,
  HeadingPropsSchema,
  ImgPropsSchema,
  HrPropsSchema,
  LinkPropsSchema,
  ButtonPropsSchema,
  RowPropsSchema,
  ColumnPropsSchema,
} from "./components/schema";
import { z } from "zod";

/**
 * Component registration interface
 */
interface ComponentRegistration {
  schema: z.ZodSchema<any>;
  render: (validatedProps: any) => string;
}

/**
 * Component registry
 */
const componentRegistry = new Map<string, ComponentRegistration>();

/**
 * Register a component with its schema and render function
 */
export function registerComponent(
  name: string,
  registration: ComponentRegistration
): void {
  componentRegistry.set(name, registration);
}

/**
 * Register all built-in components
 */
registerComponent("text", {
  schema: TextPropsSchema,
  render: (props) => renderText(props),
});

registerComponent("container", {
  schema: ContainerPropsSchema,
  render: (props) => renderContainer(props),
});

registerComponent("section", {
  schema: SectionPropsSchema,
  render: (props) => renderSection(props),
});

registerComponent("heading", {
  schema: HeadingPropsSchema,
  render: (props) => renderHeading(props),
});

registerComponent("image", {
  schema: ImgPropsSchema,
  render: (props) => renderImg(props),
});

registerComponent("hr", {
  schema: HrPropsSchema,
  render: (props) => renderHr(props),
});

registerComponent("link", {
  schema: LinkPropsSchema,
  render: (props) => renderLink(props),
});

registerComponent("button", {
  schema: ButtonPropsSchema,
  render: (props) => renderButton(props),
});

registerComponent("row", {
  schema: RowPropsSchema,
  render: (props) => renderRow(props),
});

registerComponent("column", {
  schema: ColumnPropsSchema,
  render: (props) => renderColumn(props),
});

/**
 * Helper function to render a child that can be either a Component or a string
 */
function renderChild(child: Component | string): string {
  if (typeof child === "string") {
    return escapeHtml(child);
  }
  return renderComponent(child);
}

/**
 * Render a component using the registration system
 */
export function renderComponent(component: Component): string {
  const { type, props, children } = component;

  const registration = componentRegistry.get(type);
  if (!registration) {
    return renderHtmlTag(type, props, children);
  }

  // Inject rendered children into props
  let propsToValidate = props || {};
  
  // Handle children from either component level or props level
  // Priority: component-level children > props.children
  const childrenToRender = children !== undefined ? children : propsToValidate.children;
  
  if (childrenToRender !== undefined) {
    // Normalize children to array
    const childrenArray = typeof childrenToRender === "string" ? [childrenToRender] : childrenToRender;
    const childrenHtml = childrenArray.map(renderChild).join("");
    propsToValidate = { ...propsToValidate, children: childrenHtml };
  }

  // Validate props with schema
  const validatedProps = registration.schema.parse(propsToValidate);

  // Render with the registered render function
  return registration.render(validatedProps);
}

function renderHtmlTag(
  tag: string,
  props?: Record<string, any>,
  children?: string | (Component | string)[]
): string {
  // Handle children from either parameter or props
  // Priority: parameter children > props.children
  const childrenToRender = children !== undefined ? children : props?.children;
  
  // Convert props to HTML attributes (excluding children)
  const attributes = props
    ? Object.entries(props)
        .filter(([key]) => key !== "children") // Don't render children as an HTML attribute
        .map(([key, value]) => {
          // Convert camelCase to kebab-case for CSS properties in style
          if (key === "style" && typeof value === "object") {
            const styleString = Object.entries(value)
              .map(([styleProp, styleValue]) => {
                const kebabProp = styleProp.replace(
                  /[A-Z]/g,
                  (match) => `-${match.toLowerCase()}`
                );
                return `${kebabProp}: ${styleValue}`;
              })
              .join("; ");
            return `style="${styleString}"`;
          }
          // For other attributes, escape and render
          if (typeof value === "string") {
            return `${key}="${escapeHtml(value)}"`;
          } else if (typeof value === "boolean") {
            return value ? key : "";
          }
          return `${key}="${String(value)}"`;
        })
        .filter((attr) => attr)
        .join(" ")
    : "";

  // Render children recursively
  // Normalize children to array if it's a string
  const childrenArray = typeof childrenToRender === "string" ? [childrenToRender] : childrenToRender;
  const childrenHtml = childrenArray?.map(renderChild).join("") || "";

  // Self-closing tags
  const selfClosingTags = ["img", "br", "hr", "input", "meta", "link"];
  if (selfClosingTags.includes(tag.toLowerCase())) {
    return attributes ? `<${tag} ${attributes} />` : `<${tag} />`;
  }

  // Regular tags with opening and closing
  const openTag = attributes ? `<${tag} ${attributes}>` : `<${tag}>`;
  return `${openTag}${childrenHtml}</${tag}>`;
}

/**
 * 生成完整的 Email HTML
 */
export function generateEmailHtml(
  component: Component,
  subject?: string
): string {
  const bodyContent = renderComponent(component);

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  ${subject ? `<title>${escapeHtml(subject)}</title>` : ""}
</head>
<body>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #ffffff;">
          <tr>
            <td style="padding: 20px;">
              ${bodyContent}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * 转义 HTML 特殊字符
 */
function escapeHtml(text: string): string {
  const htmlEscapeMap: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };

  return text.replace(/[&<>"']/g, (char) => htmlEscapeMap[char]);
}
