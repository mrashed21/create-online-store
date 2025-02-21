/* eslint-disable @next/next/no-img-element */

"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Category {
  name: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: Category;
  images: { optimizeUrl: string }[];
  video?: { secure_url: string };
  createdAt: string;
}

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/product.json"); // Fetch from local JSON file
        if (!response.ok) {
          throw new Error("Failed to load product data");
        }
        const data = await response.json();
        if (Array.isArray(data?.data)) {
          setProducts(data.data);
        } else {
          console.error("Invalid JSON format:", data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0 && id) {
      const matchedProduct = products.find((product) => product._id === id);
      setProduct(matchedProduct || null);
    }
  }, [products, id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1>loading</h1>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
        <Link
          href="/product"
          className="text-blue-500 hover:text-blue-600 flex items-center gap-2"
        >
          Back to Product
        </Link>
      </div>
    );
  }

  return (
    <div className="container flex flex-col lg:flex-row gap-7 mx-auto  my-10 bg-white p-10 rounded-lg shadow-lg">
      {/* Left Column - Images & Video */}
      <div className="w-full lg:w-1/2 space-y-8">
        {/* Main Image */}
        <div className="w-full  overflow-hidden rounded-lg bg-gray-50">
          <img
            src={product.images[0].optimizeUrl}
            alt={product.name}
            className="w-full h-60 object-cover"
            loading="lazy"
          />
        </div>

        {/* Video */}
        {product.video?.secure_url && (
          <div className="w-full overflow-hidden rounded-lg bg-gray-50">
            <video
              controls
              className="w-full h-56 object-cover"
              src={product.video.secure_url}
            />
          </div>
        )}
      </div>

      {/* Right Column - Product Information */}
      <div className="flex flex-col gap-6 w-full lg:w-1/2">
        {/* Category */}
        <div className="text-sm font-medium text-blue-600">
          {product.category.name}
        </div>

        {/* Product Name */}
        <h1 className="text-3xl font-semibold text-gray-900">{product.name}</h1>

        {/* Price */}
        <div className="text-2xl font-medium text-gray-900">
          ${product.price}
        </div>

        {/* Description */}
        <div className="prose prose-gray">
          <h2 className="text-xl font-medium text-gray-900 mb-3">
            Description
          </h2>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
        </div>

        {/* Navigation */}
        <Link href="/product">
          <button className="mt-3 text-xl text-white px-4 w-full py-2 bg-blue-700 rounded-md hover:bg-blue-950 hover:text-gray-200 transition duration-300">
            Back to Product
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductDetails;
