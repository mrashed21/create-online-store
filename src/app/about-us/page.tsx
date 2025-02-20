// "use client";

// import Link from "next/link";
export const metadata = {
  title: "About Us",
  description: "Browse through our amazing products and find what you love!",
};
export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        Welcome to our online store! We are committed to bringing you the best
        products at unbeatable prices. Our journey began with a simple mission:
        to create a seamless shopping experience where customers can discover
        quality products that enhance their lives.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        At our core, we value integrity, innovation, and exceptional customer
        service. Our team works tirelessly to curate a diverse selection of
        products that cater to every need and preference. We believe in creating
        a community of satisfied customers who return time and again.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        Thank you for choosing us. We are excited to be part of your shopping
        journey and look forward to serving you with excellence.
      </p>

      {/* <div className="text-center mt-8">
        <Link href="/products">
          <span className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg text-lg font-medium hover:bg-blue-600 transition-colors">
            Explore Our Products
          </span>
        </Link>
      </div> */}
    </div>
  );
}
