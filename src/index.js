import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {NextUIProvider} from '@nextui-org/react'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <NextUIProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </NextUIProvider>,
)
