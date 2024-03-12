"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const Profile = () => {
  const router = useRouter();
  const logout = async () => {
    const response = await axios.get("api/users/logout"); 
    toast.success("logout successfully");
    router.push("/login");
  };

  const getUserDetail = async () => {
    const response = await axios.get("api/users/me"); 
  };

  return (
    <>
      <div>Profile</div>
      <button onClick={logout}>LogOut</button>
      <button onClick={getUserDetail}>user</button>
    </>
  );
};

export default Profile;
