import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const pets = [
  {
    id: 1,
    name: "Buddy",
    image: "https://placekitten.com/200/200",
    ngo: "Happy Paws NGO",
  },
  {
    id: 2,
    name: "Charlie",
    image: "https://place-puppy.com/200x200",
    ngo: "Rescue Me Foundation",
  },
  {
    id: 3,
    name: "Bella",
    image: "https://placekitten.com/201/201",
    ngo: "Safe Haven Pets",
  },
  {
    id: 1,
    name: "Buddy",
    image: "https://placekitten.com/200/200",
    ngo: "Happy Paws NGO",
  },
  {
    id: 2,
    name: "Charlie",
    image: "https://place-puppy.com/200x200",
    ngo: "Rescue Me Foundation",
  },
  {
    id: 3,
    name: "Bella",
    image: "https://placekitten.com/201/201",
    ngo: "Safe Haven Pets",
  },
  {
    id: 1,
    name: "Buddy",
    image: "https://placekitten.com/200/200",
    ngo: "Happy Paws NGO",
  },
  {
    id: 2,
    name: "Charlie",
    image: "https://place-puppy.com/200x200",
    ngo: "Rescue Me Foundation",
  },
  {
    id: 3,
    name: "Bella",
    image: "https://placekitten.com/201/201",
    ngo: "Safe Haven Pets",
  },
  {
    id: 1,
    name: "Buddy",
    image: "https://placekitten.com/200/200",
    ngo: "Happy Paws NGO",
  },
  {
    id: 2,
    name: "Charlie",
    image: "https://place-puppy.com/200x200",
    ngo: "Rescue Me Foundation",
  },
  {
    id: 3,
    name: "Bella",
    image: "https://placekitten.com/201/201",
    ngo: "Safe Haven Pets",
  },
];

const PetList = () => {
  // const handleAdopt = (petName) => {
  //   alert(`Adoption request sent for ${petName}!`);
  // };

  return (
    <div className="p-6 mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Available Pets for Adoption</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <Card key={pet.id} className="p-4 flex flex-col items-center text-center">
            <img src={pet.image} alt={pet.name} className="w-40 h-40 rounded-lg object-cover border" />
            <h3 className="text-lg font-semibold mt-3">{pet.name}</h3>
            <p className="text-gray-500 text-sm">{pet.ngo}</p>
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
