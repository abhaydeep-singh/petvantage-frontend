import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { hideLoader, showLoader } from "@/redux/loaderSlice";

const apiURL = import.meta.env.VITE_API_URL;

function AdminUser() {
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      dispatch(showLoader());
      const res = await axios.post(`${apiURL}/api/petseeker/get`, {}, { headers: { authorization: sessionStorage.getItem("token") } });
      setUsers(res.data.data || []);
      // console.log(res.data.data);
      
    } catch (err) {
      console.error('Failed to fetch Pet Seekers', err);
    } finally {
      setLoading(false);
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleStatus = async (user) => {
    try {
      dispatch(showLoader());
      // toggle status
      const newStatus = !user.status;
      // send update request
      let response = await axios.post(`${apiURL}/api/petseeker/update`, {
        _id: user._id,
        status: newStatus
      }, { headers: { authorization: sessionStorage.getItem("token") } });

      // refetch users to update UI
      console.log(response);
      
      await fetchUsers();
    } catch (err) {
      console.error('Failed to update status', err);
    } finally {
      dispatch(hideLoader());
    }
  };

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
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 8 }).map((_, j) => (
                    <TableCell key={j}><Skeleton className="h-4 w-full" /></TableCell>
                  ))}
                </TableRow>
              ))
              : users.map((userData) => {
                const user = userData.userID || {};
                const image = user.image || '/placeholder.jpg';

                return (
                  <TableRow key={userData._id}>
                    <TableCell className="flex items-center gap-3">
                      <img
                        src={image}
                        alt={user.name || 'User'}
                        className="h-8 w-8 rounded-full object-cover border"
                      />
                      <span>{user.name}</span>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{userData.contact}</TableCell>
                    <TableCell>{userData.address}</TableCell>
                    <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge className={`text-white ${userData.status ? 'bg-green-600' : 'bg-red-600'}`}>
                        {userData.status ? 'Active' : 'Inactive'}
                        {/* {user.status} */}
                      </Badge>
                      
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => toggleStatus(userData)}
                        className={`px-3 py-1 rounded text-white ${
                          userData.status ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                        }`}
                      >
                        {userData.status ? 'Block' : 'Unblock'}
                      </button>
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
