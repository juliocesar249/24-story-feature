import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx';982002

import "tailwindcss/index.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
