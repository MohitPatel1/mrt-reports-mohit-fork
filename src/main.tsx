import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SmartTable } from './components/SmartTable'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SmartTable />
  </StrictMode>,
)
