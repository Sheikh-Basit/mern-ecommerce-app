import React, { useState, useEffect } from 'react';
import Breadcrum from './Breadcrum';
import { useDispatch } from 'react-redux';
import { addProduct } from '../Redux/AddProductSlice';

const AddProduct = () => {
    const dispatch = useDispatch();
    const [previewUrl, setPreviewUrl] = useState(null);

    const [productData, setProductData] = useState({
        name: "",
        price: "",
        desc: "",
        category: "",
        stock: "",
        productImage: null,
    });

    // Handle other field of form
    const handleChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    };

    // Handle File field
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setProductData({ ...productData, productImage: file });

        // Create a preview url
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
    };

    // cleanup preview URL when file changes
    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    // Handle Form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", productData.name);
        formData.append("price", productData.price);
        formData.append("stock", productData.stock);
        formData.append("category", productData.category);
        formData.append("description", productData.desc);
        if (productData.productImage) {
            formData.append("productImage", productData.productImage);
        }

        dispatch(addProduct(formData));

        // Reset form after submit
        setProductData({
            name: "",
            price: "",
            desc: "",
            category: "",
            stock: "",
            productImage: null,
        });

        setPreviewUrl(null);

    };

    return (
        <div className='container px-6 mx-auto'>
            <Breadcrum title="Add New Product" />

            <div className="min-w-0 rounded-lg shadow-md overflow-hidden bg-white p-6">
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Product Image */}
                    <div>
                        <label className="text-sm font-semibold text-gray-600">Product Image</label>
                        <input
                            type="file"
                            name="productImage"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full mt-2 p-2 border border-gray-300 rounded-md cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                        />
                        {previewUrl && (
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="mt-3 w-32 h-32 object-cover rounded border"
                            />
                        )}
                    </div>

                    {/* Product Name */}
                    <div>
                        <label className="text-sm font-semibold text-gray-600">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Type product name here"
                            value={productData.name}
                            onChange={handleChange}
                            className="block w-full mt-2 border border-gray-200 p-2 text-sm rounded-md focus:outline-none form-input leading-5 focus:border-blue-400 focus:shadow-outline-blue mb-2"
                        />
                    </div>

                    {/* Product Price */}
                    <div>
                        <label className="text-sm font-semibold text-gray-600">Product Price</label>
                        <input
                            type="number"
                            name="price"
                            placeholder="Enter product price here"
                            value={productData.price}
                            onChange={handleChange}
                            className="block w-full mt-2 border border-gray-200 p-2 text-sm rounded-md focus:outline-none form-input leading-5 focus:border-blue-400 focus:shadow-outline-blue mb-2"
                        />
                    </div>

                    <div className="flex gap-4">
                        {/* Stock Quantity */}
                        <div className='w-full'>
                            <label className="text-sm font-semibold text-gray-600">Stock Quantity</label>
                            <input
                                type="number"
                                name="stock"
                                placeholder="Enter product stock quantity"
                                value={productData.stock}
                                onChange={handleChange}
                                className="block w-full mt-2 border border-gray-200 p-2 text-sm rounded-md focus:outline-none form-input leading-5 focus:border-blue-400 focus:shadow-outline-blue mb-2"
                            />
                        </div>

                        {/* Category */}
                        <div className='w-full'>
                            <label className="text-sm font-semibold text-gray-600">Category</label>
                            <select
                                name="category"
                                value={productData.category}
                                onChange={handleChange}
                                className="block w-full mt-2 border border-gray-200 p-2 text-sm rounded-md focus:outline-none form-input leading-5 focus:border-blue-400 focus:shadow-outline-blue mb-2"
                            >
                                <option value="">Select Category</option>
                                <option value="Fashion">Fashion</option>
                                <option value="Cosmetics">Cosmetics</option>
                                <option value="Food and Meal">Food and Meal</option>
                                <option value="Electronics">Electronics</option>
                            </select>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-sm font-semibold text-gray-600">Description</label>
                        <textarea
                            name="desc"
                            rows="5"
                            placeholder="Enter product full description here"
                            value={productData.desc}
                            onChange={handleChange}
                            className="block w-full mt-2 border border-gray-200 p-2 text-sm rounded-md form-textarea focus:outline-none focus:border-blue-400 focus:shadow-outline-blue mb-2"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="w-full mt-2 p-2">
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-5 py-3 rounded-lg text-white bg-blue-600 border border-transparent active:bg-blue-600 hover:bg-blue-700 focus:shadow-outline-blue"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2 -ml-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
