import { z } from "zod";
import { styleToString } from "./utils";

export const HrPropsSchema = z.object({
  style: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
});

export type HrProps = z.infer<typeof HrPropsSchema>;

/**
 * Hr component - Horizontal rule with email-safe defaults
 */
export function renderHr(props: HrProps): string {
  const { style = {} } = props;
  
  const finalStyle = {
    width: "100%",
    border: "none",
    borderTop: "1px solid #eaeaea",
    ...style,
  };
  
  const styleAttr = ` style="${styleToString(finalStyle as Record<string, string | number>)}"`;
  
  return `<hr${styleAttr} />`;
}
