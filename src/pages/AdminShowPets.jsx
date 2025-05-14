import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux"
import { hideLoader, showLoader } from "@/redux/loaderSlice"

const apiURL = import.meta.env.VITE_API_URL;

function AdminShowPets() {
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const dispatch = useDispatch();
  const [pets, setPets] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [viewMode, setViewMode] = useState("table"); // selector for card/table

  const fetchPets = async () => {
    try {
      dispatch(showLoader());
      const response = await axios.post(`${apiURL}/api/pet/getall`, {}, {
        headers: {
          authorization: sessionStorage.getItem("token")
        }
      });
      console.log(response.data.data);
      
      const allPets = response.data.data || [];

      // Filter only the pets added by the current user
      const userId = sessionStorage.getItem("_id");
      const myPets = allPets.filter(pet => pet.addedByID === userId);

    //   setPets(myPets);
    setPets(response.data.data);

    } catch (error) {
      console.log("An error occurred while fetching Pets: ", error);
    }
    finally{
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const filteredPets = pets
    .filter((pet) => !categoryFilter || pet.category === categoryFilter)
    .sort((a, b) => {
      if (sortOption === "category") return a.category.localeCompare(b.category);
      if (sortOption === "breed") return a.breed.localeCompare(b.breed);
      return 0;
    });

  return (
    <div className={`w-full min-h-screen bg-background p-6 ${isOpen ? "sm:ml-64" : "sm:ml-16"}`}>
      {/* Top Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-primary">Manage Pets</h1>

        <div className="flex flex-wrap gap-4">
          {/* Filter by Category */}
          {/* <Select onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dog">Dogs</SelectItem>
              <SelectItem value="rabbit">Rabbits</SelectItem>
              <SelectItem value="cat">Cats</SelectItem>
              <SelectItem value="bird">Birds</SelectItem>
            </SelectContent>
          </Select> */}

          {/* Sort Option */}
          {/* <Select onValueChange={setSortOption}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="category">Category</SelectItem>
              <SelectItem value="breed">Breed</SelectItem>
            </SelectContent>
          </Select> */}

          {/* Toggle View */}
          {/* <Button variant="outline" onClick={() => setViewMode(viewMode === "card" ? "table" : "card")}>
            {viewMode === "card" ? "Show Table View" : "Show Card View"}
          </Button> */}
        </div>
      </div>

     
      {/* View Modes */}
{filteredPets.length === 0 ? (
  <div className="text-center text-muted-foreground text-lg font-semibold mt-10">
    No Pets Found
  </div>
) : viewMode === "card" ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {filteredPets.map((pet) => (
      <Card key={pet._id} className="bg-background border-primary/10 shadow-md hover:shadow-primary/20 transition">
        <CardContent className="flex flex-col items-center p-4">
          <img src={pet.image} alt={pet.name} className="w-32 h-32 rounded-full object-cover mb-4" />
          <h2 className="text-lg font-semibold text-primary mb-2">{pet.name}</h2>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            pet.status === "Adopted" ? "bg-green-600 text-white" :
            pet.status === "Requested" ? "bg-yellow-500 text-white" :
            "bg-blue-500 text-white"
          }`}>
            {pet.status}
          </span>
        </CardContent>
      </Card>
    ))}
  </div>
) : (
  <div className="overflow-x-auto rounded-md shadow-md">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Photo</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Breed</TableHead>
          <TableHead>NGO Name </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredPets.map((pet) => (
          <TableRow key={pet._id}>
            <TableCell>
              <img src={pet.image} alt={pet.name} className="w-12 h-12 rounded-full object-cover" />
            </TableCell>
            <TableCell className="font-semibold">{pet.name}</TableCell>
            <TableCell>
              {pet.alreadyRequested ? "Requested" : "Available" }
            </TableCell>
            <TableCell className="capitalize">{pet.category}</TableCell>
            <TableCell>{pet.breed}</TableCell>
            <TableCell>{pet.addedByID && pet.addedByID.name}</TableCell>              
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
)}

    </div>
  );
}

export default AdminShowPets;
