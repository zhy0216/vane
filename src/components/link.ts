import { Component } from "../types";
import { styleToString, escapeHtml } from "./utils";
import { type LinkProps } from "./schema";
import { renderComponent } from "../renderer";

/**
 * Link component - Anchor tag with email-safe defaults
 */
export function renderLink(
  props: LinkProps
): string {
  const { 
    href, 
    children, 
    target = "_blank", 
    color,
    textDecoration,
    style = {} 
  } = props;
  
  // Process children - can be string or array of strings/components
  let content = "";
  if (typeof children === "string") {
    content = children;
  } else if (Array.isArray(children)) {
    content = children
      .map((child) => {
        if (typeof child === "string") {
          return child;
        } else {
          // Render component children (e.g., nested components)
          return renderComponent(child);
        }
      })
      .join("");
  }
  
  const finalStyle = {
    color: color || "#067df7",
    textDecoration: textDecoration || "none",
    ...style,
  };
  
  const styleAttr = ` style="${styleToString(finalStyle as Record<string, string | number>)}"`;
  
  return `<a href="${escapeHtml(href)}" target="${target}"${styleAttr}>${content}</a>`;
}
