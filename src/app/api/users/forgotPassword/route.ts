/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectToDatabase } from "@/dbConfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const reqBody = await request.json();
    const { email } = reqBody;

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });

    // IMPORTANT SECURITY CHANGE:
    // Even if the user doesn't exist, we send a success message.
    // This prevents malicious actors from knowing which emails are registered.
    if (!existingUser) {
      return NextResponse.json(
        {
          message:
            "If an account with that email exists, a password reset link has been sent.",
        },
        { status: 200 } // Return 200 OK even if user is not found
      );
    }

    // Send password reset email
    await sendEmail({ email, emailType: "RESET", userId: existingUser._id });

    return NextResponse.json(
      {
        message: "Password reset email sent. Please check your email.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Forgot Password error:", error);
    // On any server error, return a generic message to the user
    return NextResponse.json(
      { message: "An error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
