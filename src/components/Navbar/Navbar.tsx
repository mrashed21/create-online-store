"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white py-3 shadow-md">
      <section className="container mx-auto flex justify-between items-center px-4 ">
        {/* Logo section */}
        <div className=" text-2xl lg:text-3xl font-medium">
          Create Online Store
        </div>

        {/* Hamburger menu */}
        <button className="lg:hidden" onClick={toggleMenu}>
          {isOpen ? (
            <IoMdClose className="text-3xl" />
          ) : (
            <FaBars className="text-2xl" />
          )}
        </button>

        {/* Menu section */}
        <div
          className={`absolute p-5 lg:p-0  lg:static top-12 lg:top-0 left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-lg lg:shadow-none transition-all duration-300 ease-in-out ${
            isOpen ? "block" : "hidden"
          } lg:flex lg:items-center lg:space-x-6`}
        >
          <ul className="flex flex-col lg:flex-row text-lg font-medium lg:space-x-6">
            <li
              className={`py-2 lg:py-0 px-4 lg:px-0 ${
                pathname === "/" ? "text-blue-500" : "text-gray-700"
              }`}
            >
              <Link href="/" onClick={() => setIsOpen(false)}>
                Home
              </Link>
            </li>
            <li
              className={`py-2 lg:py-0 px-4 lg:px-0 ${
                pathname === "/create-store" ? "text-blue-500" : "text-gray-700"
              }`}
            >
              <Link href="/create-store" onClick={() => setIsOpen(false)}>
                Create Store
              </Link>
            </li>
            <li
              className={`py-2 lg:py-0 px-4 lg:px-0 ${
                pathname === "/product" ? "text-blue-500" : "text-gray-700"
              }`}
            >
              <Link href="/product" onClick={() => setIsOpen(false)}>
                Product
              </Link>
            </li>
            <li
              className={`py-2 lg:py-0 px-4 lg:px-0 ${
                pathname === "/about-us" ? "text-blue-500" : "text-gray-700"
              }`}
            >
              <Link href="/about-us" onClick={() => setIsOpen(false)}>
                About Us
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
