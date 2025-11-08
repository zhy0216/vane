import { generateEmailHtml } from "../src/renderer";
import emailData from "./verify-email.json";

const PORT = 3001;

/**
 * Demo server - Serves the verification email template
 */
const server = Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);

    // Serve the rendered email
    if (url.pathname === "/" || url.pathname === "/email") {
      try {
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
      return new Response(JSON.stringify(emailData, null, 2), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // 404
    return new Response(
      JSON.stringify({
        error: "Not found",
        availableEndpoints: [
          { path: "/", description: "Rendered email HTML" },
          { path: "/email", description: "Rendered email HTML" },
          { path: "/json", description: "Email template JSON" },
        ],
      }),
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      }
    );
  },
});

console.log(`\n🎨 Vane Demo Server running on http://localhost:${PORT}`);
console.log(`\n📧 View the email: http://localhost:${PORT}/email`);
console.log(`📝 View the JSON: http://localhost:${PORT}/json\n`);
