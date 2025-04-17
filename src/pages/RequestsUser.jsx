import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { UNSAFE_getSingleFetchDataStrategy } from "react-router-dom";
const apiURL = import.meta.env.VITE_API_URL;

// const initialRequests = [
//   { id: 1, pet: "Buddy", ngo: "Happy Paws NGO", status: "Pending" },
//   { id: 2, pet: "Charlie", ngo: "Rescue Me Foundation", status: "Approved" },
//   { id: 3, pet: "Bella", ngo: "Safe Haven Pets", status: "Rejected" },
//   { id: 4, pet: "Buddy", ngo: "Happy Paws NGO", status: "Pending" },
//   { id: 5, pet: "Charlie", ngo: "Rescue Me Foundation", status: "Approved" },
//   { id: 6, pet: "Bella", ngo: "Safe Haven Pets", status: "Rejected" },
//   { id: 7, pet: "Buddy", ngo: "Happy Paws NGO", status: "Pending" },
//   { id: 8, pet: "Charlie", ngo: "Rescue Me Foundation", status: "Approved" },
//   { id: 9, pet: "Bella", ngo: "Safe Haven Pets", status: "Rejected" },
// ];

const RequestsUser = () => {
  // const [requests, setRequests] = useState(initialRequests);
  const [requests, setRequests] = useState([]);
  // const [request, setRequest] = useState([]);

useEffect(()=>{
  // console.log("hi");
  fetchReqs();
  
},[])

const fetchReqs = async()=>{
  let requestData = await axios.post(`${apiURL}/api/request/getall`)
  // console.log(requestData.data.data) // gives array of objects
  
    setRequests(requestData.data.data)
    // console.log(request)
  // adoptionStatus = requestData.data.data[0].adoptionStatus
  // desc = requestData.data.data[0].desc
  // petName = requestData.data.data[0].petID.name
  // ngoName = requestData.data.data[0].petID.addedByID.name
  // reqByUser = requestData.data.data[0].reqUserID.name

  
}
  const handleCancel = (id) => {
    setRequests(requests.filter((req) => req.id !== id));
  };

  return (
    <div className="p-6 mx-auto w-full md:w-[80%]">
      <h2 className="text-2xl font-bold mb-4 text-center">My Adoption Requests</h2>
      <div className="w-full mx-auto">
        <div className="bg-secondary p-3 rounded-md hidden md:flex justify-between font-semibold">
          <span className="w-1/3">Pet</span>
          <span className="w-1/3">NGO</span>
          <span className="w-1/3 text-right">Status / Action</span>
        </div>

        {requests.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {requests.map((req,index) => (
              <div
                key={index}
                className="flex md:flex-row items-start md:items-center justify-between p-3"
              >
                <span className="w-1/3 font-medium">{req.petID.name}</span> 
                <span className="w-1/3 text-gray-500">{req.petID.addedByID.name}</span>
                <div className="w-1/3 flex md:justify-end gap-2">
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${
                      req.adoptionStatus === "pending" ? "bg-yellow-100 text-yellow-600" :
                      req.adoptionStatus === "approved" ? "bg-green-100 text-green-600" :
                      "bg-red-100 text-red-600"
                    }`}
                  >
                    {req.adoptionStatus}
                  </span>
                  {req.adoptionStatus === "pending" && (
                    <Button size="sm" onClick={() => handleCancel(index)}>
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No donation requests found.</p>
        )}
      </div>
    </div>
  );
};

export default RequestsUser;
