import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { SendHorizonal, ImagePlus, X } from "lucide-react"
import axios from "axios"
import { ClipLoader } from "react-spinners"
import { ToastContainer, toast } from "react-toastify"

const apiURL = import.meta.env.VITE_API_URL;

export default function CommunityPostInput() {
  const [content, setContent] = useState("")
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [loading,setLoading] = useState(false);
  

  const handlePost = async () => {
    if (content.trim() === "" && !image) return
    setLoading(true);
    // Create a FormData object
    const formData = new FormData()

    // Append the content and image to FormData
    formData.append("content", content)

    if (image) {
      formData.append("image", image)
    }

    try {
      // Send the FormData object to the backend (replace with your API URL)
      let response = await axios.post(`${apiURL}/api/post/add`,formData,{
        headers:{
          authorization:sessionStorage.getItem("token")
        }

      });
      console.log(response);
      
      if(response.data.success){
        setImage(null);
        setImagePreview(null);
        setContent("");
        toast.success('Post Uploaded Succesfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          // transition: Bounce,
          });
      }
      else{
        // Show error Toaster
        toast.warn('Upload Failed! Something went wrong', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          // transition: Bounce,
          });
      }
    } catch (error) {
      console.error("Error while posting:", error)
    
    }
    finally{
      setLoading(false);
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const removeImage = () => {
    setImage(null)
    setImagePreview(null)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-4 shadow-md bg-background text-foreground">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        // transition={Bounce}
      />
      <CardContent className="flex gap-4 p-4">
        <Avatar>
          <AvatarImage src={sessionStorage.getItem("image")} alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder="Say something..."
            className="resize-none min-h-[80px] text-base"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {imagePreview && (
            <div className="relative mt-2 w-fit">
              <img
                src={imagePreview}
                alt="Preview"
                className="rounded-md max-h-48 object-cover"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-1 right-1 bg-white/70 hover:bg-white"
                onClick={removeImage}
              >
                <X className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          )}

          <div className="flex justify-between mt-3">
            <div className="flex items-center gap-2">
              <label htmlFor="image-upload">
                <Button variant="ghost" size="icon" asChild>
                  <span>
                    <ImagePlus className="w-5 h-5" />
                  </span>
                </Button>
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
            {loading ? <ClipLoader color="#FACC15" /> : <Button
              onClick={handlePost}
              disabled={!content.trim() && !image}
              className="flex gap-2"
            >
              <SendHorizonal className="w-4 h-4" />
              Post
            </Button> }
            
            
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
