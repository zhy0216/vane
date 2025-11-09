import { styleToString, escapeHtml } from "./utils";
import { type LinkProps } from "./schema";

/**
 * Link component - Anchor tag with email-safe defaults
 */
export function renderLink(
  props: Omit<LinkProps, 'children'> & {children: string}
): string {
  const { 
    href, 
    children, 
    target = "_blank", 
    color,
    textDecoration,
    style = {} 
  } = props;
  
  // children is already rendered HTML by the renderer
  const content = children || "";
  
  const finalStyle = {
    color: color || "#067df7",
    textDecoration: textDecoration || "none",
    ...style,
  };
  
  const styleAttr = ` style="${styleToString(finalStyle as Record<string, string | number>)}"`;
  
  return `<a href="${escapeHtml(href)}" target="${target}"${styleAttr}>${content}</a>`;
}
