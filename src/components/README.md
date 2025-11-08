# Email Components

This directory contains 18 email components ported from React Email packages to server-side HTML string generators. These components generate email-safe HTML that works across all major email clients.

## Components List

### Structure Components

1. **Html** - Root HTML element with lang and dir attributes
2. **Head** - HTML head with essential meta tags for email
3. **Body** - Email body with table wrapper for client compatibility

### Layout Components

4. **Container** - Centered table with max-width (37.5em) for email layout
5. **Section** - Table-based section wrapper for email layout
6. **Row** - Table row wrapper for column layouts
7. **Column** - Table cell for column layouts

### Content Components

8. **Text** - Paragraph with default margins and styling
9. **Heading** - H1-H6 headings with margin shortcuts (m, mx, my, mt, mr, mb, ml)
10. **Link** - Anchor tag with email-safe defaults (color: #067df7)
11. **Button** - Link styled as button with MSO padding support for Outlook
12. **Img** - Image with email-safe defaults (display: block, no border)
13. **Hr** - Horizontal rule with default styling

### Special Components

14. **Preview** - Email preview text (hidden in email body, shown in inbox)
15. **Font** - Font-face definition with web fonts (must be in <head>)
16. **CodeInline** - Inline code with Orange.fr email client workaround
17. **CodeBlock** - Syntax-highlighted code blocks (simplified version)
18. **Markdown** - Markdown to HTML converter (simplified version)

## Usage Examples

### Basic Email Structure

```typescript
import { 
  renderHtml, 
  renderHead, 
  renderBody, 
  renderContainer,
  renderText 
} from "./components";

const email = renderHtml({
  children: renderHead({
    children: '<title>Welcome Email</title>'
  }) + renderBody({
    children: renderContainer({
      children: renderText({
        content: 'Hello World!',
        fontSize: '16px',
        color: '#333'
      })
    })
  })
});
```

### Layout with Rows and Columns

```typescript
import { renderRow, renderColumn, renderText } from "./components";

const layout = renderRow({
  children: 
    renderColumn({
      children: renderText({ content: 'Left column' }),
      style: { width: '50%' }
    }) +
    renderColumn({
      children: renderText({ content: 'Right column' }),
      style: { width: '50%' }
    })
});
```

### Button Component

```typescript
import { renderButton } from "./components";

const button = renderButton({
  href: 'https://example.com',
  children: 'Click Me',
  style: {
    backgroundColor: '#007bff',
    color: '#ffffff',
    padding: '12px 20px',
    borderRadius: '4px'
  }
});
```

### Heading with Margin Shortcuts

```typescript
import { renderHeading } from "./components";

const heading = renderHeading({
  as: 'h1',
  children: 'Welcome!',
  mt: 20,  // marginTop: 20px
  mb: 16,  // marginBottom: 16px
  style: { color: '#333' }
});
```

### Preview Text

```typescript
import { renderPreview } from "./components";

const preview = renderPreview({
  children: 'This text appears in the inbox preview'
});
```

### Custom Fonts

```typescript
import { renderFont } from "./components";

// Place inside <head>
const font = renderFont({
  fontFamily: 'Inter',
  fallbackFontFamily: ['Arial', 'sans-serif'],
  webFont: {
    url: 'https://fonts.googleapis.com/css2?family=Inter',
    format: 'woff2'
  }
});
```

### Image

```typescript
import { renderImg } from "./components";

const image = renderImg({
  src: 'https://example.com/image.jpg',
  alt: 'Example image',
  width: '600',
  height: '400'
});
```

### Markdown (Simplified)

```typescript
import { renderMarkdown } from "./components";

const markdown = renderMarkdown({
  children: `
# Hello World

This is **bold** and this is *italic*.

[Click here](https://example.com)
  `
});
```

## Component Features

### Email Client Compatibility

All components are designed to work across major email clients:

- **Gmail** (Desktop, Mobile, iOS app)
- **Outlook** (2007-2021, 365, Mac, iOS, Android)
- **Apple Mail** (macOS, iOS)
- **Yahoo Mail**
- **AOL Mail**
- **Thunderbird**

### MSO Conditional Comments

The Button component includes MSO (Microsoft Office) conditional comments for proper padding in Outlook:

```html
<!--[if mso]><i style="...">...</i><![endif]-->
```

### Table-based Layouts

Section, Row, Column, and Container components use table-based layouts for maximum email client compatibility.

### Inline Styles

All components use inline styles (required for email) rather than CSS classes.

## Implementation Notes

### CodeBlock and Markdown

The `CodeBlock` and `Markdown` components are simplified versions:

- **CodeBlock**: Basic implementation without Prism syntax highlighting
- **Markdown**: Simple regex-based parser instead of 'marked' library

For production use with full features:

1. **CodeBlock**: Install `prismjs`
2. **Markdown**: Install `marked`

See component files for detailed implementation notes.

### Type Safety

All components use Zod schemas for runtime validation:

```typescript
const result = TextPropsSchema.parse({
  content: 'Hello',
  fontSize: '16px'
});
```

## Comparison with React Email

| React Email | Vane Components |
|-------------|-----------------|
| JSX Components | HTML String Functions |
| React.forwardRef | Direct HTML generation |
| Props validation via TypeScript | Zod schemas |
| Runtime rendering | Build-time generation |

## Best Practices

1. **Always use Container**: Wrap content in `Container` for proper centering and max-width
2. **Inline styles**: Always use the `style` prop rather than CSS classes
3. **Test across clients**: Use tools like Litmus or Email on Acid
4. **Keep it simple**: Avoid complex layouts that may break in older clients
5. **Use tables for layout**: Email clients don't support flexbox/grid reliably
6. **Optimize images**: Compress and use absolute URLs
7. **Preview text**: Always include a `Preview` component for inbox preview

## Related Files

- `utils.ts` - Shared utility functions (escapeHtml, styleToString, etc.)
- `text.ts` - Original text component (preserved)
- `index.ts` - Central export file
