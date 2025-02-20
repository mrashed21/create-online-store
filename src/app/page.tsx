import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="container mx-auto py-8 flex flex-col justify-center items-center min-h-[calc(100vh-150px)] gap-4">
        <div className="">
          <h1 className="text-3xl font-bold text-center">
            Welcome to Our Online Store Management
          </h1>
        </div>
        <div className=" flex flex-col lg:flex-row gap-5">
          <Link href="/create-store">
            <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all">
              Create Your store
            </button>
          </Link>
          <Link href="/product">
            <button className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all w-full">
              View Products
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
