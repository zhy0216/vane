import { styleToString } from "./utils";
import { ColumnPropsSchema, type ColumnProps } from "./schema";

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
