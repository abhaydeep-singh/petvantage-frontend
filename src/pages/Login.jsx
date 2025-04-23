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
import { useNavigate } from "react-router-dom";
import { ParticlesBackground } from "@/components";

const apiURL = import.meta.env.VITE_API_URL;

function Login() {
  const [verified, setVerified] = useState(false);
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

    try {
      let response = await axios.post(`${apiURL}/api/user/login`, {
        email: data.email,
        password: data.password,
      });
      // console.log("response: ", response);
      const success = response.data.success;
      if (success == true) {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("_id", response.data.data._id);
        sessionStorage.setItem("name", response.data.data.name);
        sessionStorage.setItem("email", response.data.data.email);
        sessionStorage.setItem("userType", response.data.data.userType);
        sessionStorage.setItem("image",response.data.data.image);
        sessionStorage.setItem("username",response.data.data.username);
      }
      if (response.data.data.userType == 3) {
        // navigate to user panel
        console.log("logged in as user");
        navigate("/user-dashboard/user-home");
      }
      else if (response.data.data.userType == 2) {
        // navigate to NGO panel
        navigate("/ngo-dashboard/ngo-home");
      }

      resetLogin();
    } catch (error) {
      console.log("Error while hitting Login API: ",error)
    }
  };

  const onRegister = (data) => {
    console.log("Register Data:", data);
    resetRegister();
  };

  return (
    <div className="w-full h-screen flex flex-col gap-8 items-center justify-center">
      <ParticlesBackground />
      <div className="text-primary text-4xl font-semibold">
        PetVantage Login
      </div>
      <Tabs defaultValue="login" className="w-[400px]">
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
                <Button type="submit">Login</Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>

        {/* Register Form */}
        <TabsContent value="register">
          <form onSubmit={handleRegisterSubmit(onRegister)}>
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
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="regEmail"
                    type="email"
                    {...registerRegister("regEmail", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address",
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
                  <Label htmlFor="password">Password</Label>
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
                    type="number"
                    {...registerRegister("contact", {
                      required: "Contact number is required",
                      minLength: {
                        value: 10,
                        message: "Contact must be 10 digits",
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
              </CardContent>
              <CardFooter>
                <Button type="submit">Register</Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Login;
