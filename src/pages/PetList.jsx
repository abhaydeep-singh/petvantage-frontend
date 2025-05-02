import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const apiURL = import.meta.env.VITE_API_URL;

const PetList = () => {
  const {category} = useParams();
  const [pets,setPets] = useState([]);
  const [triggerRender,setTriggerRender] = useState(true); // only for rerender purpose, in useEffect
  
  async function fetchPets(){
    try {
      let response = await axios.post(`${apiURL}/api/pet/getbycat`,{
        category:category 
      },{headers:{authorization:sessionStorage.getItem("token")}})
      setPets(response.data.data);
      console.log(response.data.data);
      
      // ngo = response.data.data[0].addedByID.name
      // name = response.data.data[0].name
      // image = response.data.data[0].image

      
    } catch (error) {
      console.log(`An Error occured while fecthing data: ${error}`)
    }
  };

  useEffect(()=>{
    
    const getPets = async()=>{
      await fetchPets();
    }
    getPets();
    
  },[triggerRender])

  async function handleAdoption(id){
    // console.log("adoption button triggered")
    // console.log("id is: ",id);
  
    try {
      let response = await axios.post(`${apiURL}/api/request/add`,{
        petID:id,
        desc:"axios dummy"
      },{headers:{
        authorization:sessionStorage.getItem("token")
      }})
      console.log("response:",response);

      if(response.data.success){
          setTriggerRender(!triggerRender);
      }
      
    } catch (error) {
      console.log("Error while sending adoption request: ", error)
    }
    
  }

  // async function deleteReq(id){

  // }

  return (
    <div className="p-6 mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Available Pets for Adoption</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pets?.length > 0 ? pets.map((pet,index) => (
          <Card key={index} className="p-4 flex flex-col items-center text-center">
            <img src={pet.image} alt={pet.name} className="w-40 h-40 rounded-lg object-cover border" />
            <h3 className="text-lg font-semibold mt-3">{pet.name}</h3>
            <p className="text-gray-500 text-sm">{pet.addedByID.name}</p>
            {/* <Button className={pet.alreadyRequested ? `mt-3 bg-red-500`: ` mt-3`} onClick={() => handleAdoption(pet._id)}>
                {pet.alreadyRequested ? "Cancel Request" : `Adopt ${pet.name}`}
            </Button> */}

            {pet.alreadyRequested ? <Button disabled={true}>Requested</Button> : <Button onClick={() => handleAdoption(pet._id)}>Request Now</Button> }
            

          </Card>
        )) : null}
      </div>
    </div>
  );
};

export default PetList;
