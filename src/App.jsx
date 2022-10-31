import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from "@components/Navbar";
import Sidebar from "@components/Sidebar";
import Footer from "@components/Footer";

import CartScreen from '@screens/CartScreen';
import SpaceScreen from '@screens/SpaceScreen';
import ProductScreen from '@screens/ProductScreen';

import { useTempestContext } from "@contexts/TempestContext";
import { useEffect } from 'react';

export default function App() {
  
  const { isInitialized } = useTempestContext();
  
  return (
    <Router location="/setSpace">
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="products/:id" element={<ProductScreen/>}/>
          <Route path="cart" element={<CartScreen/>}/>
          <Route path="setSpace" element={<SpaceScreen/>}/>
        </Routes>
        
        <Footer />
    </Router>
  )
}