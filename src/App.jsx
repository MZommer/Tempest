import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from "@components/Navbar";
import Sidebar from "@components/Sidebar";
import Footer from "@components/Footer";

import CartScreen from '@screens/CartScreen';
import SpaceScreen from '@screens/SpaceScreen';
import ProductScreen from '@screens/ProductScreen';
import ProductsPage from '@screens/ProductsPage';


import { useTempestContext } from "@contexts/TempestContext";

function guardedElement(element, isInitialized){
  return !isInitialized
  ? <Navigate replace to="/setSpace"/>
  : element

}

export default function App() {
  const { isInitialized } = useTempestContext();
  return (
    <Router location="/setSpace">
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="products/:id" element={guardedElement(<ProductScreen/>, isInitialized)}/>
          <Route path="cart" element={guardedElement(<CartScreen/>, isInitialized)}/>
          <Route path="products" element={<ProductsPage/>}/>
          <Route path="setSpace" element={<SpaceScreen/>}/>
        </Routes>
        
        <Footer />
    </Router>
  )
}