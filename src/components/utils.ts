/**
 * Utility functions for email component rendering
 */

/**
 * Escape HTML special characters to prevent XSS
 */
export function escapeHtml(text: string): string {
  const htmlEscapeMap: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return text.replace(/[&<>"']/g, (char) => htmlEscapeMap[char]);
}

/**
 * Convert CSS-in-JS object to inline CSS string
 */
export function styleToString(styles: Record<string, string | number | undefined>): string {
  return Object.entries(styles)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      const cssValue = typeof value === 'number' && !key.match(/opacity|zIndex|fontWeight|lineHeight/i)
        ? `${value}px`
        : value;
      return `${cssKey}: ${cssValue}`;
    })
    .join('; ');
}

/**
 * Parse padding value from string or number (supports shorthand)
 */
function parsePaddingValue(padding: string | number | undefined): {
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
} {
  if (!padding) return {};
  
  if (typeof padding === 'number') {
    return {
      paddingTop: padding,
      paddingRight: padding,
      paddingBottom: padding,
      paddingLeft: padding,
    };
  }

  const values = padding.trim().split(/\s+/).map(v => {
    const match = /^([\d.]+)(px|em|rem|%)?$/.exec(v);
    if (!match) return 0;
    const num = parseFloat(match[1]);
    const unit = match[2];
    
    switch (unit) {
      case 'em':
      case 'rem':
        return num * 16;
      case '%':
        return (num / 100) * 600;
      default:
        return num;
    }
  });

  if (values.length === 1) {
    return {
      paddingTop: values[0],
      paddingRight: values[0],
      paddingBottom: values[0],
      paddingLeft: values[0],
    };
  } else if (values.length === 2) {
    return {
      paddingTop: values[0],
      paddingRight: values[1],
      paddingBottom: values[0],
      paddingLeft: values[1],
    };
  } else if (values.length === 3) {
    return {
      paddingTop: values[0],
      paddingRight: values[1],
      paddingBottom: values[2],
      paddingLeft: values[1],
    };
  } else if (values.length === 4) {
    return {
      paddingTop: values[0],
      paddingRight: values[1],
      paddingBottom: values[2],
      paddingLeft: values[3],
    };
  }

  return {};
}

/**
 * Parse padding from a style object
 * Handles both shorthand 'padding' and individual properties (paddingTop, paddingRight, etc.)
 */
export function parsePadding(style: Record<string, string | number | undefined>): {
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
} {
  // First, check for individual padding properties
  const extractValue = (val: string | number | undefined): number | undefined => {
    if (val === undefined) return undefined;
    if (typeof val === 'number') return val;
    
    const match = /^([\d.]+)(px|em|rem|%)?$/.exec(val.trim());
    if (!match) return undefined;
    
    const num = parseFloat(match[1]);
    const unit = match[2];
    
    switch (unit) {
      case 'em':
      case 'rem':
        return num * 16;
      case '%':
        return (num / 100) * 600;
      default:
        return num;
    }
  };

  // Start with individual properties if they exist
  const result: {
    paddingTop?: number;
    paddingRight?: number;
    paddingBottom?: number;
    paddingLeft?: number;
  } = {
    paddingTop: extractValue(style.paddingTop),
    paddingRight: extractValue(style.paddingRight),
    paddingBottom: extractValue(style.paddingBottom),
    paddingLeft: extractValue(style.paddingLeft),
  };

  // If 'padding' shorthand exists, parse it and fill in any gaps
  if (style.padding !== undefined) {
    const shorthand = parsePaddingValue(style.padding);
    result.paddingTop = result.paddingTop ?? shorthand.paddingTop;
    result.paddingRight = result.paddingRight ?? shorthand.paddingRight;
    result.paddingBottom = result.paddingBottom ?? shorthand.paddingBottom;
    result.paddingLeft = result.paddingLeft ?? shorthand.paddingLeft;
  }

  return result;
}

/**
 * Convert px to pt (for MSO)
 */
export function pxToPt(px: number | undefined): number | undefined {
  return typeof px === 'number' && !isNaN(px) ? (px * 3) / 4 : undefined;
}

/**
 * Merge attributes into HTML string
 */
export function mergeAttributes(attrs: Record<string, string | number | boolean | undefined>): string {
  return Object.entries(attrs)
    .filter(([_, value]) => value !== undefined && value !== false)
    .map(([key, value]) => {
      if (value === true) return key;
      return `${key}="${escapeHtml(String(value))}"`;
    })
    .join(' ');
}
