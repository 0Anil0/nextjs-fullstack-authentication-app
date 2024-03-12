import { getDatFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModal";
import { connect } from "@/dbConfig/dbconfig";
connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDatFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json(
      {
        message: "user found",
        data: user,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Not valid user",
      },
      { status: 400 }
    );
  }
}
