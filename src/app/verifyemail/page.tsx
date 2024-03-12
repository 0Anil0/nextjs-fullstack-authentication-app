"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

 const VerifyEmail = () => {
  const [token, setToken] = useState("");
  const [verify, setVerify] = useState(false);
  const [error, setError] = useState(false);

  const VerifyEmail = async () => {
    try {
      const response = await axios.post("api/users/verifyemail", { token });
      setVerify(true);
    } catch (error: any) {
      setError(true);
      throw new error(error.message);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token && token.length > 0) {
      VerifyEmail();
    }
  }, [token]);

  return (
    <>
      <div>verify token</div>
      <div>{token ? `${token}` : "no token found"}</div>
      {verify && (
        <div>
          <Link href={"/login"}>Login here</Link>
        </div>
      )}
    </>
  );
};

export default VerifyEmail;
