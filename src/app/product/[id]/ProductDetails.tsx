/* eslint-disable @next/next/no-img-element */

"use client";
import { ArrowLeft, Loader2 } from "lucide-react";
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
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
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
          <ArrowLeft size={20} />
          Back to Product
        </Link>
      </div>
    );
  }

  return (
    <div className=" bg-white">
      <div className="container mx-auto px-4 pb-16">
        {/* Left Column - Images & Video */}
        <div className="flex ">
          {/* Main Image */}
          <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-50">
            <img
              src={product.images[0].optimizeUrl}
              alt={product.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Video */}
          {product.video?.secure_url && (
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-50">
              <video
                controls
                className="w-full h-full object-cover"
                src={product.video.secure_url}
              />
            </div>
          )}
        </div>

        {/* Right Column - Product Information */}
        <div className="flex flex-col gap-6">
          {/* Category */}
          <div className="text-sm font-medium text-blue-600">
            {product.category.name}
          </div>

          {/* Product Name */}
          <h1 className="text-3xl font-semibold text-gray-900">
            {product.name}
          </h1>

          {/* Price */}
          <div className="text-2xl font-medium text-gray-900">
            ${product.price}
          </div>

          {/* Description */}
          <div className="prose prose-gray">
            <h2 className="text-xl font-medium text-gray-900 mb-3">
              Description
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Additional Details */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              Product Details
            </h2>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm text-gray-500">Category</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900">
                  {product.category.name}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Product ID</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900">
                  {product._id.slice(-8).toUpperCase()}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Added On</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900">
                  {new Date(product.createdAt).toLocaleDateString()}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Navigation */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link
            href="/product"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Product
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
