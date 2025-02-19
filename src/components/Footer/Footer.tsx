const Footer = () => {
  return (
    <footer className="bg-black">
      <section className="container mx-auto py-8 text-white">
        <div className="flex items-center justify-between">
          <p>
            © {new Date().getFullYear()} Create Online Store. All Rights
            Reserved.
          </p>
          <div className="flex gap-2">
            <a
              href="#"
              className="transition-colors hover:text-white dark:hover:text-gray-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="transition-colors hover:text-white dark:hover:text-gray-300"
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
