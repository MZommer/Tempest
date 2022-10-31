import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from "@components/Navbar";
import Sidebar from "@components/Sidebar";
import Footer from "@components/Footer";

import CartScreen from '@screens/CartScreen';

export default function App() {

  return (
    <Router>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="cart" element={<CartScreen/>}/>
         
        </Routes>
        
        <Footer />
    </Router>
  )
}