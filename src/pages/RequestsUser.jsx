import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
const apiURL = import.meta.env.VITE_API_URL;
const myId = sessionStorage.getItem("_id");
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "@/redux/loaderSlice";

const RequestsUser = () => {
  // const [requests, setRequests] = useState(initialRequests);
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const [requests, setRequests] = useState([]);
  const [triggerRender, setTriggerRender] = useState(true); // only for rerender purpose, in useEffect
  // const [request, setRequest] = useState([]);

  useEffect(() => {
    // console.log("hi");
    const getRequest = async () => {
      fetchReqs();
    };
    getRequest();
  }, [triggerRender]);

  const fetchReqs = async () => {
    try {
      dispatch(showLoader());
      let requestData = await axios.post(
        `${apiURL}/api/request/getall`,
        {},
        { headers: { authorization: sessionStorage.getItem("token") } }
      );
      console.log(requestData.data.data); // gives array of objects

      if (requestData.data.data) {
        //IMPORTANT: otherwise it will store undefined in requests which is eventually give massive errro
        setRequests(requestData.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(hideLoader());
    }
  };
  const handleCancel = async (id, petid) => {
    // setRequests(requests.filter((req) => req.id !== id));
    try {
      let response = await axios.post(
        `${apiURL}/api/request/delete`,
        {
          reqID: id,
          petID: petid,
        },
        { headers: { authorization: sessionStorage.getItem("token") } }
      );
      console.log(response);
      if (response.data.success) {
        setTriggerRender(!triggerRender);
      }
    } catch (error) {
      console.log("error while cancel API: ", error);
    }
  };

  return (
    <div
      className={`w-full h-screen p-6 mx-auto md:w-[80%] ${
        isOpen ? "sm:ml-64" : "sm:ml-16"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        My Adoption Requests
      </h2>
      <div className="w-full mx-auto">
        <div className="bg-secondary p-3 rounded-md hidden md:flex justify-between font-semibold">
          <span className="w-1/3">Pet</span>
          <span className="w-1/3">NGO</span>
          <span className="w-1/3 text-right">Status / Action</span>
        </div>

        {requests?.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {requests.map((req, index) =>
              req.reqUserID && myId === req.reqUserID._id ? (
                <div
                  key={index}
                  className="flex md:flex-row items-start md:items-center justify-between p-3"
                >
                  <span className="w-1/3 font-medium">{req.petID.name}</span>
                  <span className="w-1/3 text-gray-500">
                    {req.petID.addedByID.name}
                  </span>
                  <div className="w-1/3 flex md:justify-end gap-2">
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        req.adoptionStatus === "pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : req.adoptionStatus === "approved"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {req.adoptionStatus}
                    </span>
                    {req.adoptionStatus === "pending" && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm">Cancel</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action will cancel your adoption request.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Close</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleCancel(req._id, req.petID)}
                            >
                              Yes, Cancel
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </div>
              ) : null
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No donation requests found.
          </p>
        )}
      </div>
    </div>
  );
};

export default RequestsUser;
