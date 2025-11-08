import { FontPropsSchema, type FontProps } from "./schema";

/**
 * Font component - Defines font-face and applies it globally
 * Must be placed inside <head> tag
 */
export function renderFont(props: FontProps): string {
  const { 
    fontFamily, 
    fallbackFontFamily, 
    webFont, 
    fontStyle = "normal", 
    fontWeight = 400 
  } = props;

  const src = webFont
    ? `src: url(${webFont.url}) format('${webFont.format}');`
    : '';

  const fallbackFontStr = Array.isArray(fallbackFontFamily)
    ? fallbackFontFamily.join(', ')
    : fallbackFontFamily;

  const msoFontAlt = Array.isArray(fallbackFontFamily)
    ? fallbackFontFamily[0]
    : fallbackFontFamily;

  const styleContent = `
    @font-face {
      font-family: '${fontFamily}';
      font-style: ${fontStyle};
      font-weight: ${fontWeight};
      mso-font-alt: '${msoFontAlt}';
      ${src}
    }

    * {
      font-family: '${fontFamily}', ${fallbackFontStr};
    }
  `;

  return `<style>${styleContent}</style>`;
}
