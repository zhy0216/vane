import { styleToString, escapeHtml } from "./utils";
import { ImgPropsSchema, type ImgProps } from "./schema";

/**
 * Img component - Image with email-safe defaults
 */
export function renderImg(props: ImgProps): string {
  const { src, alt, width, height, style = {} } = props;
  
  const finalStyle = {
    display: "block",
    outline: "none",
    border: "none",
    textDecoration: "none",
    ...style,
  };
  
  const styleAttr = ` style="${styleToString(finalStyle as Record<string, string | number>)}"`;
  const widthAttr = width ? ` width="${width}"` : "";
  const heightAttr = height ? ` height="${height}"` : "";
  
  return `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}"${widthAttr}${heightAttr}${styleAttr} />`;
}
