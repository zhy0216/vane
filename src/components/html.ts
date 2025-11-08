import { z } from "zod";
import { styleToString } from "./utils";

export const HtmlPropsSchema = z.object({
  children: z.string(),
  lang: z.string().optional(),
  dir: z.enum(["ltr", "rtl"]).optional(),
  style: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
});

export type HtmlProps = z.infer<typeof HtmlPropsSchema>;

/**
 * Html component - Root HTML element with lang and dir attributes
 */
export function renderHtml(props: HtmlProps): string {
  const { children, lang = "en", dir = "ltr", style } = props;
  
  const styleAttr = style ? ` style="${styleToString(style as Record<string, string | number>)}"` : "";
  
  return `<html lang="${lang}" dir="${dir}"${styleAttr}>${children}</html>`;
}
