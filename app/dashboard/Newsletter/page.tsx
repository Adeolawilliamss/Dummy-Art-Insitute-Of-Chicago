"use client";
import { UilAngleDown } from "@iconscout/react-unicons";
import { useState } from "react";

export default function Newsletter() {
  const [open, setOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState(Array(8).fill(false));

  const options = [
    "News And Exhibitions",
    "Career Opportunities",
    "Families",
    "Public Programs",
    "K-12 Educational Resources",
    "Teen Opportunities",
    "Research, Publishing & Conservation",
    "Special Events",
  ];

  const handleCheckboxChange = (index) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    setCheckedItems(updatedCheckedItems);
  };

  return (
    <div className="w-full bg-slate-100 py-10 px-4 md:px-0">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-10 mt-10">
          {/* Left Section */}
          <div className="w-full md:w-1/2">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 leading-snug">
              Sign up to our newsletter to receive updates.
            </h1>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/2">
            <div className="flex flex-col gap-5">
              {/* Email Input */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                <h2 className="text-lg md:text-2xl text-gray-700">Email Address</h2>
                <div className="flex items-center border-b-2 border-slate-500 w-full md:w-3/4">
                  <input
                    type="email"
                    placeholder="Your@Email.com"
                    className="w-full p-2 text-base md:text-lg bg-slate-100 focus:outline-none"
                  />
                  <h2 className="text-red-600 text-base md:text-lg ml-4 cursor-pointer">Subscribe</h2>
                </div>
              </div>

              {/* Toggle Section */}
              <div
                className="flex justify-between items-center cursor-pointer mt-4 md:justify-end"
                onClick={() => setOpen(!open)}
              >
                <h1 className="text-lg md:text-xl text-gray-700">See All Newsletters</h1>
                <UilAngleDown
                  size={24}
                  className={`transform transition-transform duration-300 ${
                    open ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>

              {/* Checkbox List (conditionally rendered) */}
              {open && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  {options.map((option, index) => (
                    <label key={index} className="flex items-center space-x-2 text-sm md:text-base">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600"
                        checked={checkedItems[index]}
                        onChange={() => handleCheckboxChange(index)}
                      />
                      <span
                        className={`hover:text-black ${
                          checkedItems[index] ? "text-black" : "text-gray-500"
                        }`}
                      >
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
