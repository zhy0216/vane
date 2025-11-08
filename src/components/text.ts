import { z } from "zod";

// Text 组件的 props
export const TextPropsSchema = z.object({
  content: z.string(),
  color: z.string().optional(),
  fontSize: z.string().optional(),
  fontWeight: z.string().optional(),
  align: z.enum(["left", "center", "right"]).optional(),
  lineHeight: z.string().optional(),
});

export type TextProps = z.infer<typeof TextPropsSchema>;

/**
 * Text 组件 - 渲染文本内容
 * 生成兼容邮件客户端的 HTML
 */
export function renderText(props: TextProps): string {
  const {
    content,
    color = "#000000",
    fontSize = "14px",
    fontWeight = "normal",
    align = "left",
    lineHeight = "1.5",
  } = props;

  // 内联样式，确保邮件客户端兼容性
  const styles = [
    `color: ${color}`,
    `font-size: ${fontSize}`,
    `font-weight: ${fontWeight}`,
    `text-align: ${align}`,
    `line-height: ${lineHeight}`,
    `margin: 0`,
    `padding: 0`,
  ].join("; ");

  // 使用 <p> 标签包裹文本
  return `<p style="${styles}">${escapeHtml(content)}</p>`;
}

/**
 * 转义 HTML 特殊字符，防止 XSS
 */
function escapeHtml(text: string): string {
  const htmlEscapeMap: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };

  return text.replace(/[&<>"']/g, (char) => htmlEscapeMap[char]);
}
