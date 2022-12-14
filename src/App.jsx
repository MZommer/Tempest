import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from "@components/Navbar";
import Sidebar from "@components/Sidebar";
import Footer from "@components/Footer";

import CartScreen from '@screens/CartScreen';
import SpaceScreen from '@screens/SpaceScreen';
import ProductScreen from '@screens/ProductScreen';
import ProductsPage from '@screens/ProductsPage';
import HomeScreen from '@screens/HomeScreen';


import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { useTempestContext } from "@contexts/TempestContext";

function guardedElement(element, isInitialized) {
    return !isInitialized
        ? <SpaceScreen />
        : element

}

export default function App() {
    const { isInitialized } = useTempestContext();
    return (
        <Router>
            <Toaster />
            <Navbar />
            <Sidebar />
            <Routes>
                <Route path="products/:id" element={guardedElement(<ProductScreen />, isInitialized)} />
                <Route path="cart" element={guardedElement(<CartScreen />, isInitialized)} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="setSpace" element={<SpaceScreen />} />
                <Route path="/" element={<HomeScreen />} />
            </Routes>

            <Footer />
        </Router>
    )
}