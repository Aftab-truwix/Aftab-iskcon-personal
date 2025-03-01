import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { useEffect } from "react";
import CreateProductPopup from "./Products/AdminCreateProductPopup";

const backend = import.meta.env.VITE_BACKEND_URL;

export default function ProductDashboard() {


   const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [products, setProducts] = useState([]);

  const openPopup = (product = null) => {
    setCurrentProduct(product);
    setIsPopupOpen(true);
  }

  const closePopup = () => {
    setIsPopupOpen(false);
    setCurrentProduct(null);
  }

  async function fetchProducts() {
    try {
      const response = await axios.get(`${backend}/admin/product/all`);
      setProducts(response.data.data);
    } catch (error) {
      console.log("Error while fetching products", error);
    }
  }

  async function deleteProduct(id) {
    try {
      await axios.delete(`${backend}/admin/product/delete/${id}`);
      fetchProducts();
      alert("Product deleted successfully!");
    } catch (error) {
      console.log("Error while deleting product", error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6 bg-white h-[380px] rounded-3xl shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Products</h2>
        <button
          onClick={() => openPopup()}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaPlus /> Add Product
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-6 overflow-y-scroll h-[250px]">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-[16px] shadow-md border-2 border-[#D1C7C74D] flex items-center space-x-4"
          >
            {/* Product Image */}
            <div className="w-[35%] h-full border-2 border-orange-500 p-1 rounded-xl ">
              <img
                src={product?.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1">
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-gray-600 text-sm my-2">
                {product.description.slice(0, 60) + "...."}
              </p>
              <p className="text-sm ">
                <span className="text-black font-semibold ">Category: </span>
                <span className="text-sm text-gray-500">
                  {product.category}
                </span>
              </p>
              <p className="text-sm ">
                <span className="text-black font-semibold ">Product ID: </span>
                <span className="text-sm text-gray-500">
                  {product.productId}
                </span>
              </p>
              <p className="text-sm ">
                <span className="text-black font-semibold ">Stock: </span>
                <span className="text-sm text-gray-500">{product.stock}</span>
              </p>
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold mt-1">
                  ₹ {product.price.toFixed(2)}
                </p>
                <div className="flex space-x-2 mt-2">
                  <button onClick={() => openPopup(product)} className="bg-orange-500 text-white px-4 py-1 rounded-xl">
                    Edit
                  </button>
                  <button onClick={() => deleteProduct(product._id)} className="bg-[#feecce] text-orange-500 px-4 py-1 rounded-xl">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Popup Form */}
      {isPopupOpen && (
        <CreateProductPopup  product={currentProduct}
        closePopup={closePopup}
        refreshProducts={fetchProducts} />
      )}
    </div>
  );
}
