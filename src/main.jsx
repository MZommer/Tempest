import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { CartProvider } from '@contexts/CartContext'
import { ProductsProvider } from '@contexts/ProductsContext'
import { TempestProvider } from '@contexts/TempestContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <TempestProvider>
        <ProductsProvider>
          <App />
        </ProductsProvider>
      </TempestProvider>
    </CartProvider>
  </React.StrictMode>
)
