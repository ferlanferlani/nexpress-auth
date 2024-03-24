import nodemailer from "nodemailer";

import { createTokenHelper } from "../../helpers/createTokenHelper.js";
import { saveVerificationTokenController } from "../../controllers/auth/saveVerificationTokenController.js";

export const sendEmailVerificationService = async (
  userId,
  name,
  email,
  baseUrl,
  res
) => {
  const token = createTokenHelper();
  const userName = name.replace(/\s+/g, "").toLowerCase();
  const verificationUrl = `${baseUrl}/auth/verify-email/${userName}/?token=${token}`;

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
    text: `Hallo ${name}! Silahkan aktivasi email kamu di link tautan berikut : ${verificationUrl}`,
  };
  const verificationTokenType = "email-verification signin";
  try {
    await saveVerificationTokenController(
      userId,
      name,
      email,
      token,
      verificationTokenType,
      res
    );
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({
        error: error.message,
      });
    } else {
      return res.status(200).json({
        success: true,
        info: info,
        message: "Email sent successfully",
      });
    }
  });
};
