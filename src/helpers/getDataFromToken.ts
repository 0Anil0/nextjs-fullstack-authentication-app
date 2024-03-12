import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const getDatFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("tokenAnil")?.value || "";

    const decodeToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodeToken.id;
  } catch (error: any) {
    throw new error(error.message);
  }
};
