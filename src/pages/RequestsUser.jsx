import { Button } from "@/components/ui/button";
import { useState } from "react";

const initialRequests = [
  { id: 1, pet: "Buddy", ngo: "Happy Paws NGO", status: "Pending" },
  { id: 2, pet: "Charlie", ngo: "Rescue Me Foundation", status: "Approved" },
  { id: 3, pet: "Bella", ngo: "Safe Haven Pets", status: "Rejected" },
  { id: 1, pet: "Buddy", ngo: "Happy Paws NGO", status: "Pending" },
  { id: 2, pet: "Charlie", ngo: "Rescue Me Foundation", status: "Approved" },
  { id: 3, pet: "Bella", ngo: "Safe Haven Pets", status: "Rejected" },
  { id: 1, pet: "Buddy", ngo: "Happy Paws NGO", status: "Pending" },
  { id: 2, pet: "Charlie", ngo: "Rescue Me Foundation", status: "Approved" },
  { id: 3, pet: "Bella", ngo: "Safe Haven Pets", status: "Rejected" },
];

const RequestsUser = () => {
  const [requests, setRequests] = useState(initialRequests);

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
            {requests.map((req) => (
              <div
                key={req.id}
                className="flex md:flex-row items-start md:items-center justify-between p-3"
              >
                <span className="w-1/3 font-medium">{req.pet}</span>
                <span className="w-1/3 text-gray-500">{req.ngo}</span>
                <div className="w-1/3 flex md:justify-end gap-2">
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${
                      req.status === "Pending" ? "bg-yellow-100 text-yellow-600" :
                      req.status === "Approved" ? "bg-green-100 text-green-600" :
                      "bg-red-100 text-red-600"
                    }`}
                  >
                    {req.status}
                  </span>
                  {req.status === "Pending" && (
                    <Button size="sm" onClick={() => handleCancel(req.id)}>
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
