import { z } from "zod";
import { styleToString } from "./utils";

export const ContainerPropsSchema = z.object({
  children: z.string(),
  style: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
});

export type ContainerProps = z.infer<typeof ContainerPropsSchema>;

/**
 * Container component - Centered table with max-width for email layout
 */
export function renderContainer(props: ContainerProps): string {
  const { children, style = {} } = props;
  
  const finalStyle = {
    maxWidth: "37.5em",
    ...style,
  };
  
  const styleAttr = ` style="${styleToString(finalStyle)}"`;
  
  return `<table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"${styleAttr}>
  <tbody>
    <tr style="width: 100%">
      <td>${children}</td>
    </tr>
  </tbody>
</table>`;
}
