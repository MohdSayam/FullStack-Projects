/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from "nodemailer";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = await bcrypt.hash(rawToken, 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const resetUrl = `${process.env.DOMAIN}/resetPassword?token=${rawToken}&id=${userId}`;
    const verifyUrl = `${process.env.DOMAIN}/verifyEmail?token=${rawToken}&id=${userId}`;

    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        emailType === "VERIFY" ? verifyUrl : resetUrl
      }">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } <br/>Or copy and paste this link: ${
        emailType === "VERIFY" ? verifyUrl : resetUrl
      }</p>`,
    };

    return await transport.sendMail(mailOptions);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
