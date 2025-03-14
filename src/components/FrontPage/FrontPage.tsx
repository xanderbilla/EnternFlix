"use client";

import Input from "@/components/Input/Input";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import BasicNav from "../BasicNav/BasicNav";

export default function Home() {
  const [email, setEmail] = useState("");

  return (
    <div
      className="relative h-full w-full 
    bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/5eab1b22-c5ea-48b0-8ef4-862b3fa6df2c/4af43238-4df9-4946-9920-a4bd55f2e50b/IN-en-20230724-popsignuptwoweeks-perspective_alpha_website_medium.jpg')] 
    bg-no-repeat bg-fixed bg-center bg-cover"
    >
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <BasicNav />
        <div className="text-white h-2/3 flex flex-col items-center justify-center">
          <h1 className="font-extrabold text-6xl md:text-6xl md:text-center">
            Unlimited movies, TV shows and more
          </h1>
          <p className="mt-4 text-2xl font-medium md:text-center">
            Watch anywhere. Cancel anytime.
          </p>
          <div className="mt-6 flex flex-col gap-6">
            <h3 className="text-2xl font-medium md:text-center">
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>
            <div className="flex w-full items-center justify-center gap-2">
              <form className="flex w-8/12">
                <div className="w-full">
                  <Input
                    className="border opacity-60"
                    label="Email address"
                    onChange={(e: any) => setEmail(e.target.value)}
                    id="email"
                    type="email"
                    value={email}
                  />
                </div>
              </form>
              <button
                className="bg-red-600 px-7 py-3 font-bold text-xl text-white 
                        rounded-md w-auto hover:bg-red-700 transition flex items-center gap-2"
              >
                Get Started <IoIosArrowForward size={32} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
