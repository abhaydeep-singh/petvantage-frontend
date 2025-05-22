import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "@/redux/loaderSlice";
import { ToastContainer, toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const apiURL = import.meta.env.VITE_API_URL;

function AdminShowPets() {
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [pets, setPets] = useState([]);
  const [editingPet, setEditingPet] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [editForm, setEditForm] = useState({
    name: "",
    breed: "",
    category: "",
    description: "",
    image: "",
    file: null,
  });

  const fetchPets = async () => {
    try {
      dispatch(showLoader());
      const response = await axios.post(
        `${apiURL}/api/pet/getall`,
        {},
        {
          headers: {
            authorization: sessionStorage.getItem("token"),
          },
        }
      );
      setPets(response.data.data || []);
    } catch (error) {
      console.error("Error fetching pets:", error);
    } finally {
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleDelete = async (id) => {
    try {
      dispatch(showLoader());
      let response = await axios.post(
        `${apiURL}/api/pet/delete`,
        { _id: id },
        {
          headers: { authorization: sessionStorage.getItem("token") },
        }
      );
      setPets(pets.filter((p) => p._id !== id));
      console.log(response);
    } catch (err) {
      console.error("Failed to delete pet", err);
    } finally {
      dispatch(hideLoader());
    }
  };

  const handleEditClick = (pet) => {
    setEditingPet(pet);
    setEditForm({ ...pet, file: null });
    setIsEditDialogOpen(true); // open the dialog
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setEditForm((prev) => ({
        ...prev,
        file: files[0],
        image: URL.createObjectURL(files[0]),
      }));
    } else {
      setEditForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEditSubmit = async () => {
    try {
      dispatch(showLoader());
      setLoading(true);
      const formData = new FormData();
      formData.append("_id", editingPet._id);
      formData.append("name", editForm.name);
      formData.append("breed", editForm.breed);
      formData.append("category", editForm.category);
      formData.append("description", editForm.description);
      if (editForm.file) formData.append("image", editForm.file);

      let response = await axios.post(`${apiURL}/api/pet/update`, formData, {
        headers: {
          authorization: sessionStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });

      await fetchPets(); // refresh list
      if (response.data.success) {
        toast.success("Pet Updated Successfully!", { theme: "dark" });
        setIsEditDialogOpen(false); // close the dialog
        setEditingPet(null);
      } else {
        toast.warn(`Error while Updating pet: ${response.data.message}`, {
          theme: "dark",
        });
      }
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      dispatch(hideLoader());
       setLoading(false);
    }
  };

  return (
    <div
      className={`w-full min-h-screen bg-background p-6 ${
        isOpen ? "sm:ml-64" : "sm:ml-16"
      }`}
    >
      <ToastContainer />
      <h1 className="text-2xl font-bold text-primary mb-6">Manage Pets</h1>

      {pets.length === 0 ? (
        <div className="text-center text-muted-foreground text-lg font-semibold mt-10">
          No Pets Found
        </div>
      ) : (
        <div className="overflow-x-auto rounded-md shadow-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Photo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Breed</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pets.map((pet) => (
                <TableRow key={pet._id}>
                  <TableCell>
                    <img
                      src={pet.image}
                      alt={pet.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-semibold">{pet.name}</TableCell>
                  <TableCell>
                    {pet.alreadyRequested ? "Requested" : "Available"}
                  </TableCell>
                  <TableCell className="capitalize">{pet.category}</TableCell>
                  <TableCell>{pet.breed}</TableCell>
                  <TableCell className="flex gap-2">
                    {/* Edit Dialog */}
                    <Dialog
                      open={isEditDialogOpen}
                      onOpenChange={setIsEditDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditClick(pet)}
                        >
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Pet</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Input
                            name="name"
                            value={editForm.name}
                            onChange={handleFormChange}
                            placeholder="Name"
                          />
                          <Input
                            name="breed"
                            value={editForm.breed}
                            onChange={handleFormChange}
                            placeholder="Breed"
                          />
                          <Input
                            name="category"
                            value={editForm.category}
                            onChange={handleFormChange}
                            placeholder="Category"
                          />
                          <Input
                            name="description"
                            value={editForm.description}
                            onChange={handleFormChange}
                            placeholder="Description"
                          />
                          <Input
                            type="file"
                            name="image"
                            onChange={handleFormChange}
                          />
                          {editForm.image && (
                            <img
                              src={editForm.image}
                              alt="Preview"
                              className="h-24 mt-2 rounded"
                            />
                          )}
                          {loading?(<ClipLoader color="#FACC15" />):(<Button onClick={handleEditSubmit}>Save</Button>)}
                          
                        </div>
                      </DialogContent>
                    </Dialog>

                    {/* Delete Alert */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        </AlertDialogHeader>
                        <p>
                          This action cannot be undone. This will permanently
                          delete the pet.
                        </p>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(pet._id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default AdminShowPets;
