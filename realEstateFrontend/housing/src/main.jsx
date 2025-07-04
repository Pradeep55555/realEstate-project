// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import 'antd/dist/reset.css'; // For Ant Design v5+

// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'antd/dist/reset.css'; // For Ant Design v5+

import App from './App.jsx';
import { ContextApi } from './component/contextApi/ContextApi.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextApi>       {/* 👈 wrap your entire app */}
      <App />
    </ContextApi>
  </StrictMode>,
);

