import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { hideLoader, showLoader } from "@/redux/loaderSlice";
const apiURL = import.meta.env.VITE_API_URL;
import { ToastContainer, toast } from "react-toastify";

function Profile() {
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const dispatch = useDispatch();
  const [myID, setMyID] = useState("");

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    username: "",
    contact: "",
    address: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [open, setOpen] = useState(false);

  const fetchMyData = async () => {
    try {
      dispatch(showLoader());
      let me = await axios.post(
        `${apiURL}/api/petseeker/me`,
        {},
        {
          headers: {
            authorization: sessionStorage.getItem("token"),
          },
        }
      );
      const meID = me.data.data._id;
      setMyID(meID);
      let response = await axios.post(
        `${apiURL}/api/petseeker/getsingle`,
        { _id: meID },
        {
          headers: {
            authorization: sessionStorage.getItem("token"),
          },
        }
      );
      let data = {
        name: response.data.data.userID.name,
        email: response.data.data.userID.email,
        contact: response.data.data.contact,
        address: response.data.data.address,
        username: response.data.data.userID.username,
        image: response.data.data.userID.image,
      };
      setProfile(data);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    fetchMyData();
  }, []);

  const handleProfileChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      setProfile((prev) => ({ ...prev, image: files[0] }));
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setProfile((prev) => ({ ...prev, [name]: value }));
    }
  };

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const isValidContact = (contact) => {
    const contactRegex = /^[6-9]\d{9}$/;
    return contactRegex.test(contact);
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(profile.email)) {
      toast.warn("Please enter a valid email address", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
      return;
    }

    if (!isValidContact(profile.contact)) {
      toast.warn("Contact must be 10 digits and start with 6-9", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
      return;
    }

    dispatch(showLoader());

    try {
      const formData = new FormData();
      formData.append("_id", myID);
      formData.append("name", profile.name);
      formData.append("email", profile.email);
      formData.append("contact", profile.contact);
      formData.append("address", profile.address);
      formData.append("username", profile.username);

      if (profile.image instanceof File) {
        formData.append("image", profile.image);
      }

      const response = await axios.post(
        `${apiURL}/api/petseeker/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: sessionStorage.getItem("token"),
          },
        }
      );

      if (response.data.success) {
        toast.success("Profile Updated Successfully", {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });
      } else {
        toast.warn(response.data.message || "Update failed", {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      dispatch(hideLoader());
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast.warn("New passwords do not match", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
      return;
    }

    dispatch(showLoader());
    try {
      let response = await axios.post(
        `${apiURL}/api/user/changepass`,
        {
          userID: sessionStorage.getItem("_id"),
          oldPassword: oldPassword,
          newPassword: newPassword,
          confirmPassword: confirmNewPassword,
        },
        {
          headers: {
            authorization: sessionStorage.getItem("token"),
          },
        }
      );

      if (response.data.success) {
        toast.success("Password Changed Successfully", {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });
      } else {
        toast.warn(response.data.message || "Password update failed", {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(hideLoader());
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setOpen(false);
    }
  };

  return (
    <div className={`w-full min-h-screen p-4 ${isOpen ? "sm:ml-64" : "sm:ml-16"}`}>
      <ToastContainer />
      <Card className="max-w-3xl mx-auto mt-10 shadow-xl shadow-accent">
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleProfileChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={profile.username}
                onChange={handleProfileChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact">Contact</Label>
              <Input
                id="contact"
                name="contact"
                value={profile.contact}
                onChange={handleProfileChange}
                className={
                  profile.contact && !isValidContact(profile.contact)
                    ? "border-red-500"
                    : ""
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={profile.address}
                onChange={handleProfileChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Profile Picture</Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleProfileChange}
              />
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="mt-2 w-24 h-24 rounded-full object-cover"
                />
              )}
            </div>
            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full mt-4">
                Change Password
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Change Password</DialogTitle>
              </DialogHeader>
              <form onSubmit={handlePasswordChange} className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="oldPassword">Current Password</Label>
                  <Input
                    id="oldPassword"
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                  <Input
                    id="confirmNewPassword"
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="mt-2 w-full">
                  Update Password
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}

export default Profile;
