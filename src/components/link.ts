import { z } from "zod";
import { styleToString, escapeHtml } from "./utils";

export const LinkPropsSchema = z.object({
  href: z.string(),
  children: z.string(),
  target: z.string().optional(),
  style: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
});

export type LinkProps = z.infer<typeof LinkPropsSchema>;

/**
 * Link component - Anchor tag with email-safe defaults
 */
export function renderLink(props: LinkProps): string {
  const { href, children, target = "_blank", style = {} } = props;
  
  const finalStyle = {
    color: "#067df7",
    textDecorationLine: "none",
    ...style,
  };
  
  const styleAttr = ` style="${styleToString(finalStyle as Record<string, string | number>)}"`;
  
  return `<a href="${escapeHtml(href)}" target="${target}"${styleAttr}>${children}</a>`;
}
