import { Outlet } from 'react-router-dom'
import './App.css'
import { Landing, UserDashboard } from './pages'
function App() {
  

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
