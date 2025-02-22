// import React from 'react';

// const NotFound = () => {
//     return (
//         <div>
//             error 404
//         </div>
//     );
// };

// export default NotFound;

// const Error = () => {
//   return (
//     <div className="relative h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
//       {/* SVG Background */}
//       <div className="absolute inset-0">
//         <svg
//           viewBox="0 0 200 200"
//           xmlns="http://www.w3.org/2000/svg"
//           className="absolute w-full h-full"
//         >
//           <motion.path
//             fill="#3b82f6"
//             d="M43.6,-61.1C56.3,-53.7,67.7,-42,73.8,-27.9C79.8,-13.8,80.5,2.7,74.5,15.8C68.5,28.9,55.9,38.5,44,50.2C32.1,61.9,20.9,75.6,5.5,76.8C-9.9,78.1,-29.7,66.8,-43.7,53.1C-57.7,39.3,-65.9,23.1,-67.2,6.7C-68.5,-9.7,-62.9,-26.2,-51.9,-34.3C-40.9,-42.4,-24.5,-42,-9.5,-47.3C5.5,-52.7,22,-63.5,43.6,-61.1Z"
//             transform="translate(100 100)"
//             animate={{ scale: [1, 1.1, 1] }}
//             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//           />
//         </svg>
//       </div>

//       {/* Content */}
//       <div className="relative text-center z-10">
//         <Typography variant="h1" className="text-blue-500 font-bold text-9xl">
//           404
//         </Typography>
//         <Typography variant="h4" className="mt-4 text-gray-800 dark:text-white">
//           Oops! Page Not Found
//         </Typography>
//         <Typography className="mt-2 text-gray-600 dark:text-gray-400">
//           The page you're looking for doesn't exist or has been moved.
//         </Typography>
//         <Link to="/">
//           <Button color="blue" className="mt-6">
//             Go Home
//           </Button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Error;
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const NotFound = () => {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] text-center px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-7xl font-bold text-blue-600"
      >
        404
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-2xl mt-4"
      >
        Page Not Found{dots}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-4 text-gray-400 max-w-md"
      >
        The page you are looking for might have been removed or temporarily
        unavailable.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="mt-6"
      >
        <Link href="/">
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition-transform transform hover:scale-105">
            Go Home
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
