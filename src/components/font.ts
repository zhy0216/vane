import { z } from "zod";

const FallbackFontSchema = z.enum([
  "Arial", "Helvetica", "Verdana", "Georgia", "Times New Roman",
  "serif", "sans-serif", "monospace", "cursive", "fantasy"
]);

const FontFormatSchema = z.enum([
  "woff", "woff2", "truetype", "opentype", "embedded-opentype", "svg"
]);

export const FontPropsSchema = z.object({
  fontFamily: z.string(),
  fallbackFontFamily: z.union([FallbackFontSchema, z.array(FallbackFontSchema)]),
  webFont: z.object({
    url: z.string(),
    format: FontFormatSchema,
  }).optional(),
  fontStyle: z.string().optional(),
  fontWeight: z.union([z.string(), z.number()]).optional(),
});

export type FontProps = z.infer<typeof FontPropsSchema>;

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
