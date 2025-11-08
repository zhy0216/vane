# Vane Demo - Email Templates

This is a standalone demo app that renders email templates using Vane's JSON-based email component system.

## 📁 Files

- `jsons/*.json` - Email templates in JSON format
- `index.html` - Demo UI entry point
- `app.ts` - Client-side application logic
- `vite.config.ts` - Vite configuration
- `package.json` - Dependencies and scripts
- `server.ts` - (Optional) Standalone API server if you need backend endpoints

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

### 2. Run the Development Server

Simply start Vite:

```bash
npm run dev
```

This will start the Vite dev server at `http://localhost:3001`. All JSON templates are bundled directly into the frontend - no backend server needed!

Open `http://localhost:3001` in your browser to view the demo.

### 3. Build for Production (Optional)

To build a static production version:

```bash
npm run build
```

This will create a `dist` folder with the optimized build that can be deployed to any static hosting service (Netlify, Vercel, GitHub Pages, etc.).

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

Edit any JSON file in the `jsons/` directory to customize:
- Email subject
- Content and text
- Colors and styling
- Layout and structure

The changes will be reflected immediately in the demo UI. Just refresh your browser to see the updates.

## 📝 Example: Editing Templates

The demo includes multiple email templates in the `jsons/` directory:
- `airbnb-review.json` - Airbnb review request
- `amazon-review.json` - Amazon order review
- `apple-receipt.json` - Apple receipt email
- And many more...

You can edit any of these files or create your own. Changes will be visible immediately in the demo.

## 🏗️ How It Works

1. JSON templates are imported directly into the frontend using Vite's `import.meta.glob`
2. All templates are bundled at build time (no runtime API calls needed)
3. Vane's renderer processes each component recursively in the browser
4. Components generate email-compatible HTML (tables, inline styles)
5. Final HTML is email-client friendly (Gmail, Outlook, etc.)

## ✨ Benefits

- **No Backend Required** - Pure frontend static site
- **Fast Loading** - All templates bundled at build time
- **Easy Deployment** - Deploy to any static hosting
- **Simple Development** - Just run `npm run dev`
