"use client";

import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CiMail } from "react-icons/ci";
import { FaGlobeAsia } from "react-icons/fa";
import { FiMonitor } from "react-icons/fi";
import {
  MdCategory,
  MdOutlineCurrencyExchange,
  MdOutlineEditLocationAlt,
} from "react-icons/md";
import Swal from "sweetalert2";
interface FormValues {
  name: string;
  domain: string;
  email: string;
  country: string;
  category: string;
  currency: string;
}

const CreateStoreForm = () => {
  const [domainAvailable, setDomainAvailable] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      country: "Bangladesh",
      category: "Fashion",
      currency: "BDT",
    },
  });

  const checkDomainAvailability = async (domain: string) => {
    if (!domain) return;
    try {
      const response = await axios.get(
        `https://interview-task-green.vercel.app/task/domains/check/${domain}.expressitbd.com`
      );
      if (response?.data?.data?.taken === false) {
        setDomainAvailable(true);
      } else {
        setDomainAvailable(false);
        setError("domain", { message: "Domain is already taken" });
      }
    } catch (error) {
      console.error("Error checking domain:", error);
      setError("domain", { message: "Failed to check domain availability" });
    }
  };

  // const onSubmit = async (data: FormValues) => {
  //   setIsSubmitting(true);
  //   try {
  //     const response = await axios.post(
  //       "https://interview-task-green.vercel.app/task/stores/create",
  //       data
  //     );
  //     console.log("Store created:", response.data);
  //     alert("Store created successfully!");
  //   } catch (error) {
  //     console.error("Error creating store:", error);
  //     alert("Failed to create store");
  //   }
  //   setIsSubmitting(false);
  // };
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "https://interview-task-green.vercel.app/task/stores/create",
        {
          name: data.name,
          currency: data.currency,
          country: data.country,
          domain: data.domain,
          category: data.category,
          email: data.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Swal.fire({
        title: "Store created successfully!",
        icon: "success",
        draggable: true,
      });
    } catch (error) {
      Swal.fire({
        title: "Failed to create store",
        icon: "error",
        draggable: true,
      });
    }
    setIsSubmitting(false);
  };
  return (
    <div className=" bg-gray-50 p-4 lg:p-8">
      <div className="container mx-auto">
        {/* form */}
        <div className="">
          <div className="bg-white shadow-xl rounded-lg p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Create a store
              </h2>
              <p className="mt-1  text-gray-600 text-lg">
                Add your basic store information and complete the setup
              </p>
              <hr className="border-b-2 mt-3" />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Store Name */}
              <div className="lg:flex items-center gap-2 justify-between">
                {/* left-side */}
                {/* item-2 */}
                <div className="flex items-stretch  gap-4 w-full lg:w-1/2">
                  {/* icon */}
                  <div className="mt-2">
                    <FiMonitor className="text-blue-500 text-2xl" />
                  </div>
                  {/* description */}
                  <div className="">
                    <h2 className="font-medium">
                      Give your online store a name
                    </h2>
                    <p>
                      A great store name is a big part of your success . Make
                      sure it aligns with your brand and products.
                    </p>
                  </div>
                </div>
                {/* right-side */}
                <div className="w-full lg:w-1/2 mt-3 px-7 lg:mt-0 lg:px-0">
                  <input
                    {...register("name", {
                      required: "Store name is required",
                      minLength: {
                        value: 3,
                        message:
                          "Store name must be at least 3 characters long",
                      },
                    })}
                    className=" w-full rounded-md border p-2"
                    placeholder="How'd you like to call your Store?"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Domain */}
              <div className="lg:flex items-center gap-2 justify-between">
                {/* right-side */}
                <div className="flex items-stretch  gap-4 w-full lg:w-1/2">
                  {/* icon */}
                  <div className="mt-2">
                    <FaGlobeAsia className="text-blue-500 text-2xl" />
                  </div>
                  {/* description */}
                  <div className="">
                    <h2 className="font-medium">Your online store subdomin</h2>
                    <p>
                      A SEO-friendly store name is crucial part of your success.
                      Make sure it aligns with your brand and products.
                    </p>
                  </div>
                </div>

                {/* left-side */}
                <div className="w-full lg:w-1/2 mt-3 px-7 lg:mt-0 lg:px-0">
                  <div className="mt-1 flex rounded-md shadow-sm relative">
                    <input
                      {...register("domain", {
                        required: "Domain is required",
                        pattern: {
                          value: /^[a-z0-9]+(-[a-z0-9]+)*$/,
                          message: "Invalid domain format",
                        },
                      })}
                      onBlur={(e) => checkDomainAvailability(e.target.value)}
                      className="w-full rounded-md border p-2"
                      placeholder="enter your domain name"
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 ">
                      .expressitbd.com
                    </span>
                  </div>

                  {domainAvailable === true && (
                    <p className="mt-1 text-sm text-green-600">
                      Domain is available
                    </p>
                  )}
                  {domainAvailable === false && (
                    <p className="mt-1 text-sm text-red-600">
                      Not Available Domain, Re-enter!
                    </p>
                  )}
                </div>
              </div>

              {/* Country */}
              <div className="lg:flex items-center gap-2 justify-between">
                {/* right-side */}
                <div className="flex items-stretch  gap-4 w-full lg:w-1/2">
                  {/* icon */}
                  <div className="mt-2">
                    <MdOutlineEditLocationAlt className="text-blue-500 text-2xl" />
                  </div>
                  {/* description */}
                  <div className="">
                    <h2 className="font-medium">
                      Where's yours store located?
                    </h2>
                    <p>
                      Set your default location so we can optimize store acces
                      and speed for your customers.
                    </p>
                  </div>
                </div>
                {/* left side */}
                <div className="w-full lg:w-1/2 mt-3 px-7 lg:mt-0 lg:px-0">
                  <select
                    {...register("country", {
                      required: "Country is required",
                    })}
                    className="w-full rounded-md border p-2"
                  >
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="United States">United States</option>
                    <option value="India">India</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
              </div>

              {/* Category */}
              <div className="lg:flex items-center gap-2 justify-between">
                {/* right-side */}
                <div className="flex items-stretch  gap-4 w-full lg:w-1/2">
                  {/* icon */}
                  <div className="mt-2">
                    <MdCategory className="text-2xl text-blue-500" />
                  </div>
                  {/* description */}
                  <div className="">
                    <h2 className="font-medium">What's your Category?.</h2>
                    <p>
                      Set your store's defualt category so that we can optimize
                      store acces and speed for your customers.
                    </p>
                  </div>
                </div>
                {/* left side */}
                <div className="w-full lg:w-1/2 mt-3 px-7 lg:mt-0 lg:px-0">
                  <select
                    {...register("category", {
                      required: "Category is required",
                    })}
                    className="w-full rounded-md border p-2"
                  >
                    <option value="Fashion">Fashion</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Food">Food</option>
                  </select>
                </div>
              </div>

              {/* Currency */}
              <div className="lg:flex items-center gap-2 justify-between">
                {/* right-side */}
                <div className="flex items-stretch  gap-4 w-full lg:w-1/2">
                  {/* icon */}
                  <div className="mt-2">
                    <MdOutlineCurrencyExchange className="text-2xl text-blue-500" />
                  </div>
                  {/* description */}
                  <div className="">
                    <h2 className="font-medium">Choose store currency</h2>
                    <p>This is the main currency you wish to sell in.</p>
                  </div>
                </div>
                {/* left side */}
                <div className="w-full lg:w-1/2 mt-3 px-7 lg:mt-0 lg:px-0">
                  <select
                    {...register("currency", {
                      required: "Currency is required",
                    })}
                    className="w-full rounded-md border p-2"
                  >
                    <option value="BDT">BDT (Taka)</option>
                    <option value="USD">USD (Dollar)</option>
                  </select>
                </div>
              </div>

              {/* Email */}
              <div className="lg:flex items-center gap-2 justify-between">
                {/* right-side */}
                <div className="flex items-stretch  gap-4 w-full lg:w-1/2">
                  {/* icon */}
                  <div className="mt-2">
                    <CiMail className="text-2xl text-blue-500 font-bold" />
                  </div>
                  {/* description */}
                  <div className="">
                    <h2 className="font-medium">Store contact email</h2>
                    <p>
                      This is the mail you'll use to send notifications to and
                      receive orders from customars.
                    </p>
                  </div>
                </div>
                {/* left side */}
                <div className="w-full lg:w-1/2 mt-3 px-7 lg:mt-0 lg:px-0">
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email format! ",
                      },
                    })}
                    type="email"
                    className="w-full rounded-md border p-2"
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting || !domainAvailable}
                  className={` inline-flex justify py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    isSubmitting || !domainAvailable
                      ? "bg-purple-300 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                  }`}
                >
                  {isSubmitting ? "Creating Store..." : "Create Store"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStoreForm;
