import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

export function AddPet({ open, setOpen }) {
  const [petName, setPetName] = useState("")
  const [breed, setBreed] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  const breedOptions = {
    dog: ["Labrador", "Bulldog", "Beagle", "German Shepherd"],
    cat: ["Persian", "Siamese", "Maine Coon", "Bengal"],
    rabbit: ["Holland Lop", "Netherland Dwarf", "Flemish Giant"],
    bird: ["Parrot", "Cockatiel", "Canary", "Budgie"],
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleSubmit = () => {
    console.log({
      petName,
      breed,
      category,
      description,
      image,
    })
    setOpen(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
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
                setCategory(val)
                setBreed("")
              }}
            >
              <SelectTrigger className="col-span-3" id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dog">Dog</SelectItem>
                <SelectItem value="cat">Cat</SelectItem>
                <SelectItem value="rabbit">Rabbit</SelectItem>
                <SelectItem value="bird">Bird</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Breed - shown only if category is selected */}
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
          <AlertDialogAction onClick={handleSubmit}>Add Pet</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
