import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import { ParticlesBackground } from "@/components";

const apiURL = import.meta.env.VITE_API_URL;

function RegisterNGO() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onRegister = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", data.regEmail);
      formData.append("password", data.regPassword);
      formData.append("name", data.name);
      formData.append("contact", data.contact);
      formData.append("regNo", data.regNo);
      formData.append("username", data.username);
      formData.append("image", data.image[0]);

      const response = await axios.post(`${apiURL}/api/ngo/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: sessionStorage.getItem("token"),
        },
      });

      if (response.data.success) {
        toast.success("Register Successful!", { theme: "dark" });
        setTimeout(()=>{
            navigate("/ngo-dashboard/ngo-home");
        },1000)
      } else {
        toast.warn(`Register Failed: ${response.data.message}`, { theme: "dark" });
      }
    } catch (error) {
      console.error("Error while registering:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col gap-8 items-center justify-center">
      <ToastContainer />
      <ParticlesBackground/>
      <form onSubmit={handleSubmit(onRegister)} encType="multipart/form-data" className="w-[400px]">
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>
              Register for NGO
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" {...register("name", { required: "Name is required" })} />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" type="text" {...register("username", { required: "Username is required" })} />
              {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="regEmail">Email</Label>
              <Input
                id="regEmail"
                type="email"
                {...register("regEmail", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
                })}
              />
              {errors.regEmail && <p className="text-red-500 text-sm">{errors.regEmail.message}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="regPassword">Password</Label>
              <Input
                id="regPassword"
                type="password"
                {...register("regPassword", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                })}
              />
              {errors.regPassword && <p className="text-red-500 text-sm">{errors.regPassword.message}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="contact">Contact</Label>
              <Input
                id="contact"
                type="number"
                {...register("contact", {
                  required: "Contact number is required",
                  minLength: { value: 10, message: "Contact must be 10 digits" },
                })}
              />
              {errors.contact && <p className="text-red-500 text-sm">{errors.contact.message}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="regNo">Registration Number</Label>
              <Input
                id="regNo"
                type="text"
                {...register("regNo", { required: "Registration Number is required" })}
              />
              {errors.regNo && <p className="text-red-500 text-sm">{errors.regNo.message}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="image">Profile Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                {...register("image", { required: "Profile image is required" })}
              />
              {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
            </div>
          </CardContent>
          <CardFooter>
            {loading ? (
              <ClipLoader color="#FACC15" />
            ) : (
              <Button type="submit" className="w-full">
                Register
              </Button>
            )}
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default RegisterNGO;
