"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import LogoaAndName from "../components/LogoaAndName";

const Navbar = () => {
  const defaultColor = "#0407d9";
  const backgroundColorObject = { backgroundColor: defaultColor };
  const { userId } = useAuth();

  return (
    <header>
      <div className="p-8 px-20">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left mb-7 sm:mb-0">
            {/* icons */}
            <LogoaAndName />
          </div>

          {/* button */}
          <div>
            {userId ? (
              <Link href={"/dashboard"}>
                <button
                  style={backgroundColorObject}
                  className="block rounded-lg px-9 py-3 text-sm font-medium text-white 
                transition"
                  type="button"
                >
                  Dashboard
                </button>
              </Link>
            ) : (
              <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                <Link href={"/sign-up"}>
                  <button
                    style={backgroundColorObject}
                    className="block sm:w-32 w-full rounded-lg px-9 py-3 text-sm font-medium text-white 
                    transition focus:outline-none cursor-pointer"
                    type="button"
                  >
                    Sign In
                  </button>
                </Link>

                <Link href={"/sign-up"}>
                  <button
                    className="block sm:w-32 w-full border rounded-lg px-9 py-3 text-sm font-medium cursor-pointer
                  transition focus:outline-none hover:bg-blue-500 hover:text-white text-blue-500 border-blue-500"
                    type="button"
                  >
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
