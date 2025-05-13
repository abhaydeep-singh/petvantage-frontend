import React from "react";
import { useSelector } from "react-redux";
import { MoonLoader, PulseLoader } from "react-spinners";

const Loader = () => {
  const isLoading = useSelector((state) => state.loader.isLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20"></div> */}
      <PulseLoader color="#E2B814" size={40} />
      {/* <MoonLoader color="#E2B814" size={100} /> */}
    </div>
  );
};

export default Loader;
