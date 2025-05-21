import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { hideLoader, showLoader } from "@/redux/loaderSlice";

const apiURL = import.meta.env.VITE_API_URL;

function AdminNGO() {
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const dispatch = useDispatch();
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNGOs = async () => {
    try {
      dispatch(showLoader());
      const res = await axios.post(`${apiURL}/api/ngo/getall`, {}, {
        headers: { authorization: sessionStorage.getItem("token") }
      });
      setNgos(res.data.data || []);
    } catch (err) {
      console.error('Failed to fetch NGOs', err);
    } finally {
      setLoading(false);
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    fetchNGOs();
  }, []);

  const toggleStatus = async (ngo) => {
    try {
      dispatch(showLoader());
      let response = await axios.post(`${apiURL}/api/ngo/update`, {
        _id: ngo._id,
        status: !ngo.status,
        // status: false,
      }, {
        headers: {
          authorization: sessionStorage.getItem("token")
        }
      });

      // Refetch updated list
      await fetchNGOs();
      console.log(response);
      
    } catch (err) {
      console.error("Error toggling NGO status", err);
    } finally {
      dispatch(hideLoader());
    }
  };

  return (
    <div className={`w-full min-h-screen px-4 py-6 transition-all duration-300 ${isOpen ? "sm:ml-64" : "sm:ml-16"}`}>
      <h2 className="text-2xl font-semibold mb-6 px-3 text-white">Registered NGOs</h2>

      <div className="rounded-lg border border-gray-700 bg-background text-foreground overflow-auto shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[120px]">NGO</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Reg. No.</TableHead>
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
              : ngos.map((ngo) => (
                  <TableRow key={ngo._id}>
                    <TableCell className="flex items-center gap-3">
                      <img
                        src={ngo.image || ngo.userID.image || '/placeholder.jpg'}
                        alt={ngo.userID.name}
                        className="h-8 w-8 rounded-full object-cover border"
                      />
                      <span>{ngo.userID.name}</span>
                    </TableCell>
                    <TableCell>{ngo.userID.email}</TableCell>
                    <TableCell>{ngo.contact}</TableCell>
                    <TableCell>{ngo.regNo}</TableCell>
                    <TableCell>{ngo.address}</TableCell>
                    <TableCell>{new Date(ngo.userID.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="flex flex-col gap-2">
                      <Badge className={`w-fit text-white ${ngo.status ? 'bg-green-600' : 'bg-red-600'}`}>
                        {ngo.status ? 'Active' : 'Inactive'}
                      </Badge>
                      <button
                        onClick={() => toggleStatus(ngo)}
                        className={`text-xs px-2 py-1 rounded font-medium ${
                          ngo.status ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                        } text-white`}
                      >
                        {ngo.status ? 'Block' : 'Unblock'}
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default AdminNGO;
