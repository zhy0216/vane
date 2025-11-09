import { MarkdownPropsSchema, type MarkdownProps } from "./schema";

/**
 * Note: Full implementation requires 'marked' library for markdown parsing.
 * This is a simplified version that handles basic markdown.
 * 
 * For production use:
 * 1. Install marked: npm install marked @types/marked
 * 2. Import: import { marked, Renderer } from 'marked';
 * 3. Customize renderer for email-safe HTML output
 */

/**
 * Default styles for markdown elements
 */
const defaultStyles = {
  h1: { fontSize: '2.5rem', fontWeight: '500', paddingTop: '20px' },
  h2: { fontSize: '2rem', fontWeight: '500', paddingTop: '20px' },
  h3: { fontSize: '1.75rem', fontWeight: '500', paddingTop: '20px' },
  h4: { fontSize: '1.5rem', fontWeight: '500', paddingTop: '20px' },
  h5: { fontSize: '1.25rem', fontWeight: '500', paddingTop: '20px' },
  h6: { fontSize: '1rem', fontWeight: '500', paddingTop: '20px' },
  bold: { fontWeight: 'bold' },
  italic: { fontStyle: 'italic' },
  blockQuote: { 
    background: '#f9f9f9', 
    borderLeft: '10px solid #ccc', 
    margin: '1.5em 10px', 
    padding: '1em 10px' 
  },
  codeInline: {
    color: '#212529',
    fontSize: '87.5%',
    display: 'inline',
    background: '#f8f8f8',
    fontFamily: 'SFMono-Regular,Menlo,Monaco,Consolas,monospace',
    wordWrap: 'break-word',
  },
  codeBlock: {
    color: '#212529',
    fontSize: '87.5%',
    display: 'block',
    paddingTop: '10px',
    paddingRight: '10px',
    paddingLeft: '10px',
    paddingBottom: '1px',
    marginBottom: '20px',
    background: '#f8f8f8',
    fontFamily: 'SFMono-Regular,Menlo,Monaco,Consolas,monospace',
    wordWrap: 'break-word',
  },
  link: { 
    color: '#007bff', 
    textDecoration: 'underline', 
    backgroundColor: 'transparent' 
  },
  ul: {
    paddingLeft: '20px',
    marginTop: '10px',
    marginBottom: '10px',
  },
  ol: {
    paddingLeft: '20px',
    marginTop: '10px',
    marginBottom: '10px',
  },
  li: {
    marginBottom: '5px',
  },
};

/**
 * Convert CSS object to inline style string
 */
function cssToInline(css: Record<string, any>): string {
  return Object.entries(css)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      const cssValue = typeof value === 'number' && 
        !['opacity', 'z-index', 'font-weight', 'line-height'].includes(cssKey)
        ? `${value}px`
        : value;
      return `${cssKey}:${cssValue}`;
    })
    .join(';');
}

/**
 * Basic markdown to HTML converter
 * This is a simplified implementation. For production, use the 'marked' library.
 */
function simpleMarkdownToHtml(markdown: string, styles: typeof defaultStyles): string {
  let html = markdown;

  // Headers (process h3 first to avoid conflicts)
  html = html.replace(/^### (.*$)/gim, (match, content) => 
    `<h3 style="${cssToInline(styles.h3)}">${content}</h3>`);
  html = html.replace(/^## (.*$)/gim, (match, content) => 
    `<h2 style="${cssToInline(styles.h2)}">${content}</h2>`);
  html = html.replace(/^# (.*$)/gim, (match, content) => 
    `<h1 style="${cssToInline(styles.h1)}">${content}</h1>`);

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, (match, content) => 
    `<strong style="${cssToInline(styles.bold)}">${content}</strong>`);
  
  // Italic
  html = html.replace(/\*(.*?)\*/g, (match, content) => 
    `<em style="${cssToInline(styles.italic)}">${content}</em>`);

  // Code blocks
  html = html.replace(/```[\s\S]*?```/g, (match) => {
    const code = match.slice(3, -3).trim();
    return `<pre style="${cssToInline(styles.codeBlock)}"><code>${code}</code></pre>`;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, (match, content) => 
    `<code style="${cssToInline(styles.codeInline)}">${content}</code>`);

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => 
    `<a href="${url}" target="_blank" style="${cssToInline(styles.link)}">${text}</a>`);

  // Ordered lists
  html = html.replace(/(?:^\d+\.\s+.+$\n?)+/gim, (match) => {
    const items = match.trim().split('\n').map(line => {
      const content = line.replace(/^\d+\.\s+/, '');
      return `<li style="${cssToInline(styles.li)}">${content}</li>`;
    }).join('');
    return `<ol style="${cssToInline(styles.ol)}">${items}</ol>`;
  });

  // Unordered lists
  html = html.replace(/(?:^[-*+]\s+.+$\n?)+/gim, (match) => {
    const items = match.trim().split('\n').map(line => {
      const content = line.replace(/^[-*+]\s+/, '');
      return `<li style="${cssToInline(styles.li)}">${content}</li>`;
    }).join('');
    return `<ul style="${cssToInline(styles.ul)}">${items}</ul>`;
  });

  // Line breaks
  html = html.replace(/\n\n/g, '</p><p>');
  html = html.replace(/\n/g, '<br />');

  // Wrap in paragraph if not already wrapped
  if (!html.startsWith('<')) {
    html = `<p>${html}</p>`;
  }

  return html;
}

/**
 * Markdown component - Converts markdown to HTML
 * Simplified version - for production use 'marked' library
 */
export function renderMarkdown(props: MarkdownProps): string {
  const { children, markdownCustomStyles = {}, markdownContainerStyles = {} } = props;

  const finalStyles = { ...defaultStyles, ...markdownCustomStyles };
  const html = simpleMarkdownToHtml(children, finalStyles);

  const containerStyleAttr = Object.keys(markdownContainerStyles).length > 0
    ? ` style="${cssToInline(markdownContainerStyles)}"`
    : '';

  return `<div data-id="react-email-markdown"${containerStyleAttr}>${html}</div>`;
}
