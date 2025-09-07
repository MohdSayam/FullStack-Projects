/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import { connectToDatabase } from "@/dbConfig/dbconfig";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const reqBody = await request.json();
    const { password, token, userId } = reqBody;

    // 1. Validate incoming data
    if (!password || !token || !userId) {
      return NextResponse.json(
        { message: "Missing required information" },
        { status: 400 }
      );
    }

    // 2. Find the user by their ID
    const user = await User.findById(userId);

    // 3. Check for user existence, token validity, and token expiry
    if (
      !user ||
      !user.forgotPasswordToken ||
      user.forgotPasswordTokenExpiry < Date.now()
    ) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // 4. Compare the raw token from the client with the hashed token in the database
    const isMatch = await bcryptjs.compare(token, user.forgotPasswordToken);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }

    // 5. Hash the new password and update the user's document
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Reset password error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
