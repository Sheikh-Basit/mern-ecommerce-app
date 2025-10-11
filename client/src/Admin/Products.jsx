import React, { useEffect } from 'react'
import Breadcrum from './Breadcrum'

import logo from '../assets/logo.png'
import { fetchProducts } from '../Redux/FetchProdctSlice';
import { useDispatch, useSelector } from 'react-redux';

const Products = () => {
  const dispatch = useDispatch();
  const { data: products = [], loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div>
      <Breadcrum title="All Products"/>

      <div className="grid grid-cols-4 gap-3 my-6">
      { products.map((product, index) => (
        <div key={index} className="border border-gray-300 rounded">
          <img src={logo} alt="Dummy" className='w-full h-28 object-center'/>
          <div className="p-3">

          <div className="flex items-center justify-between">
          <h3>{product.title}</h3>
          {product.stock > 0 ? <span className='rounded-2xl bg-green-200 px-2 text-sm text-green-800'>In Stock</span> : 
          <span className='rounded-2xl bg-red-200 px-2 text-sm text-red-800'>Out of Stock</span>
        }
          </div>

          <p className='text-xl text-blue-700 my-2'>${product.price}</p>
          <p className='text-sm'>{product.description}</p>
          </div>
        </div>

      ))

      }

      </div>
    </div>
  )
}

export default Products
