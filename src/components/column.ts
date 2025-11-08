import { z } from "zod";
import { styleToString } from "./utils";

export const ColumnPropsSchema = z.object({
  children: z.string(),
  style: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
});

export type ColumnProps = z.infer<typeof ColumnPropsSchema>;

/**
 * Column component - Table cell for column layouts
 */
export function renderColumn(props: ColumnProps): string {
  const { children, style = {} } = props;
  
  const styleAttr = Object.keys(style).length > 0 
    ? ` style="${styleToString(style as Record<string, string | number>)}"` 
    : "";
  
  return `<td data-id="__react-email-column"${styleAttr}>${children}</td>`;
}
