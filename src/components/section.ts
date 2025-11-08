import { z } from "zod";
import { styleToString } from "./utils";

export const SectionPropsSchema = z.object({
  children: z.string(),
  backgroundColor: z.string().optional(),
  padding: z.string().optional(),
  textAlign: z.string().optional(),
  style: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
});

export type SectionProps = z.infer<typeof SectionPropsSchema>;

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
