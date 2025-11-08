import { styleToString } from "./utils";
import { HtmlPropsSchema, type HtmlProps } from "./schema";

/**
 * Html component - Root HTML element with lang and dir attributes
 */
export function renderHtml(props: HtmlProps): string {
  const { children, lang = "en", dir = "ltr", style } = props;
  
  const styleAttr = style ? ` style="${styleToString(style as Record<string, string | number>)}"` : "";
  
  return `<html lang="${lang}" dir="${dir}"${styleAttr}>${children}</html>`;
}
