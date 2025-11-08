import { styleToString } from "./utils";
import { RowPropsSchema, type RowProps } from "./schema";

/**
 * Row component - Table row wrapper for column layouts
 */
export function renderRow(props: RowProps): string {
  const { children, style = {} } = props;
  
  const styleAttr = Object.keys(style).length > 0 
    ? ` style="${styleToString(style as Record<string, string | number>)}"` 
    : "";
  
  return `<table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"${styleAttr}>
  <tbody style="width: 100%">
    <tr style="width: 100%">${children}</tr>
  </tbody>
</table>`;
}
