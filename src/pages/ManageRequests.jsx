import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"


const ManageRequests = () => {
  const adoptionRequests = [
    {
      id: 1,
      petName: "Bruno",
      user: { name: "Abhay", email: "abhay@example.com", phone: "9876543210" },
    },
    {
      id: 2,
      petName: "Lucy",
      user: { name: "Nikki", email: "nikki@example.com", phone: "9123456780" },
    },
    {
        id: 1,
        petName: "Bruno",
        user: { name: "Abhay", email: "abhay@example.com", phone: "9876543210" },
      },
      {
        id: 2,
        petName: "Lucy",
        user: { name: "Nikki", email: "nikki@example.com", phone: "9123456780" },
      },
      {
        id: 1,
        petName: "Bruno",
        user: { name: "Abhay", email: "abhay@example.com", phone: "9876543210" },
      },
      {
        id: 2,
        petName: "Lucy",
        user: { name: "Nikki", email: "nikki@example.com", phone: "9123456780" },
      },
      {
        id: 1,
        petName: "Bruno",
        user: { name: "Abhay", email: "abhay@example.com", phone: "9876543210" },
      },
      {
        id: 2,
        petName: "Lucy",
        user: { name: "Nikki", email: "nikki@example.com", phone: "9123456780" },
      },
    // Add more requests as needed
  ]

  const adoptionHistory = [
    {
      id: 11,
      petName: "Simba",
      user: { name: "Raj", email: "raj@example.com" },
      status: "Approved",
    },
    {
      id: 12,
      petName: "Milo",
      user: { name: "Anya", email: "anya@example.com" },
      status: "Rejected",
    },
    {
        id: 11,
        petName: "Simba",
        user: { name: "Raj", email: "raj@example.com" },
        status: "Approved",
      },
      {
        id: 12,
        petName: "Milo",
        user: { name: "Anya", email: "anya@example.com" },
        status: "Rejected",
      },
      {
        id: 11,
        petName: "Simba",
        user: { name: "Raj", email: "raj@example.com" },
        status: "Approved",
      },
      {
        id: 12,
        petName: "Milo",
        user: { name: "Anya", email: "anya@example.com" },
        status: "Rejected",
      },

  ]

  return (
    <div className={`w-full h-screen min-h-screen  p-4 md:p-8 bg-background text-foreground ${false ? "sm:ml-64" : "sm:ml-16"}`}>
      <h1 className="text-2xl font-bold mb-6">Adoption Requests</h1>
        
      <ScrollArea className="h-[59vh] w-full rounded-md border p-4" >
      <div className="flex flex-wrap gap-4 justify-center mb-10">
        {adoptionRequests.map((req) => (
          <Card key={req.id} className="w-full sm:w-[48%] lg:w-[18%] bg-muted/40">
            <CardContent className="p-4 space-y-4">
              <h2 className="text-lg font-semibold text-primary">🐾 {req.petName}</h2>
              <Separator />
              <p>
                <span className="font-medium text-foreground">Name:</span>{" "}
                <span className="text-muted-foreground">{req.user.name}</span>
              </p>
              <p>
                <span className="font-medium text-foreground">Email:</span>{" "}
                <span className="text-muted-foreground">{req.user.email}</span>
              </p>
              <p>
                <span className="font-medium text-foreground">Phone:</span>{" "}
                <span className="text-muted-foreground">{req.user.phone}</span>
              </p>
              <div className="flex gap-2 pt-2">
                <Button className="flex-1">Approve</Button>
                <Button variant="destructive" className="flex-1">
                  Reject
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      </ScrollArea>
      <br />
      <h2 className="text-xl font-bold mb-4">History</h2>

      
      <ScrollArea className="h-[200px] w-full rounded-md border p-4" >
      <div className="flex flex-col gap-3">
        {adoptionHistory.map((h) => (
          <Card key={h.id} className="bg-muted/30">
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{h.petName}</h3>
                <p className="text-sm text-muted-foreground">{h.user.name} — {h.user.email}</p>
              </div>
              <span
                className={`text-sm font-medium px-3 py-1 rounded-full ${
                  h.status === "Approved"
                    ? "bg-green-500/20 text-green-500"
                    : "bg-red-500/20 text-red-500"
                }`}
              >
                {h.status}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
      </ScrollArea>
    </div>
  )
}

export default ManageRequests
