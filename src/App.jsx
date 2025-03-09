import './App.css'
import { Landing, UserDashboard } from './pages'
function App() {
  

  return (
   <>
    <div className='dark bg-background overflow-auto min-h-screen w-full'>
    {/* <Landing/> */}
    <UserDashboard/>
    </div>
   </>
  )
}

export default App
