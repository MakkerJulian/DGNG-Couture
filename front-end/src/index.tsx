import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { SnackbarProvider } from 'notistack';

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js')
//   });
// }

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3} preventDuplicate>
      <App />
    </SnackbarProvider>
  </React.StrictMode>,
)