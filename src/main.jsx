import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CssBaseline />
    <App />
  </BrowserRouter>,
)
