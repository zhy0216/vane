import { styleToString } from "./utils";
import { CodeInlinePropsSchema, type CodeInlineProps } from "./schema";

/**
 * CodeInline component - Inline code with Orange.fr email client workaround
 * Renders both <code> and <span> elements with conditional display
 */
export function renderCodeInline(props: CodeInlineProps): string {
  const { children, className = "", style = {} } = props;
  
  const styleAttr = Object.keys(style).length > 0 
    ? ` style="${styleToString(style as Record<string, string | number>)}"` 
    : "";
  
  const classAttr = className ? `${className} ` : "";

  // Style tag for Orange.fr email client compatibility
  const orangeFixStyle = `<style>
    meta ~ .cino {
      display: none !important;
      opacity: 0 !important;
    }

    meta ~ .cio {
      display: block !important;
    }
  </style>`;

  // Render both code and span elements
  const codeElement = `<code class="${classAttr}cino"${styleAttr}>${children}</code>`;
  const spanElement = `<span class="${classAttr}cio" style="display: none${style ? '; ' + styleToString(style as Record<string, string | number>) : ''}"${styleAttr}>${children}</span>`;

  return `${orangeFixStyle}${codeElement}${spanElement}`;
}
