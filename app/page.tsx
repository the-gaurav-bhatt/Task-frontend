"use client";
import Image from "next/image";
import { off } from "process";
import { useState, useEffect } from "react";
interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
}
export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("https://task-backend-jg80.onrender.com/api/product");

        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }

        const data = await response.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      {isLoading && <div className="text-center text-gray-500">Loading...</div>}
      {error && <div className="text-red-500">An error occurred: {error}</div>}

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <li key={product._id} className="border rounded-lg shadow-md p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="px-2 py-4">
              <h3 className="text-lg font-medium text-gray-900">
                {product.name}
              </h3>
              <p className="mt-1 text-sm text-gray-600">${product.price}</p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                Buy Now
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
