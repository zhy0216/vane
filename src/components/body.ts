import { z } from "zod";
import { styleToString } from "./utils";

export const BodyPropsSchema = z.object({
  children: z.string(),
  style: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
});

export type BodyProps = z.infer<typeof BodyPropsSchema>;

/**
 * Body component - Email body with table wrapper for client compatibility
 * Mimics React Email's Body component behavior
 */
export function renderBody(props: BodyProps): string {
  const { children, style = {} } = props;
  
  // Extract background styles for body element
  const bodyStyle: Record<string, string | number> = {};
  if (style.background) bodyStyle.background = style.background as string | number;
  if (style.backgroundColor) bodyStyle.backgroundColor = style.backgroundColor as string | number;
  
  // Reset margins if user sets any margin properties
  const marginProperties = [
    'margin', 'marginTop', 'marginBottom', 'marginRight', 'marginLeft',
    'marginInline', 'marginBlock', 'marginBlockStart', 'marginBlockEnd',
    'marginInlineStart', 'marginInlineEnd'
  ];
  
  for (const property of marginProperties) {
    if (style[property] !== undefined) {
      bodyStyle[property] = 0;
    }
  }
  
  const bodyStyleAttr = Object.keys(bodyStyle).length > 0 
    ? ` style="${styleToString(bodyStyle)}"` 
    : "";
  
  const cellStyleAttr = Object.keys(style).length > 0 
    ? ` style="${styleToString(style as Record<string, string | number>)}"` 
    : "";
  
  return `<body${bodyStyleAttr}>
  <table border="0" width="100%" cellpadding="0" cellspacing="0" role="presentation" align="center">
    <tbody>
      <tr>
        <td${cellStyleAttr}>${children}</td>
      </tr>
    </tbody>
  </table>
</body>`;
}
