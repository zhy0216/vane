import { EmailRequestSchema } from "./types";
import { generateEmailHtml } from "./renderer";

const PORT = process.env.PORT || 3000;

/**
 * 主 HTTP 服务器
 */
const server = Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);

    // CORS 头
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // 处理 OPTIONS 预检请求
    if (req.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // 健康检查端点
    if (url.pathname === "/health" && req.method === "GET") {
      return new Response(
        JSON.stringify({ status: "ok", timestamp: new Date().toISOString() }),
        {
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // 生成 Email HTML 端点
    if (url.pathname === "/generate" && req.method === "POST") {
      try {
        const body = await req.json();

        // 验证请求数据
        const validatedData = EmailRequestSchema.parse(body);

        // 生成 HTML
        const html = generateEmailHtml(
          validatedData.component,
          validatedData.subject
        );

        return new Response(html, {
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            ...corsHeaders,
          },
        });
      } catch (error) {
        console.error("Error generating email:", error);

        if (error instanceof Error && error.name === "ZodError") {
          return new Response(
            JSON.stringify({
              error: "Validation error",
              details: error.message,
            }),
            {
              status: 400,
              headers: { "Content-Type": "application/json", ...corsHeaders },
            }
          );
        }

        return new Response(
          JSON.stringify({
            error: "Internal server error",
            message: error instanceof Error ? error.message : "Unknown error",
          }),
          {
            status: 500,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }
    }

    // 404 处理
    return new Response(
      JSON.stringify({
        error: "Not found",
        availableEndpoints: [
          { method: "GET", path: "/health" },
          { method: "POST", path: "/generate" },
        ],
      }),
      {
        status: 404,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  },
});

console.log(`🚀 Vane email service running on http://localhost:${PORT}`);
console.log(`📋 Endpoints:`);
console.log(`   GET  /health   - Health check`);
console.log(`   POST /generate - Generate email HTML`);
