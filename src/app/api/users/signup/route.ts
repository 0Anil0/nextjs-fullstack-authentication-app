import { connect } from "@/dbConfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModal";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    let { username, email, password } = reqBody;

    const user = await User.findOne({ email });
    if (user) {
      NextResponse.json({ error: "User is already exist" }, { status: 500 });
    }

    //hash password

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);
    password = hashPassword;

    const newUser = new User({ username, email, password });
    const savedUser = await newUser.save();
    //send verification email todo delete
    const mailResponse = await sendEmail({
      email,
      emailType: "VERIFY",
      userId: savedUser._id,
    });

    console.log("email", mailResponse);

    return NextResponse.json(
      { message: "User created successfully", success: true, savedUser },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: "check kro" }, { status: 500 });
  }
}
