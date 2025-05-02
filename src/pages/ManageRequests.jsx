import React, { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import axios from "axios"
import { handler } from "tailwindcss-animate"

const apiURL = import.meta.env.VITE_API_URL;
const myID = sessionStorage.getItem("_id")


const ManageRequests = () => {
  const [requests,setRequests] = useState([]);
  const [trigger,setTrigger] = useState(true);

  async function fetchRequests(){
    try {
      let response = await axios.post(`${apiURL}/api/request/getall`,{},{
        headers:{
          authorization:sessionStorage.getItem("token")
        }
      })
      setRequests(response.data.data)
      console.log(response.data.data);
      // console.log(response.data.data[0].petID.addedByID._id === myID ? "matched" : "False");
      // console.log(response.data.data[0].petID.addedByID._id, myID);
    } catch (error) {
      console.log("Something went wrong while fething Requests: ",error)
    }
    
  };


  useEffect(() => { //UseEffect cannot be async itself, coz it do now return a promise, instead it return a cleanup function
    const getRequests = async () => { //IMPORTANT to declare it in await coz that fn in async, otherwise react quickly move on without waiting to fetch 
      await fetchRequests()
    }
    getRequests()
  }, [trigger])


  async function handleRequest(id,status){
    // console.log("handel req. called");
    try {
      let response = await axios.post(`${apiURL}/api/request/update`,{
        reqID:id,
        adoptionStatus:status
      },{headers:{
        authorization:sessionStorage.getItem("token")
      }})
      setTrigger(!trigger)
      console.log(response)
    } catch (error) {
      console.log("Failed to Update Request, Error: ",error)
    }
  }
  return (
    <div className={`w-full h-screen min-h-screen  p-4 md:p-8 bg-background text-foreground ${false ? "sm:ml-64" : "sm:ml-16"}`}>
      <h1 className="text-2xl font-bold mb-6">Adoption Requests</h1>
        
      <ScrollArea className="h-[59vh] w-full rounded-md border p-4" >
      <div className="flex flex-wrap gap-4 justify-center mb-10">


        {requests?.length > 0 ? requests.map((req, index) =>  {return (req.petID.addedByID._id == myID && req.adoptionStatus == "pending") ? (
          <Card key={index} className="w-full sm:w-[48%] lg:w-[18%] bg-muted/40">
            <CardContent className="p-4 space-y-4">
              <h2 className="text-lg font-semibold text-primary">🐾 {req.petID.name}</h2>
              <Separator />
              <p>
                <span className="font-medium text-foreground">Name:</span>{" "}
                {req.reqUserID && <span className="text-muted-foreground">{req.reqUserID.name}</span>}
              </p>
              <p>
                <span className="font-medium text-foreground">Email:</span>{" "}
                {req.reqUserID && <span className="text-muted-foreground">{req.reqUserID.email}</span>}
              </p>
              <p>
                <span className="font-medium text-foreground">Phone:</span>{" "}
                <span className="text-muted-foreground">{"78787878787"}</span>
              </p>
              <div className="flex gap-2 pt-2">
                <Button className="flex-1" onClick={()=>{handleRequest(req._id,"aprooved")}}>Approve</Button>
                <Button variant="destructive" className="flex-1" onClick={()=>{handleRequest(req._id,"rejected")}}> 
                  Reject
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : null}) : null}
      </div>
      </ScrollArea>
      <br />



      
      <h2 className="text-xl font-bold mb-4">History</h2>
      
      <ScrollArea className="h-[200px] w-full rounded-md border p-4" >
      <div className="flex flex-col gap-3">
        {requests?.length > 0 ? requests.map((req,index) =>{return req.adoptionStatus != "pending" ? (
          <Card key={index} className="bg-muted/30">
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{req.petID.name}</h3>
                {req.reqUserID ? <p className="text-sm text-muted-foreground">{req.reqUserID.name} — {req.reqUserID.email}</p> : null}
              </div>
              <div className="flex gap-2">
              <span
                className={`text-sm font-medium px-3 py-1 rounded-full ${
                  req.adoptionStatus === "aprooved"
                    ? "bg-green-500/20 text-green-500"
                    : "bg-red-500/20 text-red-500"
                }`}
              >
                {req.adoptionStatus}
              </span>
              <Button variant="destructive" onClick={()=>{handleRequest(req._id,"pending")}}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        ) : null } )  : null}
      </div>
      </ScrollArea>
    </div>
  )
}

export default ManageRequests
