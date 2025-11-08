import { generateEmailHtml } from "../src/renderer";
import emailData from "./jsons/verify-email.json";

/**
 * Generate email HTML and save to file
 */
async function generateEmail() {
  try {
    console.log("📧 Generating email HTML from template...");
    
    const html = generateEmailHtml(
      emailData.component,
      emailData.subject
    );

    const outputPath = "./output.html";
    await Bun.write(outputPath, html);

    console.log(`✅ Email generated successfully!`);
    console.log(`📄 Saved to: ${outputPath}`);
    console.log(`\n🌐 Open the file in your browser to preview the email.`);
  } catch (error) {
    console.error("❌ Error generating email:", error);
    process.exit(1);
  }
}

generateEmail();
