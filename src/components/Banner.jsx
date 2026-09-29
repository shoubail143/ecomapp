import React from "react";
import bannerimg from "../assets/bannerimg.png";
import { GrSecure } from "react-icons/gr";
import { FaShippingFast } from "react-icons/fa";
import { MdPayments } from "react-icons/md";

const Banner = () => {
  return (
    <div className="min-h-[550px] flex items-center justify-center py-12 sm:py-0">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div>
            <img
              src={bannerimg}
              alt="banner"
              className="bg-orange-400 dark:bg-primary drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
            />
          </div>
          <div className="text-center gap-5 font-light">
            <h1 className="text-2xl sm:text-3xl font-bold">
              FLAT sale upto 40%
            </h1>
            <p className="text-xl text-gray-500 font-semibold sm:text-2xl text-center">
              You can trust us as everything you need is just click away.{" "}
              <span className="font-semibold text-orange-400">
                FREE Delivery
              </span>{" "}
              <br />
              over <span className="text-orange-400 font-bold">10k</span> of
              shopping
            </p>
            <div>
              <div className="flex items-center gap-4 mt-2">
                <GrSecure className="w-12 h-12 cursor-pointer font-bold rounded-full p-4 bg-blue-200 text-blue-400 " />
                <p className="font-semibold">Quality Products</p>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <FaShippingFast className="w-12 h-12 cursor-pointer font-bold rounded-full p-4 bg-orange-200 text-orange-400" />
                <p className="font-bold">Fast Delivery</p>
              </div>
              <div>
                <div className="flex items-center gap-4 mt-2">
                  <MdPayments className="w-12 h-12 cursor-pointer font-bold rounded-full p-4 bg-violet-200 text-violet-400" />
                  <p className="font-bold">Easy Payment Method</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
