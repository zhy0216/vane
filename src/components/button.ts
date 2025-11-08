import { styleToString, escapeHtml, parsePadding, pxToPt } from "./utils";
import { ButtonPropsSchema, type ButtonProps } from "./schema";

/**
 * Compute font width and space count for MSO padding workaround
 */
function computeFontWidthAndSpaceCount(expectedWidth: number): [number, number] {
  if (expectedWidth === 0) return [0, 0];

  let smallestSpaceCount = 0;
  const maxFontWidth = 5;

  const computeRequiredFontWidth = () => {
    if (smallestSpaceCount > 0) {
      return expectedWidth / smallestSpaceCount / 2;
    }
    return Number.POSITIVE_INFINITY;
  };

  while (computeRequiredFontWidth() > maxFontWidth) {
    smallestSpaceCount++;
  }

  return [computeRequiredFontWidth(), smallestSpaceCount];
}

/**
 * Button component - Link styled as button with MSO padding support
 * Uses MSO conditional comments for Outlook compatibility
 */
export function renderButton(props: ButtonProps): string {
  const { href, children, target = "_blank", style = {} } = props;
  
  // Parse padding values from style object
  const { paddingTop, paddingRight, paddingBottom, paddingLeft } = parsePadding(style);

  const y = (paddingTop ?? 0) + (paddingBottom ?? 0);
  const textRaise = pxToPt(y);

  const [plFontWidth, plSpaceCount] = computeFontWidthAndSpaceCount(paddingLeft ?? 0);
  const [prFontWidth, prSpaceCount] = computeFontWidthAndSpaceCount(paddingRight ?? 0);

  const linkStyle = {
    lineHeight: "100%",
    textDecoration: "none",
    display: "inline-block",
    maxWidth: "100%",
    msoPaddingAlt: "0px",
    ...style,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
  };

  const innerSpanStyle = {
    maxWidth: "100%",
    display: "inline-block",
    lineHeight: "120%",
    msoPaddingAlt: "0px",
    msoTextRaise: pxToPt(paddingBottom),
  };

  const leftMso = `<!--[if mso]><i style="mso-font-width:${plFontWidth * 100}%;mso-text-raise:${textRaise}" hidden>${'&#8202;'.repeat(plSpaceCount)}</i><![endif]-->`;
  const rightMso = `<!--[if mso]><i style="mso-font-width:${prFontWidth * 100}%" hidden>${'&#8202;'.repeat(prSpaceCount)}&#8203;</i><![endif]-->`;

  return `<a href="${escapeHtml(href)}" target="${escapeHtml(target)}" style="${styleToString(linkStyle as Record<string, string | number>)}">
  <span>${leftMso}</span>
  <span style="${styleToString(innerSpanStyle as Record<string, string | number>)}">${escapeHtml(children)}</span>
  <span>${rightMso}</span>
</a>`;
}
