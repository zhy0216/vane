import { styleToString } from "./utils";
import { ContainerPropsSchema, type ContainerProps } from "./schema";

/**
 * Container component - Centered table with max-width for email layout
 */
export function renderContainer(props: ContainerProps): string {
  const { children, backgroundColor, padding, style = {} } = props;
  
  const finalStyle: Record<string, string | number> = {
    maxWidth: "37.5em",
    ...style,
  };
  
  if (backgroundColor) finalStyle.backgroundColor = backgroundColor;
  if (padding) finalStyle.padding = padding;
  
  const styleAttr = ` style="${styleToString(finalStyle)}"`;
  
  return `<table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"${styleAttr}>
  <tbody>
    <tr style="width: 100%">
      <td>${children}</td>
    </tr>
  </tbody>
</table>`;
}
