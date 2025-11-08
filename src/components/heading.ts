import { z } from "zod";
import { styleToString } from "./utils";

export const HeadingPropsSchema = z.object({
  as: z.enum(["h1", "h2", "h3", "h4", "h5", "h6"]).optional(),
  level: z.number().optional(),
  content: z.string().optional(),
  children: z.string().optional(),
  color: z.string().optional(),
  fontSize: z.string().optional(),
  fontWeight: z.string().optional(),
  marginBottom: z.string().optional(),
  m: z.union([z.string(), z.number()]).optional(),
  mx: z.union([z.string(), z.number()]).optional(),
  my: z.union([z.string(), z.number()]).optional(),
  mt: z.union([z.string(), z.number()]).optional(),
  mr: z.union([z.string(), z.number()]).optional(),
  mb: z.union([z.string(), z.number()]).optional(),
  ml: z.union([z.string(), z.number()]).optional(),
  style: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
});

export type HeadingProps = z.infer<typeof HeadingPropsSchema>;

/**
 * Convert margin shorthand to CSS properties
 */
function withMargin(props: {
  m?: string | number;
  mx?: string | number;
  my?: string | number;
  mt?: string | number;
  mr?: string | number;
  mb?: string | number;
  ml?: string | number;
}): Record<string, string> {
  const result: Record<string, string> = {};

  const addMargin = (value: string | number | undefined, properties: string[]) => {
    if (value === undefined) return;
    
    const numValue = parseFloat(String(value));
    if (isNaN(numValue)) return;
    
    for (const prop of properties) {
      result[prop] = `${numValue}px`;
    }
  };

  addMargin(props.m, ['margin']);
  addMargin(props.mx, ['marginLeft', 'marginRight']);
  addMargin(props.my, ['marginTop', 'marginBottom']);
  addMargin(props.mt, ['marginTop']);
  addMargin(props.mr, ['marginRight']);
  addMargin(props.mb, ['marginBottom']);
  addMargin(props.ml, ['marginLeft']);

  return result;
}

/**
 * Heading component - H1-H6 with margin shortcuts
 */
export function renderHeading(props: HeadingProps): string {
  const { 
    as, 
    level, 
    content, 
    children, 
    color,
    fontSize,
    fontWeight,
    marginBottom,
    m, 
    mx, 
    my, 
    mt, 
    mr, 
    mb, 
    ml, 
    style = {} 
  } = props;
  
  // Determine the heading tag
  const tag = as || (level ? `h${level}` : "h1");
  const text = content || children || "";
  
  const margins = withMargin({ m, mx, my, mt, mr, mb, ml });
  const finalStyle: Record<string, string | number> = {
    ...margins,
    ...style,
  };
  
  if (color) finalStyle.color = color;
  if (fontSize) finalStyle.fontSize = fontSize;
  if (fontWeight) finalStyle.fontWeight = fontWeight;
  if (marginBottom) finalStyle.marginBottom = marginBottom;
  
  const styleAttr = Object.keys(finalStyle).length > 0 
    ? ` style="${styleToString(finalStyle)}"` 
    : "";
  
  return `<${tag}${styleAttr}>${text}</${tag}>`;
}
