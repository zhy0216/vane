import { escapeHtml } from "./utils";
import { PreviewPropsSchema, type PreviewProps } from "./schema";

const PREVIEW_MAX_LENGTH = 150;
const whiteSpaceCodes = '\xa0\u200C\u200B\u200D\u200E\u200F\uFEFF';

/**
 * Preview component - Email preview text (hidden from email body, shown in inbox)
 */
export function renderPreview(props: PreviewProps): string {
  const { children } = props;
  
  const text = (Array.isArray(children) ? children.join('') : children)
    .substring(0, PREVIEW_MAX_LENGTH);
  
  const whiteSpace = text.length >= PREVIEW_MAX_LENGTH 
    ? '' 
    : whiteSpaceCodes.repeat(PREVIEW_MAX_LENGTH - text.length);
  
  return `<div style="display: none; overflow: hidden; line-height: 1px; opacity: 0; max-height: 0; max-width: 0" data-skip-in-text="true">${escapeHtml(text)}${whiteSpace ? `<div>${whiteSpace}</div>` : ''}</div>`;
}
