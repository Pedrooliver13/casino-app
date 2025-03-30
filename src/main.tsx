import { App } from './App.tsx';

// Packages
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// i18n
import '@/i18n/languages.config.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
