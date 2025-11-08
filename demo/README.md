# Vane Demo - Verification Email

This is a standalone demo app that renders a verification email template using Vane's JSON-based email component system.

## 📁 Files

- `verify-email.json` - Email template in JSON format (similar to AWS verify email)
- `index.ts` - Development server to preview the email in browser
- `generate.ts` - Script to generate HTML file
- `package.json` - Dependencies and scripts

## 🚀 Quick Start

### 1. Install Dependencies

```bash
bun install
```

### 2. Run the Development Server

```bash
bun start
```

This will start a server at `http://localhost:3001` where you can preview the email.

**Endpoints:**
- `http://localhost:3001/` or `/email` - View rendered email HTML
- `http://localhost:3001/json` - View the JSON template

### 3. Generate HTML File (Optional)

To generate a standalone HTML file:

```bash
bun generate
```

This will create `output.html` that you can open in any browser.

## 📧 Email Template Structure

The email is defined in `verify-email.json` using Vane's component system:

```json
{
  "subject": "Verify your email address",
  "component": {
    "type": "container",
    "props": { ... },
    "children": [ ... ]
  }
}
```

## 🎨 Available Components

- **container** - Centered layout wrapper
- **section** - Content sections with styling
- **heading** - H1-H6 headings
- **text** - Paragraph text
- **image** - Images with alt text
- **hr** - Horizontal divider

## 🔧 Customization

Edit `verify-email.json` to customize:
- Email subject
- Verification code
- Colors and styling
- Content and layout

The changes will be reflected immediately when you refresh the browser (with `bun --watch`).

## 📝 Example: Changing the Verification Code

In `verify-email.json`, find:

```json
{
  "type": "text",
  "props": {
    "content": "596853",
    ...
  }
}
```

Change `"596853"` to your desired code.

## 🏗️ How It Works

1. JSON template defines the email structure
2. Vane's renderer processes each component recursively
3. Components generate email-compatible HTML (tables, inline styles)
4. Final HTML is email-client friendly (Gmail, Outlook, etc.)

## 🔗 Integration

To use this with the main Vane service:

```bash
curl -X POST http://localhost:3000/generate \
  -H "Content-Type: application/json" \
  -d @verify-email.json
```

This sends the JSON template to the Vane service and returns rendered HTML.
