import nodemailer from "nodemailer";

export const sendEmailVerificationResetPasswordService = async (
  name,
  email,
  token,
  baseUrl,
  res
) => {
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

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(info);
    }
  });
};
