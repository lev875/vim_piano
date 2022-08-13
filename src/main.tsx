import React from 'react'
import { createRoot } from 'react-dom/client'
import App from "./components/App"
import { Provider } from 'react-redux'
import store from "./store/store"
import "./style.css"

const rootElement = document.getElementById('root')

rootElement
  ? createRoot(rootElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <App/>
      </Provider>
    </React.StrictMode>
  )
  : console.error("Root element is null!")
