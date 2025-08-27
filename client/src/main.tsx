import { createRoot } from 'react-dom/client';
import App from './App-simple';
import './index-simple.css';

console.log('🚀 main.tsx: Starting React app initialization...');

const rootElement: HTMLElement | null = document.getElementById('root');
console.log('🔍 main.tsx: Root element found:', rootElement);

if (rootElement) {
  console.log('✅ main.tsx: Creating React root...');
  const root = createRoot(rootElement);
  console.log('✅ main.tsx: React root created, rendering App...');
  root.render(<App />);
  console.log('✅ main.tsx: App rendered successfully!');
} else {
  console.error('❌ main.tsx: Root element not found!');
}
