import { styleToString } from "./utils";
import { SectionPropsSchema, type SectionProps } from "./schema";

/**
 * Section component - Table-based section wrapper for email layout
 */
export function renderSection(props: SectionProps): string {
  const { children, backgroundColor, padding, textAlign, style = {} } = props;
  
  const finalStyle: Record<string, string | number> = {
    ...style,
  };
  
  if (backgroundColor) finalStyle.backgroundColor = backgroundColor;
  if (padding) finalStyle.padding = padding;
  if (textAlign) finalStyle.textAlign = textAlign;
  
  const styleAttr = Object.keys(finalStyle).length > 0 
    ? ` style="${styleToString(finalStyle)}"` 
    : "";
  
  return `<table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"${styleAttr}>
  <tbody>
    <tr>
      <td>${children}</td>
    </tr>
  </tbody>
</table>`;
}
