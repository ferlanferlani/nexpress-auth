//** */ import dependencies
import * as argon2 from "argon2";

// ** import repositories
import { saveUserRepository } from "../../repositories/user/saveUserRepository.js";

//** import services
import { sendEmailVerificationService } from "../../services/nodemailer/sendEmailVerificationSigninService.js";

//**  user validation
import { userValidation } from "../../validations/server/userValidation.js";

//** import helpers
import { capitalizeFirstWord } from "../../helpers/capitalizeFirstWordHelper.js";

// import validation
import { signUpFormValidation } from "../../validations/form/auth/signUpValidation.js";
import prisma from "../../services/prismaService.js";

export const signUpRepostiory = async (req, res) => {
  const protocol = req.protocol;
  const hostname = req.hostname;
  const port = 3000;

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
    const userSaved = await saveUserRepository(name, userEmail, paswordHashed);

    const user = await prisma.users.findFirst({
      where: {
        email: userEmail,
      },
    });

    const userId = user.id;

    /* Send Email Verification
     *
     */
    await sendEmailVerificationService(
      userId,
      userName,
      userEmail,
      baseUrl,
      res
    );

    res.status(201).json({
      sucess: true,
      message:
        "Registrasi berhasil, silahkan cek email Anda untuk melakukan verifikasi",
      data: userSaved,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
