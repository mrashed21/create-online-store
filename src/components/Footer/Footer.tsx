import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black">
      <section className="container mx-auto py-8 text-white">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <p className="order-2 lg:order-1">
            © {new Date().getFullYear()} Create Online Store. All Rights
            Reserved.
          </p>
          <div className="flex gap-2 order-1 lg:order-2">
            <Link
              href="#"
              className="transition-colors hover:text-white dark:hover:text-gray-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="transition-colors hover:text-white dark:hover:text-gray-300"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
