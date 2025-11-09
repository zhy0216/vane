import { type TextProps } from "./schema";

// Text 组件的 props

/**
 * Text 组件 - 渲染文本内容
 * 生成兼容邮件客户端的 HTML
 */
export function renderText(
  props: Omit<TextProps, 'children'> & {children: string}
): string {
  const {
    children,
    color = "#000000",
    fontSize = "14px",
    fontWeight = "normal",
    align = "left",
    lineHeight = "24px",
    marginTop = "16px",
    marginBottom = "16px",
    marginLeft,
    marginRight,
    backgroundColor,
    padding,
  } = props;

  // children is already rendered HTML by the renderer
  const text = children || "";

  // 内联样式，确保邮件客户端兼容性
  const styles: string[] = [
    `color: ${color}`,
    `font-size: ${fontSize}`,
    `font-weight: ${fontWeight}`,
    `text-align: ${align}`,
    `line-height: ${lineHeight}`,
    `margin: 0`,
    `padding: 0`,
    `margin-top: ${marginTop}`,
    `margin-bottom: ${marginBottom}`,
  ];

  if (marginLeft) styles.push(`margin-left: ${marginLeft}`);
  if (marginRight) styles.push(`margin-right: ${marginRight}`);
  if (backgroundColor) styles.push(`background-color: ${backgroundColor}`);
  if (padding) {
    // Override the default padding: 0 if padding is provided
    const paddingIndex = styles.indexOf('padding: 0');
    if (paddingIndex !== -1) {
      styles[paddingIndex] = `padding: ${padding}`;
    } else {
      styles.push(`padding: ${padding}`);
    }
  }

  // 使用 <p> 标签包裹文本
  // text is already escaped/rendered in the processing above
  return `<p style="${styles.join("; ")}">${text}</p>`;
}

