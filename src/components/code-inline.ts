import { z } from "zod";
import { styleToString } from "./utils";

export const CodeInlinePropsSchema = z.object({
  children: z.string(),
  className: z.string().optional(),
  style: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
});

export type CodeInlineProps = z.infer<typeof CodeInlinePropsSchema>;

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
