import React, { useState } from 'react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Menu and Close icons

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false); // close menu on link click
  };

  return (
    <header className='text-white h-[10vh] flex items-center justify-between px-6 md:px-10 relative shadow-sm bg-background'>
      <div className="logo text-3xl font-bold text-primary cursor-pointer" onClick={() => handleNavigate('/')}>
        PetVantage
      </div>

      {/* Desktop menu */}
      <nav className='hidden md:flex space-x-6'>
        <Button variant="default" onClick={() => handleNavigate('/')}>Home</Button>
        <Button variant="ghost" onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>About Us</Button>
        <Button variant="ghost" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>Contact Us</Button>
        <Button variant="ghost" onClick={() => handleNavigate('/login/register')}>Sign Up</Button>
        <Button variant="ghost" onClick={() => handleNavigate('/login/login')}>Login</Button>
      </nav>

      {/* Mobile hamburger */}
      <div className='md:hidden z-20'>
        <Button variant="ghost" size="icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile dropdown menu */}
      <nav className={`absolute top-[10vh] right-0 w-full bg-background z-20 shadow-md transition-all duration-300 ease-in-out md:hidden ${menuOpen ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>

        <ul className='flex flex-col items-center py-4 space-y-4'>
          <li>
            <Button variant="default" className="w-3/4" onClick={() => handleNavigate('/')}>
              Home
            </Button>
          </li>

          <li>
            <Button variant="ghost" className="w-3/4" onClick={() => {
              setMenuOpen(false)
              document.getElementById('about').scrollIntoView({ behavior: 'smooth' })
            }}>
              About US
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-3/4" onClick={() => {
              setMenuOpen(false)
              document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })
            }}>
              Contact Us
            </Button>
          </li>

          <li>
            <Button variant="ghost" className="w-3/4" onClick={() => handleNavigate('/login/register')}>
              Sign Up
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-3/4" onClick={() => handleNavigate('/login/login')}>
              Login
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar;
