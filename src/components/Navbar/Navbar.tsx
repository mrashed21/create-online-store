import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-white py-3">
      <section className="container mx-auto flex justify-between items-center">
        {/* Logo section */}
        <div className="">
          <h2 className="text-3xl font-medium">Create Online Store</h2>
        </div>
        {/* menu section */}
        <div className="">
          <ul className="flex space-x-4 text-lg font-medium">
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/create-store"}>Create Store</Link>
            </li>
            <li>
              <Link href={"/"}>Product</Link>
            </li>
            <li>
              <Link href={"/"}>About Us</Link>
            </li>
          </ul>
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
