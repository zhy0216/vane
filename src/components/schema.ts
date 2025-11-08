import { z } from "zod";
import { ComponentSchema } from "../types";

// Font-related schemas
const FallbackFontSchema = z.enum([
  "Arial", "Helvetica", "Verdana", "Georgia", "Times New Roman",
  "serif", "sans-serif", "monospace", "cursive", "fantasy"
]);

const FontFormatSchema = z.enum([
  "woff", "woff2", "truetype", "opentype", "embedded-opentype", "svg"
]);

// Body component schema
export const BodyPropsSchema = z.object({
  children: z.string()
    .describe("The HTML content to be rendered inside the body"),
  style: z.record(z.string(), z.union([z.string(), z.number()]))
    .optional()
    .describe("CSS styles to apply to the body element"),
});

// Button component schema
export const ButtonPropsSchema = z.object({
  href: z.string()
    .describe("The URL the button links to"),
  children: z.string()
    .describe("The text content displayed on the button"),
  target: z.string()
    .optional()
    .describe("Specifies where to open the linked document (e.g., '_blank', '_self')"),
  style: z.record(z.string(), z.union([z.string(), z.number()]))
    .optional()
    .describe("CSS styles to apply to the button"),
});

// CodeBlock component schema
export const CodeBlockPropsSchema = z.object({
  code: z.string()
    .describe("The code content to be displayed"),
  language: z.string()
    .optional()
    .describe("The programming language for syntax highlighting"),
  lineNumbers: z.boolean()
    .optional()
    .describe("Whether to display line numbers"),
  fontFamily: z.string()
    .optional()
    .describe("The font family to use for the code"),
  theme: z.record(z.string(), z.any())
    .optional()
    .describe("Custom theme configuration for syntax highlighting"),
  style: z.record(z.string(), z.union([z.string(), z.number()]))
    .optional()
    .describe("Additional CSS styles to apply to the code block"),
});

// CodeInline component schema
export const CodeInlinePropsSchema = z.object({
  children: z.string()
    .describe("The inline code content to display"),
  className: z.string()
    .optional()
    .describe("CSS class names to apply to the inline code"),
  style: z.record(z.string(), z.union([z.string(), z.number()]))
    .optional()
    .describe("CSS styles to apply to the inline code"),
});

// Column component schema
export const ColumnPropsSchema = z.object({
  children: z.string()
    .describe("The HTML content to be rendered inside the column"),
  style: z.record(z.string(), z.union([z.string(), z.number()]))
    .optional()
    .describe("CSS styles to apply to the column"),
});

// Container component schema
export const ContainerPropsSchema = z.object({
  children: z.string()
    .describe("The HTML content to be rendered inside the container"),
  backgroundColor: z.string()
    .optional()
    .describe("The background color of the container"),
  padding: z.string()
    .optional()
    .describe("Padding value for the container (e.g., '20px', '1em')"),
  style: z.record(z.string(), z.union([z.string(), z.number()]))
    .optional()
    .describe("Additional CSS styles to apply to the container"),
});

// Font component schema
export const FontPropsSchema = z.object({
  fontFamily: z.string()
    .describe("The name of the font family to define"),
  fallbackFontFamily: z.union([FallbackFontSchema, z.array(FallbackFontSchema)])
    .describe("Fallback font(s) to use if the custom font fails to load"),
  webFont: z.object({
    url: z.string()
      .describe("URL to the web font file"),
    format: FontFormatSchema
      .describe("The format of the web font file"),
  })
    .optional()
    .describe("Web font configuration for loading custom fonts"),
  fontStyle: z.string()
    .optional()
    .describe("The font style (e.g., 'normal', 'italic')"),
  fontWeight: z.union([z.string(), z.number()])
    .optional()
    .describe("The font weight (e.g., '400', 'bold', 700)"),
});

// Head component schema
export const HeadPropsSchema = z.object({
  children: z.string()
    .optional()
    .describe("Additional HTML content to include in the head section"),
});

// Heading component schema
export const HeadingPropsSchema = z.object({
  as: z.enum(["h1", "h2", "h3", "h4", "h5", "h6"])
    .optional()
    .describe("The HTML heading tag to use"),
  level: z.number()
    .optional()
    .describe("The heading level (1-6), alternative to 'as' prop"),
  content: z.string()
    .optional()
    .describe("The text content of the heading"),
  children: z.string()
    .optional()
    .describe("The text content of the heading (alternative to 'content')"),
  color: z.string()
    .optional()
    .describe("The text color of the heading"),
  fontSize: z.string()
    .optional()
    .describe("The font size of the heading"),
  fontWeight: z.string()
    .optional()
    .describe("The font weight of the heading"),
  marginBottom: z.string()
    .optional()
    .describe("The bottom margin of the heading"),
  m: z.union([z.string(), z.number()])
    .optional()
    .describe("Shorthand for all margins"),
  mx: z.union([z.string(), z.number()])
    .optional()
    .describe("Shorthand for horizontal margins (left and right)"),
  my: z.union([z.string(), z.number()])
    .optional()
    .describe("Shorthand for vertical margins (top and bottom)"),
  mt: z.union([z.string(), z.number()])
    .optional()
    .describe("Top margin"),
  mr: z.union([z.string(), z.number()])
    .optional()
    .describe("Right margin"),
  mb: z.union([z.string(), z.number()])
    .optional()
    .describe("Bottom margin"),
  ml: z.union([z.string(), z.number()])
    .optional()
    .describe("Left margin"),
  style: z.record(z.string(), z.union([z.string(), z.number()]))
    .optional()
    .describe("Additional CSS styles to apply to the heading"),
});

