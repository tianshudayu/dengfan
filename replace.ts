import fs from 'fs';
import path from 'path';

const dir = './src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace text-white with text-text-main
  content = content.replace(/text-white/g, 'text-text-main');
  
  // Replace bg-white with bg-text-main
  content = content.replace(/bg-white/g, 'bg-text-main');
  
  // Replace text-black with text-background-dark
  content = content.replace(/text-black/g, 'text-background-dark');

  // Replace border-white with border-text-main
  content = content.replace(/border-white/g, 'border-text-main');
  
  fs.writeFileSync(filePath, content);
}

// Also update App.tsx
let appContent = fs.readFileSync('./src/App.tsx', 'utf8');
appContent = appContent.replace(/text-black/g, 'text-background-dark');
fs.writeFileSync('./src/App.tsx', appContent);

// Update index.html
let htmlContent = fs.readFileSync('./index.html', 'utf8');
htmlContent = htmlContent.replace(/bg-black text-white/g, 'bg-background-dark text-text-main');
htmlContent = htmlContent.replace(/class="dark"/g, '');
fs.writeFileSync('./index.html', htmlContent);

console.log('Replacements done!');
