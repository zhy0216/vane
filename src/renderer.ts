import { Component } from "./types";
import { renderText, TextPropsSchema } from "./components/text";
import { renderContainer, ContainerPropsSchema } from "./components/container";
import { renderSection, SectionPropsSchema } from "./components/section";
import { renderHeading, HeadingPropsSchema } from "./components/heading";
import { renderImg, ImgPropsSchema } from "./components/img";
import { renderHr, HrPropsSchema } from "./components/hr";
import { renderLink, LinkPropsSchema } from "./components/link";
import { renderButton, ButtonPropsSchema } from "./components/button";
import { renderRow, RowPropsSchema } from "./components/row";
import { renderColumn, ColumnPropsSchema } from "./components/column";

/**
 * 组件渲染器映射表
 */
const componentRenderers: Record<
  string,
  (props: any, children?: Component[]) => string
> = {
  text: (props, children) => {
    const validatedProps = TextPropsSchema.parse(props);
    return renderText(validatedProps, renderComponent);
  },
  container: (props, children) => {
    const childrenHtml = children?.map(renderComponent).join("") || "";
    const validatedProps = ContainerPropsSchema.parse({ ...props, children: childrenHtml });
    return renderContainer(validatedProps);
  },
  section: (props, children) => {
    const childrenHtml = children?.map(renderComponent).join("") || "";
    const validatedProps = SectionPropsSchema.parse({ ...props, children: childrenHtml });
    return renderSection(validatedProps);
  },
  heading: (props) => {
    const validatedProps = HeadingPropsSchema.parse(props);
    return renderHeading(validatedProps);
  },
  image: (props) => {
    const validatedProps = ImgPropsSchema.parse(props);
    return renderImg(validatedProps);
  },
  hr: (props) => {
    const validatedProps = HrPropsSchema.parse(props);
    return renderHr(validatedProps);
  },
  link: (props, children) => {
    const validatedProps = LinkPropsSchema.parse(props);
    return renderLink(validatedProps, renderComponent);
  },
  button: (props) => {
    const validatedProps = ButtonPropsSchema.parse(props);
    return renderButton(validatedProps);
  },
  row: (props, children) => {
    const childrenHtml = children?.map(renderComponent).join("") || "";
    const validatedProps = RowPropsSchema.parse({ ...props, children: childrenHtml });
    return renderRow(validatedProps);
  },
  column: (props, children) => {
    const childrenHtml = children?.map(renderComponent).join("") || "";
    const validatedProps = ColumnPropsSchema.parse({ ...props, children: childrenHtml });
    return renderColumn(validatedProps);
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
  const renderedChildren = children?.map((child) => renderComponent(child)) ?? [];

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
