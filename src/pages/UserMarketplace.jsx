import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import welcome from "../assets/svg/welcome.svg"; // img src={welcome}
import dogWalking from "../assets/svg/dog-walking.svg";
import { ParticlesBackground, Product } from "@/components";

import { Heart } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
const apiURL = import.meta.env.VITE_API_URL;


function UserMarketplace() {
  const [ products, setProducts ] = useState([]);
  async function fetchProducts(){
    try {
      let response = await axios.post(`${apiURL}/api/product/all`,{},{headers:{
        authorization:sessionStorage.getItem("token")
      }});

      console.log(response.data.data);
      setProducts(response.data.data);
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
    const getProducts = async ()=>{ fetchProducts() }
    getProducts();
  },[])
  return (
    <div className={`w-full h-screen ${false ? "sm:ml-64" : "sm:ml-16"}`}>
      
      <br />
      <div className="heroslider gap-6 h-[40vh] w-full flex flex-col md:flex-row md:gap-20 items-center justify-center ">
        
        <div className="text">
          <h1 className="text-3xl lg:text-5xl font-extrabold text-primary ">
            TOYS FOR EVERY TAIL
          </h1>
          <p className="text-sm md:text-xl my-2 text-center md:text-left">
            Chew Toys | Nutrition | Feed | Interactive Toys
          </p>
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
            <p className="text-sm lg:text-xl my-2">
              These might be what you're looking for!
            </p>
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


          {/* Products section */}
      <div className="products min-h-[90vh]  my-10 ">
        <div className="containerr md:w-[80%] h-[90%] p-5 mx-auto rounded-2xl bg-accent">
          <div className="w-full flex justify-center md:justify-end p-3">
          <Select>
            <SelectTrigger className="w-[180px] bg-background">
              <SelectValue placeholder="Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dogfood">Dog Food</SelectItem>
              <SelectItem value="catfood">Cat Food</SelectItem>
              <SelectItem value="toys">Pet Toys</SelectItem>
              <SelectItem value="toys">Bird Cages</SelectItem>
              <SelectItem value="toys">Bird Food</SelectItem>
              <SelectItem value="toys">Others...</SelectItem>
            </SelectContent>
          </Select>
          </div>

          <div className="flex flex-wrap gap-6 justify-center">
            {products?.length > 0 ? products.map((item,index)=>{
                return(
                  <div key={index} className="card bg-gray-600 overflow-hidden p-2 h-[30vh] md:h-[22vh] w-[300px] md:w-[200px] lg:h-[240px] lg:w-[250px]  bg-center bg-contain bg-no-repeat border rounded-2xl lg:rounded-3xl flex flex-col justify-end items-center gap-1">
                          <div
                            className="img bg-gray-600 w-full h-[80%] bg-center bg-cover bg-no-repeat "
                            style={{
                              backgroundImage: `url(${item.image})`,
                            }}
                          ></div>
                          <div className="w-full flex items-center justify-center gap-3">
                            <Button className="bg-white text-black my-3 w-[60%] ">
                              Add To Cart
                            </Button>
                            <Heart className="hover:fill-red-600" color="red" size={35} />
                          </div>
                        </div>
                )
            }) : null}

            {/* <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product /> */}
          </div>
        </div>
      </div>
      <footer className="bg-secondary text-white py-4 px-6 text-center">
      <p className="text-sm">&copy; {new Date().getFullYear()} PetVantage. All rights reserved.</p>
    </footer>
    </div>
  );
}

export default UserMarketplace;
