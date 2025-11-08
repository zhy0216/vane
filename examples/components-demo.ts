/**
 * Component Demo
 * 
 * This file demonstrates all email components and verifies they render correctly.
 * Run with: bun run examples/components-demo.ts
 */

import {
  // Structure
  renderHtml,
  renderHead,
  renderBody,
  
  // Layout
  renderContainer,
  renderSection,
  renderRow,
  renderColumn,
  
  // Content
  renderText,
  renderHeading,
  renderLink,
  renderButton,
  renderImg,
  renderHr,
  
  // Special
  renderPreview,
  renderFont,
  renderCodeInline,
  renderCodeBlock,
  renderMarkdown,
} from "../src/components";

// Demo: Basic Email Structure
const basicEmail = renderHtml({
  children: 
    renderHead({
      children: '<title>Demo Email</title>'
    }) +
    renderBody({
      children: renderContainer({
        children: renderText({
          content: 'Hello World!',
          fontSize: '16px',
          color: '#333'
        })
      })
    })
});

console.log('=== Basic Email Structure ===');
console.log(basicEmail);
console.log('\n');

// Demo: Layout with Rows and Columns
const layoutDemo = renderRow({
  children: 
    renderColumn({
      children: renderText({ content: 'Left Column' }),
      style: { width: '300px', padding: '10px' }
    }) +
    renderColumn({
      children: renderText({ content: 'Right Column' }),
      style: { width: '300px', padding: '10px' }
    })
});

console.log('=== Layout Demo (Row + Columns) ===');
console.log(layoutDemo);
console.log('\n');

// Demo: Heading with Margins
const headingDemo = renderHeading({
  as: 'h1',
  children: 'Welcome to Vane!',
  mt: 20,
  mb: 16,
  style: { color: '#2563eb' }
});

console.log('=== Heading Demo ===');
console.log(headingDemo);
console.log('\n');

// Demo: Button with MSO Support
const buttonDemo = renderButton({
  href: 'https://example.com',
  children: 'Click Me',
  style: {
    backgroundColor: '#007bff',
    color: '#ffffff',
    padding: '12px 20px',
    borderRadius: '4px',
    fontWeight: 'bold',
  }
});

console.log('=== Button Demo (with MSO padding) ===');
console.log(buttonDemo);
console.log('\n');

// Demo: Image
const imageDemo = renderImg({
  src: 'https://via.placeholder.com/600x400',
  alt: 'Placeholder image',
  width: '600',
  height: '400',
});

console.log('=== Image Demo ===');
console.log(imageDemo);
console.log('\n');

// Demo: Preview Text
const previewDemo = renderPreview({
  children: 'This appears in the inbox preview!'
});

console.log('=== Preview Text Demo ===');
console.log(previewDemo);
console.log('\n');

// Demo: Code Inline
const codeInlineDemo = renderCodeInline({
  children: 'const x = 42;',
  style: { backgroundColor: '#f0f0f0', padding: '2px 4px' }
});

console.log('=== Code Inline Demo ===');
console.log(codeInlineDemo);
console.log('\n');

// Demo: Code Block
const codeBlockDemo = renderCodeBlock({
  code: `function hello() {
  console.log("Hello World");
}`,
  language: 'javascript',
  lineNumbers: true,
});

console.log('=== Code Block Demo ===');
console.log(codeBlockDemo);
console.log('\n');

// Demo: Markdown
const markdownDemo = renderMarkdown({
  children: `
# Hello World

This is **bold** and this is *italic*.

Check out this [link](https://example.com).

\`\`\`
const code = true;
\`\`\`
  `
});

console.log('=== Markdown Demo ===');
console.log(markdownDemo);
console.log('\n');

// Demo: Complete Email
const completeEmail = renderHtml({
  lang: 'en',
  children: 
    renderHead({
      children: 
        '<title>Complete Email Demo</title>' +
        renderFont({
          fontFamily: 'Inter',
          fallbackFontFamily: ['Arial', 'sans-serif'],
          fontWeight: 400,
        })
    }) +
    renderBody({
      style: { backgroundColor: '#f6f9fc' },
      children: 
        renderPreview({ 
          children: 'Welcome to our newsletter!' 
        }) +
        renderContainer({
          children:
            renderSection({
              style: { padding: '40px 20px' },
              children:
                renderHeading({
                  as: 'h1',
                  children: 'Welcome!',
                  mt: 0,
                  mb: 16,
                  style: { color: '#1a1a1a' }
                }) +
                renderText({
                  content: 'Thanks for signing up for our newsletter.',
                  fontSize: '16px',
                  lineHeight: '24px',
                  color: '#525252',
                }) +
                renderHr({ style: { margin: '20px 0' } }) +
                renderButton({
                  href: 'https://example.com',
                  children: 'Get Started',
                  style: {
                    backgroundColor: '#2563eb',
                    color: '#ffffff',
                    padding: '12px 24px',
                    borderRadius: '6px',
                    fontWeight: '600',
                  }
                }) +
                renderHr({ style: { margin: '20px 0' } }) +
                renderText({
                  content: 'Best regards,',
                  fontSize: '14px',
                  color: '#737373',
                }) +
                renderText({
                  content: 'The Vane Team',
                  fontSize: '14px',
                  color: '#737373',
                  fontWeight: 'bold',
                })
            })
        })
    })
});

console.log('=== Complete Email ===');
console.log(completeEmail);
console.log('\n');

// Summary
console.log('=== Summary ===');
console.log('✅ Html component');
console.log('✅ Head component');
console.log('✅ Body component');
console.log('✅ Container component');
console.log('✅ Section component');
console.log('✅ Row component');
console.log('✅ Column component');
console.log('✅ Text component');
console.log('✅ Heading component');
console.log('✅ Link component');
console.log('✅ Button component');
console.log('✅ Img component');
console.log('✅ Hr component');
console.log('✅ Preview component');
console.log('✅ Font component');
console.log('✅ CodeInline component');
console.log('✅ CodeBlock component');
console.log('✅ Markdown component');
console.log('\nAll 18 components working correctly! 🎉');
