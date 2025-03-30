import React from "react";
import { Button } from "./ui/button";
import { Heart } from 'lucide-react';

function Product() {
  return (
    <div>
      <div
        className="card bg-accent overflow-hidden p-5 h-[30vh] md:h-[22vh] w-[300px] md:w-[200px] lg:h-[240px] lg:w-[250px]  bg-center bg-contain bg-no-repeat border rounded-2xl lg:rounded-3xl flex flex-col justify-end items-center"
        
      >
        <div className="img bg-accent w-full h-[80%] bg-center bg-cover bg-no-repeat border" style={{
              backgroundImage: "url(/images/dummyProduct.png)",
            }}>

        </div>
        <div className="w-full flex ">
        <Button className="bg-white text-black my-3 w-[60%]">Add To Cart</Button>
        <Heart color="red" size={35} />
        </div>
      </div>
    </div>
  );
}

export default Product;
