//** */ import dependencies
import * as argon2 from "argon2";

// ** import repositories
import { save } from "../../repositories/user.js";

//** import services
import { sendEmail } from "../../services/nodemailer.js";

//**  user validation
import { userValidation } from "../../validations/server/user.js";

//** import helpers
import { capitalizeFirstWord } from "../../helpers/capitalizeFirstWord.js";

// import validation
import { signUpFormValidation } from "../../validations/form/auth/signUp.js";
import prisma from "../../services/prisma.js";

export const SignUp = async (req, res) => {
  const protocol = req.protocol;
  const hostname = req.hostname;
  const port = req.socket.localPort;

  const baseUrl = `${protocol}://${hostname}:${port}`;

  const { userName, userEmail, userPassword, userConfirmPassword } = req.body;

  /**
   ** SignUp Validaton
   ** you can add more validation in: validations/form/auth/SignUp.js
   */
  const validate = signUpFormValidation(
    userName,
    userEmail,
    userPassword,
    userConfirmPassword
  );

  if (!validate.status) {
    return res.status(400).json({ error: validate.errorMessage });
  }

  // ** capitalize first word in name
  const name = capitalizeFirstWord(userName);

  //* hash password with argon2
  const paswordHashed = await argon2.hash(userPassword);

  // ** validation if user is already exists
  const user = await userValidation(userEmail);
  if (user.status === false) {
    return res.status(400).json({ error: user.errorMessage });
  }

  try {
    // ** save user
    const userSaved = await save(name, userEmail, paswordHashed);

    const user = await prisma.users.findFirst({
      where: {
        email: userEmail,
      },
    });

    const userId = user.id;

    /* Send Email Verification
     *ini adalah optional untuk anda, jika diperlukan hapus blok komentarnya
     */
    await sendEmail(userId, userName, userEmail, baseUrl, res);

    res.status(201).json({
      sucess: true,
      message: "user created successfully",
      data: userSaved,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
