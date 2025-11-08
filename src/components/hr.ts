import { z } from "zod";
import { styleToString } from "./utils";

export const HrPropsSchema = z.object({
  color: z.string().optional(),
  style: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
});

export type HrProps = z.infer<typeof HrPropsSchema>;

/**
 * Hr component - Horizontal rule with email-safe defaults
 */
export function renderHr(props: HrProps): string {
  const { color, style = {} } = props;
  
  const finalStyle: Record<string, string | number> = {
    width: "100%",
    border: "none",
    borderTop: `1px solid ${color || "#eaeaea"}`,
    ...style,
  };
  
  const styleAttr = ` style="${styleToString(finalStyle)}"`;
  
  return `<hr${styleAttr} />`;
}
