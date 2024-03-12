import { connect } from "@/dbConfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModal";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect();

export async function POST(request: NextRequest) {
  try { 
    const reqBody = await request.json();
    const { email, password } = reqBody;
    const userDetails = await User.findOne({ email });
    if (!userDetails) {
      return NextResponse.json({ error: "user not found" }, { status: 400 });
    } 
    //check password is correct
    const validatePassword = await bcryptjs.compare(
      password,
      userDetails.password as any
    );

    if (!validatePassword) {
      return NextResponse.json({ error: "invalid password" }, { status: 400 });
    }

    //create token
    const tokenData = {
      id: userDetails._id,
      email: userDetails.email,
      password: userDetails.password,
    };

    //create token

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({
      message: "Login successfull",
      success: true,
    });
    response.cookies.set("tokenAnil", token, { httpOnly: true });

    return response; 
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
