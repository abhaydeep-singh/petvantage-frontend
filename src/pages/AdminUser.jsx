import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { hideLoader, showLoader } from "@/redux/loaderSlice";
const apiURL = import.meta.env.VITE_API_URL;

function AdminUser() {
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const dispatch = useDispatch();
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchNGOs = async () => {
      try {
        dispatch(showLoader());
        const res = await axios.post(`${apiURL}/api/petseeker/get`,{},{headers:{authorization:sessionStorage.getItem("token")}});
        console.log(res); 
        setNgos(res.data.data || []);
      } catch (err) {
        console.error('Failed to fetch Pet Seekers', err);
      } finally {
        setLoading(false);
        dispatch(hideLoader());
      }
    };
    fetchNGOs();
  }, []);

  return (
  <div className={`w-full min-h-screen px-4 py-6 transition-all duration-300 ${isOpen ? "sm:ml-64" : "sm:ml-16"}`}>
    <h2 className="text-2xl font-semibold mb-6 px-3 text-white">Registered PetSeekers</h2>

    <div className="rounded-lg border border-gray-700 bg-background text-foreground overflow-auto shadow-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[120px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 7 }).map((_, j) => (
                    <TableCell key={j}><Skeleton className="h-4 w-full" /></TableCell>
                  ))}
                </TableRow>
              ))
            : ngos.map((ngo) => {
                const user = ngo.userID || {};
                const image = user.image || '/placeholder.jpg';

                return (
                  <TableRow key={ngo._id}>
                    <TableCell className="flex items-center gap-3">
                      <img
                        src={image}
                        alt={user.name || 'NGO'}
                        className="h-8 w-8 rounded-full object-cover border"
                      />
                      <span>{user.name}</span>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{ngo.contact}</TableCell>
                    <TableCell>{ngo.address}</TableCell>
                    <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge className={`text-white ${user.status ? 'bg-green-600' : 'bg-red-600'}`}>
                        {user.status ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
        </TableBody>
      </Table>
    </div>
  </div>
);

}

export default AdminUser;
