# Vane

**Van**illa **E**mail - A lightweight JSON-to-HTML email generator

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Bun](https://img.shields.io/badge/Bun-Runtime-orange.svg)](https://bun.sh/)
[![Zod](https://img.shields.io/badge/Zod-Schema-green.svg)](https://zod.dev/)

## Why Vane?

[react-email](https://react.email/) is a great project, but email doesn't need much reactivity. **Vane** takes a simpler approach: accept JSON, generate pure HTML directly. No React runtime, no JSX compilation, just fast and predictable email generation.

## Features

- 🚀 **Pure HTML Generation** - No React runtime overhead
- 📦 **JSON-based Templates** - Define emails as JSON structures
- 🔒 **Type-Safe** - Zod schemas + TypeScript for runtime validation
- 📧 **Email Client Compatible** - MSO conditional comments, table-based layouts, inline styles
- ⚡ **Fast** - Built with Bun for blazing-fast performance
- 🎨 **Demo Viewer** - Visual template browser included

## Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/zhy0216/vane.git
cd vane

# Install dependencies
bun i
```

### Run the Server

```bash
# Development mode (with hot reload)
bun run dev

# Production mode
bun run start
```

The service will start on `http://localhost:3000` (or the port specified in `PORT` environment variable).

## API Usage

### Generate Email HTML

**Endpoint:** `POST /generate`

**Request Body:**
```json
{
  "subject": "Welcome to Vane",
  "component": {
    "type": "container",
    "props": {
      "backgroundColor": "#ffffff",
      "padding": "20px"
    },
    "children": [
      {
        "type": "heading",
        "props": {
          "children": "Welcome!",
          "fontSize": "32px"
        }
      },
      {
        "type": "text",
        "props": {
          "children": "Thanks for trying Vane."
        }
      },
      {
        "type": "button",
        "props": {
          "href": "https://example.com",
          "children": "Get Started",
          "backgroundColor": "#007bff",
          "color": "#ffffff"
        }
      }
    ]
  }
}
```

**Response:**
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>Welcome to Vane</title>
  <!-- ... -->
</head>
<body>
  <!-- Rendered email HTML -->
</body>
</html>
```

### Health Check

**Endpoint:** `GET /health`

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-08T13:50:00.000Z"
}
```

## Available Components

Vane includes 18 components ported from React Email:

| Component | Description | Example Props |
|-----------|-------------|---------------|
| `container` | Centered container (max-width 37.5em) | `backgroundColor`, `padding` |
| `section` | Table-based section wrapper | `padding`, `textAlign` |
| `row` | Table row for column layouts | `style` |
| `column` | Table cell for responsive columns | `width`, `align` |
| `text` | Paragraph element | `fontSize`, `color`, `lineHeight` |
| `heading` | H1-H6 headings | `as`, `fontSize`, `fontWeight`, `mt`, `mb` |
| `button` | Email-safe button with MSO support | `href`, `backgroundColor`, `padding` |
| `link` | Anchor element | `href`, `color`, `textDecoration` |
| `image` | Optimized image element | `src`, `alt`, `width`, `height` |
| `hr` | Horizontal rule | `color`, `margin` |
| `html` | Root HTML element | `lang`, `dir` |
| `head` | HTML head with meta tags | - |
| `body` | Email body with table wrapper | `backgroundColor` |
| `preview` | Email preview text | `children` |
| `font` | Font-face definition | `fontFamily`, `src` |
| `code-inline` | Inline code with Orange.fr fix | `children` |
| `code-block` | Code blocks | `code`, `language` |
| `markdown` | Simplified markdown parser | `children` |


## Example Templates

Vane comes with 22 pre-built email templates in the `demo/jsons/` directory:

- **airbnb-review** - User review notification
- **amazon-review** - Product review request
- **apple-receipt** - Purchase receipt
- **github-access-token** - Security notification
- **linear-login-code** - Magic link login
- **slack-confirm** - Email confirmation
- **stripe-welcome** - Welcome email
- And 15 more...

## Demo Viewer

Start the demo viewer to browse all templates:

```bash
cd demo
bun run dev
```

Open your browser to preview all available templates with a side-by-side JSON view.

## Email Client Compatibility

Vane generates HTML that works across all major email clients:

- ✅ **Outlook** - MSO conditional comments for proper rendering
- ✅ **Gmail** - Table-based layouts for stability
- ✅ **Apple Mail** - Inline styles and semantic HTML
- ✅ **Yahoo/AOL** - Body conversion handling
- ✅ **Orange.fr** - Special code-inline workarounds

## Architecture

```
┌─────────────────┐
│   JSON Input    │
│  (Component)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Zod Validation │
│  (Type Safety)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Renderer      │
│  (Recursive)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Pure HTML     │
│   (Output)      │
└─────────────────┘
```

## Development

### Project Structure

```
vane/
├── src/
│   ├── components/      # 18 email components
│   ├── index.ts         # HTTP server
│   ├── renderer.ts      # Component renderer
│   └── types.ts         # Zod schemas
├── demo/
│   ├── jsons/          # Example templates
│   ├── static/         # Image assets
│   └── app.ts          # Demo viewer app
└── guides/             # Documentation
```

### Adding New Components

1. Create a new component file in `src/components/`
2. Define Zod schema for props validation
3. Export render function that returns HTML string
4. Register component in `renderer.ts`

Example:
```typescript
// src/components/my-component.ts
import { z } from "zod";

export const MyComponentPropsSchema = z.object({
  text: z.string(),
  color: z.string().optional()
});

export function renderMyComponent(props: z.infer<typeof MyComponentPropsSchema>) {
  const { text, color = "#000" } = props;
  return `<div style="color: ${color}">${text}</div>`;
}
```

## Comparison with React Email

| Feature | React Email | Vane |
|---------|-------------|------|
| **Rendering** | JSX → React.createElement | Direct HTML generation |
| **Runtime** | React required | No runtime dependencies |
| **Props** | React props | Zod schemas |
| **Validation** | TypeScript only | Runtime + TypeScript |
| **Build Time** | Slower (JSX compilation) | Faster (no compilation) |
| **Output** | Same HTML | Same HTML ✅ |
| **Email Compatibility** | Excellent | Excellent ✅ |

## Performance

- ⚡ **No React overhead** - Pure string concatenation
- 🚀 **Fast builds** - No JSX compilation step
- 💾 **Small bundle** - Only Zod as dependency
- 🔥 **Bun runtime** - Optimized JavaScript execution

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Credits

Components are ported from [react-email](https://github.com/resend/react-email) with modifications for pure HTML generation. All credit for the original component designs goes to the React Email team.

---

**Built with ❤️ and Bun**