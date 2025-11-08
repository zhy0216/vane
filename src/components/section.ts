import { z } from "zod";
import { styleToString } from "./utils";

export const SectionPropsSchema = z.object({
  children: z.string(),
  style: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
});

export type SectionProps = z.infer<typeof SectionPropsSchema>;

/**
 * Section component - Table-based section wrapper for email layout
 */
export function renderSection(props: SectionProps): string {
  const { children, style = {} } = props;
  
  const styleAttr = Object.keys(style).length > 0 
    ? ` style="${styleToString(style as Record<string, string | number>)}"` 
    : "";
  
  return `<table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"${styleAttr}>
  <tbody>
    <tr>
      <td>${children}</td>
    </tr>
  </tbody>
</table>`;
}
