import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Article, Blog, Community, Landing, ManageMarketplace, ManageRequests, NGODashboard, PetList, RequestsUser, UserDashboard,UserHome, UserMarketplace } from "./pages";
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
            <Route path="marketplace" element={<UserMarketplace/>}/>
            <Route path="community" element={<Community/>}/>
            
            
      </Route>

      <Route path="ngo-dashboard" element={<NGODashboard/>}>
            <Route path="ngo-home" element={<NGOHome/>}/>
            <Route path="marketplace" element={<ManageMarketplace/>}/>
            <Route path="blog" element={<Blog/>}/>
            <Route path="community" element={<Community/>}/>
            <Route path="requests" element={<ManageRequests/>}/>

            
      </Route>
      {/* <Route path='contact' element={<Contact />} /> */}
    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App/>  or layout*/}
    <ThemeProvider defaultTheme="dark">
    <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
