import { z } from "zod";
import { Component, ComponentSchema } from "../types";
import { styleToString, escapeHtml } from "./utils";

export const LinkPropsSchema = z.object({
  href: z.string(),
  children: z.union([
    z.string(),
    z.array(z.union([z.string(), ComponentSchema]))
  ]).optional(),
  target: z.string().optional(),
  style: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
});

export type LinkProps = z.infer<typeof LinkPropsSchema>;

/**
 * Link component - Anchor tag with email-safe defaults
 */
export function renderLink(
  props: LinkProps,
  renderComponent?: (component: Component) => string
): string {
  const { href, children, target = "_blank", style = {} } = props;
  
  // Process children - can be string or array of strings/components
  let content = "";
  if (typeof children === "string") {
    content = escapeHtml(children);
  } else if (Array.isArray(children)) {
    content = children
      .map((child) => {
        if (typeof child === "string") {
          return escapeHtml(child);
        } else if (renderComponent) {
          // Child is a Component, render it
          return renderComponent(child);
        }
        return "";
      })
      .join("");
  }
  
  const finalStyle = {
    color: "#067df7",
    textDecorationLine: "none",
    ...style,
  };
  
  const styleAttr = ` style="${styleToString(finalStyle as Record<string, string | number>)}"`;
  
  return `<a href="${escapeHtml(href)}" target="${target}"${styleAttr}>${content}</a>`;
}
