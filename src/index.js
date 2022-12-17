import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeContextProvider } from './Context/ThemeContext';
import { TestModeContextProvider } from './Context/TestModeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <TestModeContextProvider>
        <App/>
      </TestModeContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
 
