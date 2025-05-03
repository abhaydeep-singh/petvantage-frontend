import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";

const apiURL = import.meta.env.VITE_API_URL;

export function AddPet({ open, setOpen }) {
  const [petName, setPetName] = useState("");
  const [breed, setBreed] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const breedOptions = {
    dogs: ["Labrador", "Bulldog", "Beagle", "German Shepherd"],
    cats: ["Persian", "Siamese", "Maine Coon", "Bengal"],
    rabbits: ["Holland Lop", "Netherland Dwarf", "Flemish Giant"],
    birds: ["Parrot", "Cockatiel", "Canary", "Budgie"],
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", petName);
      formData.append("breed", breed);
      formData.append("category", category);
      formData.append("image", image);
      formData.append("desc", description);

      let response = await axios.post(`${apiURL}/api/pet/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: sessionStorage.getItem("token"),
        },
      });

      console.log(response);

      if (response.data.success) {
        toast.success("Pet Added Successfully!", { theme: "dark" });
        setOpen(false);
      } else {
        toast.warn(`Error while adding pet: ${response.data.message}`, { theme: "dark" });
      }
    } catch (error) {
      console.log("Error while Adding Pet: ", error);
      toast.error("Something went wrong while adding pet", { theme: "dark" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <ToastContainer />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add New Pet</AlertDialogTitle>
          <AlertDialogDescription>
            Add pet details for adoption!
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="grid gap-4 py-4">
          {/* Image Upload */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">Photo</Label>
            <div className="col-span-3">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Pet Preview"
                  className="mt-2 h-20 w-20 object-cover rounded-md border"
                />
              )}
            </div>
          </div>

          {/* Pet Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="petName" className="text-right">Pet Name</Label>
            <Input
              id="petName"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              className="col-span-3"
            />
          </div>

          {/* Category */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">Category</Label>
            <Select
              value={category}
              onValueChange={(val) => {
                setCategory(val);
                setBreed("");
              }}
            >
              <SelectTrigger className="col-span-3" id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dogs">Dogs</SelectItem>
                <SelectItem value="cats">Cats</SelectItem>
                <SelectItem value="rabbits">Rabbits</SelectItem>
                <SelectItem value="birds">Birds</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Breed */}
          {category && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="breed" className="text-right">Breed</Label>
              <Select
                value={breed}
                onValueChange={setBreed}
              >
                <SelectTrigger className="col-span-3" id="breed">
                  <SelectValue placeholder="Select breed" />
                </SelectTrigger>
                <SelectContent>
                  {breedOptions[category].map((b) => (
                    <SelectItem key={b} value={b}>{b}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Description */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="desc" className="text-right">Description</Label>
            <Textarea
              id="desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
          {loading ? (
            <ClipLoader color="#FACC15" />
          ) : (
            <AlertDialogAction onClick={(e) => handleSubmit(e)}>Add Pet</AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
