import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Article, Blog, Landing, ManageMarketplace, NGODashboard, PetList, RequestsUser, UserDashboard,UserHome } from "./pages";
import App from "./App.jsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import NGOHome from "./pages/NGOHome";




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Landing />} />
      <Route path="user-dashboard" element={<UserDashboard />}>
            <Route path="user-home" element={<UserHome/>}/>
            <Route path="blog" element={<Blog/>}/>
            <Route path="article" element={<Article/>}/>
            <Route path="pet-list" element={<PetList/>}/>
            <Route path="requests" element={<RequestsUser/>}/>
            
      </Route>

      <Route path="ngo-dashboard" element={<NGODashboard/>}>
            <Route path="ngo-home" element={<NGOHome/>}/>
            <Route path="marketplace" element={<ManageMarketplace/>}/>
            <Route path="blog" element={<Blog/>}/>
            
      </Route>
      {/* <Route path='contact' element={<Contact />} /> */}
    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App/>  or layout*/}
    <ThemeProvider>
    <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
