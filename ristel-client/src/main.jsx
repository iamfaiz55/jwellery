import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AppProvider from './context/providers/AppProvider.jsx';
import { Provider } from 'react-redux';
import reduxStore from './redux/store.js';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <AppProvider>
        <App />
      </AppProvider>
    </Provider>
  </React.StrictMode>,
)
