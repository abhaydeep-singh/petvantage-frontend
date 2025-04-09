import { DonationChart } from '@/components'
import { Button } from '@/components/ui/button'
import React from 'react'

function NGOHome() {
  return (
    // sm:ml-64 is open
    <div className={`w-full h-screen ${false ? "sm:ml-64" : "sm:ml-16"}`}> 
    <div className="hero relative h-[40vh] w-full border flex items-center justify-center bg-cover bg-center"
     style={{
            backgroundImage: `url(/images/cat.jpg)`,
          }} >
             {/* Dark Overlay for Readability, Relative to make it in front */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    <h1 className=' relative font-bold text-primary text-3xl md:text-4xl'>Welcome to NGO Dashboard</h1>
    </div>
    {/* Adoption Section */}
      <div className="adpotion flex flex-col md:flex-row md:justify-center p-4 border">
      <DonationChart/>
      <div className="text rounded-2xl m-2 p-4 flex flex-col gap-10 items-center">
        <h2 className='text-2xl'>🐾 Manage Adoptions Efficiently</h2>
        {/* <br /> */}
        <p className='text-sm'>Track pet adoption progress, update statuses, and ensure every pet finds a loving home. Take action with just a click!</p>
        <Button>Manage Adoptions</Button>
      </div>
      </div>

    {/* Pet Marketplace Management */}




    </div>
  )
}

export default NGOHome
