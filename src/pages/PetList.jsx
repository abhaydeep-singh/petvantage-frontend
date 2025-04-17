import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const apiURL = import.meta.env.VITE_API_URL;

// const pets = [
//   {
//     id: 1,
//     name: "Buddy",
//     image: "https://placekitten.com/200/200",
//     ngo: "Happy Paws NGO",
//   },
//   {
//     id: 2,
//     name: "Charlie",
//     image: "https://place-puppy.com/200x200",
//     ngo: "Rescue Me Foundation",
//   },
//   {
//     id: 3,
//     name: "Bella",
//     image: "https://placekitten.com/201/201",
//     ngo: "Safe Haven Pets",
//   },
//   {
//     id: 1,
//     name: "Buddy",
//     image: "https://placekitten.com/200/200",
//     ngo: "Happy Paws NGO",
//   },
//   {
//     id: 2,
//     name: "Charlie",
//     image: "https://place-puppy.com/200x200",
//     ngo: "Rescue Me Foundation",
//   },
//   {
//     id: 3,
//     name: "Bella",
//     image: "https://placekitten.com/201/201",
//     ngo: "Safe Haven Pets",
//   },
//   {
//     id: 1,
//     name: "Buddy",
//     image: "https://placekitten.com/200/200",
//     ngo: "Happy Paws NGO",
//   },
//   {
//     id: 2,
//     name: "Charlie",
//     image: "https://place-puppy.com/200x200",
//     ngo: "Rescue Me Foundation",
//   },
//   {
//     id: 3,
//     name: "Bella",
//     image: "https://placekitten.com/201/201",
//     ngo: "Safe Haven Pets",
//   },
//   {
//     id: 1,
//     name: "Buddy",
//     image: "https://placekitten.com/200/200",
//     ngo: "Happy Paws NGO",
//   },
//   {
//     id: 2,
//     name: "Charlie",
//     image: "https://place-puppy.com/200x200",
//     ngo: "Rescue Me Foundation",
//   },
//   {
//     id: 3,
//     name: "Bella",
//     image: "https://placekitten.com/201/201",
//     ngo: "Safe Haven Pets",
//   },
// ];

const PetList = () => {
  const {category} = useParams();
  const [pets,setPets] = useState([]);
  
  async function fetchPets(){
    try {
      let response = await axios.post(`${apiURL}/api/pet/getbycat`,{
        category:category 
      })
      setPets(response.data.data);
      // ngo = response.data.data[0].addedByID.name
      // name = response.data.data[0].name
      // image = response.data.data[0].image

      
    } catch (error) {
      console.log(`An Error occured while fecthing data: ${error}`)
    }
  };

  useEffect(()=>{
    
    fetchPets()
    
  },[])


  return (
    <div className="p-6 mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Available Pets for Adoption</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pets.map((pet,index) => (
          <Card key={index} className="p-4 flex flex-col items-center text-center">
            <img src={pet.image} alt={pet.name} className="w-40 h-40 rounded-lg object-cover border" />
            <h3 className="text-lg font-semibold mt-3">{pet.name}</h3>
            <p className="text-gray-500 text-sm">{pet.addedByID.name}</p>
            <Button className="mt-3">
              Adopt {pet.name}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PetList;
