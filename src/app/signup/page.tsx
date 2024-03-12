"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

const SignUp = () => {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "", username: "" });
  const signUp = async () => { 
    try {
      const response = await axios.post("/api/users/signup", user); 
      router.push("/login");
    } catch (error: any) {
      console.log("error", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>SignUp</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        type="text"
        placeholder="Enter your username"
        value={user.username}
        autoComplete="off"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <label htmlFor="email">email</label>
      <input
        type="text"
        placeholder="Enter your email"
        value={user.email}
        autoComplete="off"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor="password">password</label>
      <input
        type="password"
        placeholder="Enter your password"
        value={user.password}
        autoComplete="new-password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <button onClick={signUp}>Sign Up</button>

      <Link href={"/login"}>Login Page</Link>
    </div>
  );
};

export default SignUp;
