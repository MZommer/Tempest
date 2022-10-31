import React, { useEffect } from 'react';
import { useProductsContext } from '@contexts/ProductsContext'
import GridView from './GridView';
import ListView from './ListView';
import Loading from './Loading';

const ProductList = () => {
    const { products, fetchProducts, products_loading } = useProductsContext();
    useEffect(() => { fetchProducts() }, [])
    const grid_view = true
    if (products_loading)
        return <Loading />
    if (products.length < 1) {
        return <h5 style={{ textTransform: 'none' }}>Sorry, no products matched your search..</h5>;
    }

    if (grid_view === false) {
        return <ListView products={products} />;
    }

    return <GridView products={products}>product list</GridView>;
};

export default ProductList;
