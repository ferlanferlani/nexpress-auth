import nodemailer from "nodemailer";

// import controller
import { createTokenHelper } from "../../helpers/createTokenHelper.js";
import { forgotPasswordController } from "../../controllers/auth/forgotPasswordController.js";

export const sendEmailVerificationResetPasswordService = async (
  userId,
  name,
  email,
  baseUrl,
  res
) => {
  const token = createTokenHelper();
  const userName = name.replace(/\s+/g, "").toLowerCase();
  const verificationUrl = `${baseUrl}/auth/reset-password/${userName}/?token=${token}`;

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
    text: `Hallo ${name}! token akan expired dalam waktu 15 menit silahkan klik link berikut untuk reset password : ${verificationUrl}`,
  };
  const verificationTokenType = "forgot-password";
  try {
    await forgotPasswordController(
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
      console.log(error);
    } else {
      console.log(info);
    }
  });
};
