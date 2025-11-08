import { styleToString } from "./utils";
import { HrPropsSchema, type HrProps } from "./schema";

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
