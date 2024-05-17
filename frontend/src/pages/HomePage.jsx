import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import NavBar from '../components/NavBar'; 

const baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.baseURL = baseURL;

const HomePage = () => {
  const [productList, setProductList] = useState([]);

  const getProduct = async () => {
    try {
      const response = await axios.get("/products");
      setProductList(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <NavBar />
      <h1>My HomePage</h1>
      <div>
        {productList.length > 0 ? (
          productList.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              getProduct={getProduct}
            />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </>
  );
};

export default HomePage;
