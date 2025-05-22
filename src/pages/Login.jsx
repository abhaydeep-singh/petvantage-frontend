import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ParticlesBackground } from "@/components";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";

const apiURL = import.meta.env.VITE_API_URL;

function Login() {
  const { action } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // Login form state
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: resetLogin,
  } = useForm();

  // Register form state
  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
    reset: resetRegister,
  } = useForm();

  const onLogin = async (data) => {
    // console.log("Login Data:", data);
    setLoading(true);
    try {
      let response = await axios.post(`${apiURL}/api/user/login`, {
        email: data.email,
        password: data.password,
      });
      console.log("response: ", response);
      const success = response.data.success;
      if (success == true) {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("_id", response.data.data._id);
        sessionStorage.setItem("name", response.data.data.name);
        sessionStorage.setItem("email", response.data.data.email);
        sessionStorage.setItem("userType", response.data.data.userType);
        sessionStorage.setItem("image", response.data.data.image);
        sessionStorage.setItem("username", response.data.data.username);
      }

      if (success) {
        toast.success("Login Succesfull!", {
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

        setTimeout(() => {
          if (response.data.data.userType == 3) {
            // navigate to user panel
            // console.log("logged in as user");
            navigate("/user-dashboard/user-home");
          } else if (response.data.data.userType == 2) {
            // navigate to NGO panel
            navigate("/ngo-dashboard/ngo-home");
          }
          else  {
            // navigate to admin panel
            navigate("/admin/admin-home");
          }
        }, 1000);
      } else {
        toast.warn(`${response.data.message}`, {
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

      resetLogin();
    } catch (error) {
      console.log("Error while hitting Login API: ", error);
    } finally {
      setLoading(false);
    }
  };

  const onRegister = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", data.regEmail);
      formData.append("password", data.regPassword);
      formData.append("name", data.name);
      formData.append("contact", data.contact);
      formData.append("address", data.address);
      formData.append("username", data.username);
      formData.append("image", data.image[0]); // handle the file

      const response = await axios.post(
        `${apiURL}/api/petseeker/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: sessionStorage.getItem("token"),
          },
        }
      );
      console.log(response);

      // if (response.data.success) {
      //   console.log("Registered successfully");
      //   resetRegister();
      //   navigate("/user-dashboard/user-home"); // if you want to redirect after register
      // }
      if (response.data.success) {
        toast.success("Register Succesfull!", {
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
        // setTimeout(())
        navigate("/login/login");
        window.location.reload();
      } else {
        toast.warn(`Register Failed: ${response.data.message}`, {
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
      console.error("Error while registering:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col gap-8 items-center justify-center">
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
      <ParticlesBackground />
      <div className="text-primary text-4xl font-semibold">
        PetVantage Login
      </div>
      <Tabs defaultValue={action} className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>

        {/* Login Form */}
        <TabsContent value="login">
          <form onSubmit={handleLoginSubmit(onLogin)}>
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Login if you already have an account on PetVantage
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="Enter your Email"
                    {...loginRegister("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {loginErrors.email && (
                    <p className="text-red-500 text-sm">
                      {loginErrors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your Password"
                    {...loginRegister("password", {
                      required: "Password is required",
                    })}
                  />
                  {loginErrors.password && (
                    <p className="text-red-500 text-sm">
                      {loginErrors.password.message}
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                {loading ? (
                  <ClipLoader color="#FACC15" />
                ) : (
                  <Button type="submit">Login</Button>
                )}
              </CardFooter>
            </Card>
          </form>
        </TabsContent>

        {/* Register Form */}
        <TabsContent value="register">
          <form
            onSubmit={handleRegisterSubmit(onRegister)}
            encType="multipart/form-data"
          >
            <Card>
              <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>
                  Register here if you don't have an account on PetVantage
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    {...registerRegister("name", {
                      required: "Name is required",
                    })}
                  />
                  {registerErrors.name && (
                    <p className="text-red-500 text-sm">
                      {registerErrors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    {...registerRegister("username", {
                      required: "Username is required",
                    })}
                  />
                  {registerErrors.username && (
                    <p className="text-red-500 text-sm">
                      {registerErrors.username.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="regEmail">Email</Label>
                  <Input
                    id="regEmail"
                    type="email"
                    {...registerRegister("regEmail", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email format",
                      },
                    })}
                  />
                  {registerErrors.regEmail && (
                    <p className="text-red-500 text-sm">
                      {registerErrors.regEmail.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="regPassword">Password</Label>
                  <Input
                    id="regPassword"
                    type="password"
                    {...registerRegister("regPassword", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  {registerErrors.regPassword && (
                    <p className="text-red-500 text-sm">
                      {registerErrors.regPassword.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="contact">Contact</Label>
                  <Input
                    id="contact"
                    type="text"
                    {...registerRegister("contact", {
                      required: "Contact number is required",
                      pattern: {
                        value: /^[6-9]\d{9}$/,
                        message:
                          "Enter a valid 10-digit contact",
                      },
                    })}
                  />
                  {registerErrors.contact && (
                    <p className="text-red-500 text-sm">
                      {registerErrors.contact.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    type="text"
                    {...registerRegister("address", {
                      required: "Address is required",
                    })}
                  />
                  {registerErrors.address && (
                    <p className="text-red-500 text-sm">
                      {registerErrors.address.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="image">Profile Picture</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    {...registerRegister("image", {
                      required: "Image is required",
                    })}
                  />
                  {registerErrors.image && (
                    <p className="text-red-500 text-sm">
                      {registerErrors.image.message}
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex w-full justify-around">
                  {loading ? (
                    <ClipLoader color="#FACC15" />
                  ) : (
                    <Button type="submit">Register</Button>
                  )}
                  <div
                    className="text-primary hover:underline"
                    onClick={() => navigate("/ngo-register")}
                  >
                    NGO? Register here
                  </div>
                </div>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Login;
