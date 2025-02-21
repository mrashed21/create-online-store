// /* eslint-disable @next/next/no-img-element */
// "use client";

// import SkeletonCard from "@/components/Skeleton/SkeletonCard";
// import axios from "axios";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// interface Product {
//   _id: string;
//   name: string;
//   price: number;
//   description: string;
//   images: { optimizeUrl: string }[];
// }

// const Product = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("./product.json");
//         if (Array.isArray(response.data?.data)) {
//           setProducts(response.data.data);
//         } else {
//           console.error("Fetched data is not an array:", response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (loading) {
//     return (
//       <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {Array(8)
//           .fill(0)
//           .map((_, index) => (
//             <SkeletonCard key={index} />
//           ))}
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {products.map((product) => (
//             <div
//               key={product._id}
//               className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
//             >
//               <Link href={`/product/${product._id}`}>
//                 <div className="p-4">
//                   <img
//                     src={product.images?.[0]?.optimizeUrl}
//                     alt={product.name}
//                     className="w-full h-56 object-cover rounded-lg"
//                     loading="lazy"
//                   />
//                   <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
//                   <p className="text-gray-600 mt-2">${product.price}</p>
//                   <p className="text-sm text-gray-500 mt-2">
//                     {product.description}
//                   </p>
//                 </div>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Product;

/* eslint-disable @next/next/no-img-element */
"use client";

import SkeletonCard from "@/components/Skeleton/SkeletonCard";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  images: { optimizeUrl: string }[];
}

const Product = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/product.json");
        if (Array.isArray(response.data?.data)) {
          setProducts(response.data.data);
        } else {
          console.error("Fetched data is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <SkeletonCard key={index} />
          ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Link href={`/product/${product._id}`}>
              <div className="p-4">
                <img
                  src={product.images?.[0]?.optimizeUrl}
                  alt={product.name}
                  className="w-full h-56 object-cover rounded-lg"
                  loading="lazy"
                />
                <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
                <p className="text-gray-600 mt-2">${product.price}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {product.description}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
