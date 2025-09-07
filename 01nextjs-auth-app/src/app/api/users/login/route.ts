import { connectToDatabase } from "@/dbConfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectToDatabase();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User does not exist. Please sign up." },
        { status: 400 }
      );
    }

    // check if password matches
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    // create JWT token here and send it to the client for authentication
    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({
      message: "User logged in successfully",
      user,
      token,
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
