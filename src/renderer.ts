import { Component } from "./types";
import { renderText, TextPropsSchema } from "./components/text";

/**
 * 组件渲染器映射表
 */
const componentRenderers: Record<
  string,
  (props: any, children?: Component[]) => string
> = {
  text: (props, children) => {
    const validatedProps = TextPropsSchema.parse(props);
    return renderText(validatedProps, children);
  },
};

/**
 * 渲染单个组件
 */
export function renderComponent(component: Component): string {
  const { type, props, children } = component;

  // 查找对应的渲染器
  const renderer = componentRenderers[type];
  if (!renderer) {
    throw new Error(`Unknown component type: ${type}`);
  }

  // 递归渲染子组件
  const renderedChildren = children?.map((child) => renderComponent(child));

  // 调用组件渲染器
  return renderer(props || {}, children);
}

/**
 * 生成完整的 Email HTML
 */
export function generateEmailHtml(
  component: Component,
  subject?: string
): string {
  const bodyContent = renderComponent(component);

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  ${subject ? `<title>${escapeHtml(subject)}</title>` : ""}
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f5f5f5;
    }
    table {
      border-spacing: 0;
      border-collapse: collapse;
    }
  </style>
</head>
<body>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #ffffff;">
          <tr>
            <td style="padding: 20px;">
              ${bodyContent}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * 转义 HTML 特殊字符
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
