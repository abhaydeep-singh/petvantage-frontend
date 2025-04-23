import { Outlet, useNavigate } from 'react-router-dom'
import './App.css'
import { Landing, UserDashboard } from './pages'
import { useEffect } from 'react'

function App() {
  const navigate = useNavigate();
  useEffect(()=>{
    let token = sessionStorage.getItem("token");
    let userType = sessionStorage.getItem("userType");
    if(!token){
        navigate("/login")
    }
  },[])

  return (
   <>
    <div className='overflow-auto min-h-screen w-full'>
    {/* <Landing/> */}
    {/* <UserDashboard/> */}
    <Outlet/>
    </div>
   </>
  )
}

export default App
