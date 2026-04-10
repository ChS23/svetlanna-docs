#!/usr/bin/env node
/**
 * Converts Jupyter notebooks (.ipynb) to MDX files for Nextra
 * Run: node lib/convert-notebooks.js
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '..', 'app', 'docs');
const OUTPUT_FOLDER_SUFFIX = '.notebook';
const OUTPUT_FILE = 'page.mdx';

/**
 * Convert notebook JSON to MDX content
 * Images are saved as files in outputFolder and referenced by relative path.
 */
function notebookToMdx(notebook, outputFolder) {
  const cells = notebook.cells || [];
  const metadata = notebook.metadata || {};
  const kernelSpec = metadata.kernelspec || {};
  const language = kernelSpec.language || 'python';

  let mdx = '';
  let imgCounter = 0;

  for (const cell of cells) {
    const source = Array.isArray(cell.source)
      ? cell.source.join('')
      : cell.source;

    if (cell.cell_type === 'markdown') {
      mdx += source + '\n\n';
    }
    else if (cell.cell_type === 'code') {
      // Code cell
      mdx += '```' + language + '\n';
      mdx += source;
      if (!source.endsWith('\n')) mdx += '\n';
      mdx += '```\n\n';

      // Process outputs
      for (const output of (cell.outputs || [])) {
        if (output.output_type === 'stream') {
          const text = Array.isArray(output.text)
            ? output.text.join('')
            : output.text;
          if (text?.trim()) {
            mdx += '**Output:**\n```\n' + text;
            if (!text.endsWith('\n')) mdx += '\n';
            mdx += '```\n\n';
          }
        }
        else if (output.output_type === 'execute_result' || output.output_type === 'display_data') {
          const data = output.data || {};

          if (data['image/png']) {
            imgCounter++;
            const fileName = `output-${imgCounter}.png`;
            const base64 = Array.isArray(data['image/png']) ? data['image/png'].join('') : data['image/png'];
            fs.writeFileSync(path.join(outputFolder, fileName), Buffer.from(base64.replace(/\n/g, ''), 'base64'));
            mdx += `![Output](./${fileName})\n\n`;
          }
          else if (data['image/jpeg']) {
            imgCounter++;
            const fileName = `output-${imgCounter}.jpg`;
            const base64 = Array.isArray(data['image/jpeg']) ? data['image/jpeg'].join('') : data['image/jpeg'];
            fs.writeFileSync(path.join(outputFolder, fileName), Buffer.from(base64.replace(/\n/g, ''), 'base64'));
            mdx += `![Output](./${fileName})\n\n`;
          }
          else if (data['image/svg+xml']) {
            imgCounter++;
            const fileName = `output-${imgCounter}.svg`;
            const svg = Array.isArray(data['image/svg+xml'])
              ? data['image/svg+xml'].join('')
              : data['image/svg+xml'];
            fs.writeFileSync(path.join(outputFolder, fileName), svg, 'utf-8');
            mdx += `![Output](./${fileName})\n\n`;
          }
          else if (data['text/html']) {
            const html = Array.isArray(data['text/html'])
              ? data['text/html'].join('')
              : data['text/html'];
            // Wrap HTML in a div to avoid MDX parsing issues
            mdx += '<div dangerouslySetInnerHTML={{__html: `' +
              html.replace(/`/g, '\\`').replace(/\$/g, '\\$') +
              '`}} />\n\n';
          }
          else if (data['text/plain']) {
            const text = Array.isArray(data['text/plain'])
              ? data['text/plain'].join('')
              : data['text/plain'];
            if (text?.trim()) {
              mdx += '```\n' + text + '\n```\n\n';
            }
          }
        }
        else if (output.output_type === 'error') {
          const traceback = (output.traceback || []).join('\n')
            .replace(/\x1b\[[0-9;]*m/g, ''); // Remove ANSI codes
          if (traceback) {
            mdx += '**Error:**\n```\n' + traceback + '\n```\n\n';
          }
        }
      }
    }
    else if (cell.cell_type === 'raw') {
      mdx += '```\n' + source + '\n```\n\n';
    }
  }

  return mdx;
}

/**
 * Find all .ipynb files recursively
 */
function findNotebooks(dir) {
  const notebooks = [];

  if (!fs.existsSync(dir)) return notebooks;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      notebooks.push(...findNotebooks(fullPath));
    }
    else if (entry.name.endsWith('.ipynb')) {
      notebooks.push(fullPath);
    }
  }

  return notebooks;
}

/**
 * Main conversion function
 */
function convertAll() {
  console.log('🔍 Searching for notebooks in', DOCS_DIR);

  const notebooks = findNotebooks(DOCS_DIR);

  if (notebooks.length === 0) {
    console.log('📓 No notebooks found');
    return;
  }

  console.log(`📓 Found ${notebooks.length} notebook(s)`);

  for (const notebookPath of notebooks) {
    // Create folder: example.ipynb -> example.notebook/page.mdx
    const baseName = path.basename(notebookPath, '.ipynb');
    const outputFolder = path.join(path.dirname(notebookPath), baseName + OUTPUT_FOLDER_SUFFIX);
    const outputPath = path.join(outputFolder, OUTPUT_FILE);

    try {
      const content = fs.readFileSync(notebookPath, 'utf-8');
      const notebook = JSON.parse(content);

      // Create folder if not exists
      if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true });
      }

      const mdx = notebookToMdx(notebook, outputFolder);
      fs.writeFileSync(outputPath, mdx, 'utf-8');

      const relativePath = path.relative(process.cwd(), notebookPath);
      console.log(`✅ ${relativePath} → ${baseName + OUTPUT_FOLDER_SUFFIX}/page.mdx`);
    }
    catch (err) {
      console.error(`❌ Error converting ${notebookPath}:`, err.message);
    }
  }

  console.log('✨ Done!');
}

// Run
convertAll();