// Hr component schema
export const HrPropsSchema = z.object({
  color: z.string()
    .optional()
    .describe("The color of the horizontal rule"),
  style: z.record(z.string(), z.union([z.string(), z.number()]))
    .optional()
    .describe("CSS styles to apply to the horizontal rule"),
});

// Html component schema
export const HtmlPropsSchema = z.object({
  children: z.string()
    .describe("The HTML content to be rendered"),
  lang: z.string()
    .optional()
    .describe("The language code for the HTML document (e.g., 'en', 'zh')"),
  dir: z.enum(["ltr", "rtl"])
    .optional()
    .describe("The text direction of the document"),
  style: z.record(z.string(), z.union([z.string(), z.number()]))
    .optional()
    .describe("CSS styles to apply to the html element"),
});

// Img component schema
export const ImgPropsSchema = z.object({
  src: z.string()
    .describe("The URL of the image"),
  alt: z.string()
    .describe("Alternative text for the image"),
  width: z.union([z.string(), z.number()])
    .optional()
    .describe("The width of the image"),
  height: z.union([z.string(), z.number()])
    .optional()
    .describe("The height of the image"),
  style: z.record(z.string(), z.union([z.string(), z.number()]))
    .optional()
    .describe("CSS styles to apply to the image"),
});

// Link component schema
export const LinkPropsSchema = z.object({
  href: z.string()
    .describe("The URL the link points to"),
  children: z.union([
    z.string(),
    z.array(z.union([z.string(), ComponentSchema]))
  ])
    .optional()
    .describe("The content displayed as the link text"),
  target: z.string()
    .optional()
    .describe("Specifies where to open the linked document"),
  style: z.record(z.string(), z.union([z.string(), z.number()]))
    .optional()
    .describe("CSS styles to apply to the link"),
});

// Markdown component schema
export const MarkdownPropsSchema = z.object({
  children: z.string()
    .describe("The markdown content to be converted to HTML"),
  markdownCustomStyles: z.record(z.string(), z.any())
    .optional()
    .describe("Custom styles for markdown elements"),
  markdownContainerStyles: z.record(z.string(), z.union([z.string(), z.number()]))
    .optional()
    .describe("CSS styles to apply to the markdown container"),
});

// Preview component schema
export const PreviewPropsSchema = z.object({
  children: z.union([z.string(), z.array(z.string())])
    .describe("The preview text shown in email inbox (hidden from email body)"),
});

// Row component schema
export const RowPropsSchema = z.object({
  children: z.string()
    .describe("The HTML content to be rendered inside the row"),
  style: z.record(z.string(), z.union([z.string(), z.number()]))
    .optional()
    .describe("CSS styles to apply to the row"),
});

// Section component schema
export const SectionPropsSchema = z.object({
  children: z.string()
    .describe("The HTML content to be rendered inside the section"),
  backgroundColor: z.string()
    .optional()
    .describe("The background color of the section"),
  padding: z.string()
    .optional()
    .describe("Padding value for the section"),
  textAlign: z.string()
    .optional()
    .describe("Text alignment within the section"),
  style: z.record(z.string(), z.union([z.string(), z.number()]))
    .optional()
    .describe("Additional CSS styles to apply to the section"),
});

// Text component schema
export const TextPropsSchema = z.object({
  children: z.union([
    z.string(),
    z.array(z.union([z.string(), ComponentSchema]))
  ])
    .optional()
    .describe("The text content or components to render"),
  color: z.string()
    .optional()
    .describe("The text color"),
  fontSize: z.string()
    .optional()
    .describe("The font size"),
  fontWeight: z.string()
    .optional()
    .describe("The font weight"),
  align: z.enum(["left", "center", "right"])
    .optional()
    .describe("Text alignment"),
  lineHeight: z.string()
    .optional()
    .describe("Line height of the text"),
  marginTop: z.string()
    .optional()
    .describe("Top margin"),
  marginBottom: z.string()
    .optional()
    .describe("Bottom margin"),
  marginLeft: z.string()
    .optional()
    .describe("Left margin"),
  marginRight: z.string()
    .optional()
    .describe("Right margin"),
});

// Export type inferences
export type BodyProps = z.infer<typeof BodyPropsSchema>;
export type ButtonProps = z.infer<typeof ButtonPropsSchema>;
export type CodeBlockProps = z.infer<typeof CodeBlockPropsSchema>;
export type CodeInlineProps = z.infer<typeof CodeInlinePropsSchema>;
export type ColumnProps = z.infer<typeof ColumnPropsSchema>;
export type ContainerProps = z.infer<typeof ContainerPropsSchema>;
export type FontProps = z.infer<typeof FontPropsSchema>;
export type HeadProps = z.infer<typeof HeadPropsSchema>;
export type HeadingProps = z.infer<typeof HeadingPropsSchema>;
export type HrProps = z.infer<typeof HrPropsSchema>;
export type HtmlProps = z.infer<typeof HtmlPropsSchema>;
export type ImgProps = z.infer<typeof ImgPropsSchema>;
export type LinkProps = z.infer<typeof LinkPropsSchema>;
export type MarkdownProps = z.infer<typeof MarkdownPropsSchema>;
export type PreviewProps = z.infer<typeof PreviewPropsSchema>;
export type RowProps = z.infer<typeof RowPropsSchema>;
export type SectionProps = z.infer<typeof SectionPropsSchema>;
export type TextProps = z.infer<typeof TextPropsSchema>;
