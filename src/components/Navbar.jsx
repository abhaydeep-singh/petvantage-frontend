import React from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'


function Navbar() {
  const navigate = useNavigate();
  return (
    <div className='text-white h-[10vh] hidden md:flex items-center justify-between px-8  '>
        <div className="logo text-3xl font-bold text-primary">PetVantage</div>
      <ul className='flex'>
        <li><Button variant="default">Home</Button></li>
        <li><Button variant="ghost">About Us</Button></li>
        <li><Button variant="ghost">Sign Up</Button></li>
        <li><Button variant="ghost">Contact US</Button></li>
        <li><Button variant="ghost" onClick={()=>navigate("/login")}>Login</Button></li>
    </ul>
    </div>
  )
}

export default Navbar
