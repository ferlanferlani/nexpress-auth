import nodemailer from "nodemailer";

export const sendEmail = async (name, email) => {
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
    subject: "Email Verification",
    text: `Hallo ${name} silahkan aktivasi email kamu di link berikut untuk melanjutkan proses`,
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.send(error);
    } else {
      res.send(info);
    }
  });
};
