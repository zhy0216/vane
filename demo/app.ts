/// <reference types="vite/client" />
import { generateEmailHtml } from '../src/renderer';

// Import all JSON templates using Vite's glob import
const templateModules = import.meta.glob('./jsons/*.json', { eager: true });

// Extract template data
const templateData: Record<string, any> = {};
const templates: string[] = [];

for (const path in templateModules) {
  const name = path.replace('./jsons/', '').replace('.json', '');
  templates.push(name);
  templateData[name] = (templateModules[path] as any).default;
}

// App state
let currentTemplate = '';

/**
 * Format template name for display
 */
function formatTemplateName(template: string): string {
  return template.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
}

/**
 * Load available templates
 */
function loadTemplates() {
  if (templates.length > 0) {
    // Get template from URL params or use first one
    const urlParams = new URLSearchParams(window.location.search);
    currentTemplate = urlParams.get('template') || templates[0];
    
    renderTemplatesList();
    loadEmailPreview();
  }
}

/**
 * Render the templates list in the sidebar
 */
function renderTemplatesList() {
  const listContainer = document.getElementById('templates-list');
  if (!listContainer) return;
  
  listContainer.innerHTML = templates
    .map(
      (template) => `
        <a href="?template=${template}" class="template-item ${template === currentTemplate ? 'active' : ''}" data-template="${template}">
          <div class="template-icon"></div>
          <span>${formatTemplateName(template)}</span>
        </a>
      `
    )
    .join('');
  
  // Add click handlers
  listContainer.querySelectorAll('.template-item').forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const template = (item as HTMLElement).dataset.template;
      if (template) {
        currentTemplate = template;
        const url = new URL(window.location.href);
        url.searchParams.set('template', template);
        window.history.pushState({}, '', url);
        renderTemplatesList();
        loadEmailPreview();
      }
    });
  });
}

/**
 * Fix image paths to include the base URL
 */
function fixImagePaths(component: any): any {
  if (!component) return component;
  
  const fixed = { ...component };
  
  // Fix image src if this is an image component
  if (fixed.type === 'image' && fixed.props?.src) {
    const src = fixed.props.src;
    // Only fix paths that start with / and are not already prefixed with base URL
    if (src.startsWith('/') && !src.startsWith(import.meta.env.BASE_URL)) {
      fixed.props = {
        ...fixed.props,
        src: import.meta.env.BASE_URL + src.slice(1), // Remove leading / and add base URL
      };
    }
  }
  
  // Recursively fix children
  if (fixed.children && Array.isArray(fixed.children)) {
    fixed.children = fixed.children.map(fixImagePaths);
  }
  
  return fixed;
}

/**
 * Load the email preview
 */
function loadEmailPreview() {
  const iframe = document.getElementById('email-iframe') as HTMLIFrameElement;
  const contentTitle = document.getElementById('content-title');
  
  if (iframe && templateData[currentTemplate]) {
    const data = templateData[currentTemplate];
    // Fix image paths before rendering
    const fixedComponent = fixImagePaths(data.component);
    const html = generateEmailHtml(fixedComponent, data.subject);
    
    // Write HTML directly to iframe
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (iframeDoc) {
      iframeDoc.open();
      iframeDoc.write(html);
      iframeDoc.close();
    }
  }
  
  if (contentTitle) {
    contentTitle.textContent = formatTemplateName(currentTemplate);
  }
}

/**
 * Load JSON view
 */
function loadJson() {
  const jsonContent = document.getElementById('json-content');
  if (jsonContent && templateData[currentTemplate]) {
    jsonContent.textContent = JSON.stringify(templateData[currentTemplate], null, 2);
  }
}

/**
 * Show specific view (preview or json)
 */
function showView(view: 'preview' | 'json') {
  const previewView = document.getElementById('preview-view');
  const jsonView = document.getElementById('json-view');
  const previewBtn = document.getElementById('preview-btn');
  const jsonBtn = document.getElementById('json-btn');
  
  if (view === 'preview') {
    previewView?.style.setProperty('display', 'block');
    jsonView?.style.setProperty('display', 'none');
    previewBtn?.classList.add('active');
    jsonBtn?.classList.remove('active');
  } else {
    previewView?.style.setProperty('display', 'none');
    jsonView?.style.setProperty('display', 'block');
    previewBtn?.classList.remove('active');
    jsonBtn?.classList.add('active');
    loadJson();
  }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  loadTemplates();
  
  // Set up view toggle buttons
  const previewBtn = document.getElementById('preview-btn');
  const jsonBtn = document.getElementById('json-btn');
  
  previewBtn?.addEventListener('click', () => showView('preview'));
  jsonBtn?.addEventListener('click', () => showView('json'));
  
  // Handle browser back/forward
  window.addEventListener('popstate', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const template = urlParams.get('template') || templates[0];
    if (template !== currentTemplate) {
      currentTemplate = template;
      renderTemplatesList();
      loadEmailPreview();
    }
  });
});
