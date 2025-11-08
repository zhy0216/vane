import { styleToString, escapeHtml } from "./utils";
import { CodeBlockPropsSchema, type CodeBlockProps } from "./schema";

/**
 * Note: Full implementation requires Prismjs library for syntax highlighting.
 * This is a simplified version that provides basic code block rendering.
 * 
 * For production use, consider:
 * 1. Installing prismjs: npm install prismjs @types/prismjs
 * 2. Importing required languages and themes
 * 3. Using Prism.tokenize() for syntax highlighting
 */

/**
 * Default theme for code blocks
 */
const defaultTheme = {
  base: {
    backgroundColor: '#f5f5f5',
    color: '#333',
    fontFamily: 'monospace',
    padding: '16px',
    borderRadius: '4px',
    overflow: 'auto',
  }
};

/**
 * CodeBlock component - Syntax-highlighted code blocks
 * Simplified version without Prism tokenization
 */
export function renderCodeBlock(props: CodeBlockProps): string {
  const { 
    code, 
    language = "javascript",
    lineNumbers = false, 
    fontFamily,
    theme = defaultTheme,
    style = {} 
  } = props;

  const lines = code.split(/\r\n|\r|\n/gm);
  
  const baseStyle = {
    ...theme.base,
    width: '100%',
    ...style,
  };

  const preStyle = styleToString(baseStyle as Record<string, string | number>);

  // Render lines with optional line numbers
  const codeLines = lines.map((line, index) => {
    const lineNumber = lineNumbers 
      ? `<span style="width: 2em; height: 1em; display: inline-block; font-family: ${fontFamily || 'monospace'}">${index + 1}</span>`
      : '';
    
    // Replace spaces with non-breaking space + zero-width characters to preserve formatting
    const formattedLine = line.replaceAll(' ', '\xa0\u200D\u200B');
    const lineContent = `<span style="font-family: ${fontFamily || 'monospace'}">${escapeHtml(formattedLine)}</span>`;
    
    return `${lineNumber}${lineContent}<br />`;
  }).join('\n');

  return `<pre style="${preStyle}"><code>${codeLines}</code></pre>`;
}
