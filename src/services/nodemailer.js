import nodemailer from "nodemailer";
import crypto from "crypto";

// import controller
import { getVerificationTokenData } from "../controllers/auth/saveVerificationToken.js";
export const sendEmail = async (userId, name, email, baseUrl, res) => {
  const token = crypto.randomBytes(32).toString("hex");

  const verificationUrl = `${baseUrl}/auth/verify-email/?token=${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Nexpress API Email Verification",
    text: `Hallo ${name}! token akan expired dalam waktu 45 menit silahkan aktivasi email kamu di link tautan berikut : ${verificationUrl}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(info);
    }
  });

  // save verification token to database
  try {
    await getVerificationTokenData(userId, name, email, token, res);
  } catch (error) {
    console.log(error);
  }
};
