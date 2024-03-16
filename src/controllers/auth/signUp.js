// import libraries
import { sendEmail } from "../../libs/nodemailer.js";
import prisma from "../../libs/prisma.js";

// import functions
import { capitalizeFirstWord } from "../../functions/capitalizeFirstWord.js";
import { signUpValidation } from "../../helpers/auth/signUp.js";

export const SignUp = async (req, res) => {
  const { name, email } = req.body;

  // validate input
  const validate = signUpValidation(name, email);

  if (!validate.success) {
    return res.status(400).json({
      error: [
        {
          success: validate.status,
          message: validate.message,
        },
      ],
    });
  }

  try {
    const user = await prisma.users.create({
      data: {
        name: name,
        email: email,
      },
    });

    // send email verification to user
    sendEmail(name, email);

    res.status(201).json({
      sucess: true,
      message: "success",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
