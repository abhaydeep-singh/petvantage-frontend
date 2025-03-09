import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Landing, UserDashboard,UserHome } from "./pages";
import App from "./App.jsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Landing />} />
      <Route path="user-dashboard" element={<UserDashboard />}>
            <Route path="user-home" element={<UserHome/>}/>
      </Route>
      {/* <Route path='contact' element={<Contact />} /> */}
    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App/>  or layout*/}
    <RouterProvider router={router} />
  </StrictMode>
);
