"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "", username: "" });
  const router = useRouter();
  const Login = async () => { 
    const resposnse = await axios.post("api/users/login", user); 
    if (resposnse.data.success) {
      toast.success("login successfully");
      router.push("/profile");
    } else {
      toast.success(resposnse.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Login</h1>
      <hr />
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

      <button onClick={Login}>Login</button>

      <Link href={"/signup"}>SingUp Page</Link>
    </div>
  );
};

export default Login;
