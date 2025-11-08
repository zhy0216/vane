import { generateEmailHtml } from "../src/renderer";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";

const PORT = 3001;
const JSONS_DIR = join(import.meta.dir, "jsons");
const STATIC_DIR = join(import.meta.dir, "static");

/**
 * Get all available JSON email templates
 */
function getAvailableTemplates() {
  try {
    const files = readdirSync(JSONS_DIR);
    return files
      .filter((file) => file.endsWith(".json"))
      .map((file) => file.replace(".json", ""));
  } catch (error) {
    console.error("Error reading jsons directory:", error);
    return [];
  }
}

/**
 * Load email data from a JSON file
 */
function loadEmailData(templateName: string) {
  const filePath = join(JSONS_DIR, `${templateName}.json`);
  try {
    const data = readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Failed to load template: ${templateName}`);
  }
}

/**
 * Format template name for display
 */
function formatTemplateName(template: string) {
  return template.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

/**
 * Generate the fancy demo UI with navigation
 */
function generateDemoUI(templates: string[], currentTemplate: string) {
  const templatePath = join(import.meta.dir, "template.html");
  const htmlTemplate = readFileSync(templatePath, "utf-8");

  const templatesList = templates
    .map(
      (template) => `
          <a href="/?template=${template}" class="template-item ${template === currentTemplate ? "active" : ""}">
            <div class="template-icon"></div>
            <span>${formatTemplateName(template)}</span>
          </a>
        `
    )
    .join("");

  return htmlTemplate
    .replace("{{TEMPLATES_LIST}}", templatesList)
    .replace("{{CURRENT_TEMPLATE}}", currentTemplate)
    .replace("{{CURRENT_TEMPLATE_TITLE}}", formatTemplateName(currentTemplate))
    .replace("{{FIRST_TEMPLATE}}", templates[0] || "");
}

/**
 * Demo server - Serves the verification email template
 */
const server = Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    const templates = getAvailableTemplates();

    // Get the template from query params or use the first available
    const templateName = url.searchParams.get("template") || templates[0];

    if (!templateName) {
      return new Response("No templates found in jsons directory", {
        status: 404,
      });
    }

    // Serve the main UI
    if (url.pathname === "/") {
      return new Response(generateDemoUI(templates, templateName), {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    // Serve the rendered email
    if (url.pathname === "/email") {
      try {
        const emailData = loadEmailData(templateName);
        const html = generateEmailHtml(
          emailData.component,
          emailData.subject
        );

        return new Response(html, {
          headers: { "Content-Type": "text/html; charset=utf-8" },
        });
      } catch (error) {
        console.error("Error rendering email:", error);
        return new Response(
          JSON.stringify({
            error: "Failed to render email",
            message: error instanceof Error ? error.message : "Unknown error",
          }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }

    // Serve the JSON template
    if (url.pathname === "/json") {
      try {
        const emailData = loadEmailData(templateName);
        return new Response(JSON.stringify(emailData, null, 2), {
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        return new Response(
          JSON.stringify({
            error: "Failed to load template",
            message: error instanceof Error ? error.message : "Unknown error",
          }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }

    // Serve static files
    if (url.pathname.startsWith("/static/")) {
      try {
        const filePath = join(STATIC_DIR, url.pathname.replace("/static/", ""));
        const file = Bun.file(filePath);
        
        if (await file.exists()) {
          return new Response(file);
        }
      } catch (error) {
        console.error("Error serving static file:", error);
      }
    }

    // 404
    return new Response("Not found", { status: 404 });
  },
});

console.log(`\n🎨 Vane Demo Server running on http://localhost:${PORT}`);
console.log(`📧 View the demo: http://localhost:${PORT}/`);
console.log(`\n✨ Available templates:`);
getAvailableTemplates().forEach((template) => {
  console.log(`   - ${template}`);
});
console.log("");
