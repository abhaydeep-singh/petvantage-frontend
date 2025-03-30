import { Button } from "@/components/ui/button";
import React from "react";
import welcome from "../assets/svg/welcome.svg"; // img src={welcome}
import dogWalking from "../assets/svg/dog-walking.svg";
import { Product } from "@/components";


function UserMarketplace() {
  return (
    <div className={`w-full ${false ? "sm:ml-64" : "sm:ml-16"}`}>
      <br />
      <div className="heroslider gap-6 h-[40vh] w-full flex flex-col md:flex-row md:gap-20 items-center justify-center ">
       

        <div className="text">
          <h1 className="text-3xl lg:text-5xl font-extrabold text-primary ">TOYS FOR EVERY TAIL</h1>
          <p className="text-sm md:text-xl my-2 text-center md:text-left">Chew Toys | Nutrition | Feed | Interactive Toys</p>
          <Button className="mt-4 hidden md:block">Shop Now</Button>
        </div> 
        <img src={dogWalking} alt="" className="h-[20vh] md:h-[30vh]" />


      </div>


      {/* Main Categorys */}
      <div className="mainCategory border h-[50vh] bg-accent">
       <div className="lg:w-[80%] mx-auto">
       <div className="textbox p-3">
          <h2 className="primary font-semibold text-primary text-xl lg:text-4xl">
            {" "}
            Before You Scroll Down...
          </h2>
          <p className="text-sm lg:text-xl my-2">These might be what you're looking for!</p>
        </div>

        {/* Card Box */}
        <div className="cardbox flex flex-wrap gap-2 lg:gap-9 justify-center">
          {/* Card 1 */}
          <div
            className="card h-[20vh] w-[200px] lg:h-[240px] lg:w-[250px]  bg-center bg-contain bg-no-repeat border rounded-2xl lg:rounded-3xl flex flex-col justify-end items-center"
            style={{
              backgroundImage: "url(/images/MarketplaceCard1.jpg)",
            }}
          >
             <Button className="bg-white text-black my-3 w-[60%]">
              Cat Food
            </Button>
          </div>

          {/* Card 2 */}
          <div
            className="card h-[20vh] w-[200px] lg:h-[240px] lg:w-[250px]  bg-center bg-contain bg-no-repeat border rounded-2xl lg:rounded-3xl flex flex-col justify-end items-center"
            style={{
              backgroundImage: "url(/images/MarketplaceCard2.jpg)",
            }}
          >
            <Button className="bg-white text-black my-3 w-[60%]">
              Cat Litter
            </Button>
          </div>

          {/* Card 3 */}
          <div
           className="card h-[20vh] w-[200px] lg:h-[240px] lg:w-[250px]  bg-center bg-contain bg-no-repeat border rounded-2xl lg:rounded-3xl flex flex-col justify-end items-center"
            style={{
              backgroundImage: "url(/images/MarketplaceCard3.jpg)",
            }}
          >
            <Button className="bg-white text-black my-3 w-[60%]">
              Dog Food
            </Button>
          </div>

          {/* Card 4 */}
          <div
            className="card h-[20vh] w-[200px] lg:h-[240px] lg:w-[250px]  bg-center bg-contain bg-no-repeat border rounded-2xl lg:rounded-3xl flex flex-col justify-end items-center"
            style={{
              backgroundImage: "url(/images/MarketplaceCard4.jpg)",
            }}
          >
            <Button className="bg-white text-black my-3 w-[60%]">
              Dog Treat
            </Button>

          </div>
        </div>
       </div>
      </div>


      <div className="products h-[90vh] my-3 border">
        <div className="containerr md:w-[80%] h-[90%] p-5 mx-auto border flex flex-wrap  gap-4 justify-center">
            <Product/>
            <Product/>
            <Product/>
            <Product/>
            <Product/>
            <Product/>
        </div>
      </div>
    </div>
  );
}

export default UserMarketplace;
