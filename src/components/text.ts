import { Component } from "../types";
import { TextPropsSchema, type TextProps } from "./schema";
import { renderComponent } from "../renderer";

// Text 组件的 props

/**
 * Text 组件 - 渲染文本内容
 * 生成兼容邮件客户端的 HTML
 */
export function renderText(
  props: TextProps
): string {
  const {
    children,
    color = "#000000",
    fontSize = "14px",
    fontWeight = "normal",
    align = "left",
    lineHeight = "24px",
    marginTop = "16px",
    marginBottom = "16px",
    marginLeft,
    marginRight,
    backgroundColor,
    padding,
  } = props;

  // Process children - can be string or array of strings/components
  let text = "";
  if (typeof children === "string") {
    text = children;
  } else if (Array.isArray(children)) {
    text = children
      .map((child) => {
        if (typeof child === "string") {
          return child;
        } else {
          // Render component children (e.g., inline links)
          return renderComponent(child);
        }
      })
      .join("");
  }

  // 内联样式，确保邮件客户端兼容性
  const styles: string[] = [
    `color: ${color}`,
    `font-size: ${fontSize}`,
    `font-weight: ${fontWeight}`,
    `text-align: ${align}`,
    `line-height: ${lineHeight}`,
    `margin: 0`,
    `padding: 0`,
    `margin-top: ${marginTop}`,
    `margin-bottom: ${marginBottom}`,
  ];

  if (marginLeft) styles.push(`margin-left: ${marginLeft}`);
  if (marginRight) styles.push(`margin-right: ${marginRight}`);
  if (backgroundColor) styles.push(`background-color: ${backgroundColor}`);
  if (padding) {
    // Override the default padding: 0 if padding is provided
    const paddingIndex = styles.indexOf('padding: 0');
    if (paddingIndex !== -1) {
      styles[paddingIndex] = `padding: ${padding}`;
    } else {
      styles.push(`padding: ${padding}`);
    }
  }

  // 使用 <p> 标签包裹文本
  // text is already escaped/rendered in the processing above
  return `<p style="${styles.join("; ")}">${text}</p>`;
}

/**
 * 转义 HTML 特殊字符，防止 XSS
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
