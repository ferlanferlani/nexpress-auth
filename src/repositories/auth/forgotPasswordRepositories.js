import { createTokenHelper } from "../../helpers/createTokenHelper.js";
import { sendEmailVerificationResetPasswordService } from "../../services/nodemailer/sendEmailVerificationResetPasswordService.js";
import prisma from "../../services/prismaService.js";

export const forgotPasswordRepository = async (req, res) => {
  try {
    const userEmailRequest = req.body.email;

    const user = await prisma.users.findFirst({
      where: {
        email: userEmailRequest,
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "your email is not resgistered",
      });
    }

    const name = user.name;
    const email = user.email;
    const userId = user.id;

    const protocol = req.protocol;
    const hostname = req.hostname;
    const port = req.socket.localPort;

    const baseUrl = `${protocol}://${hostname}:${port}`;

    // create token
    const token = createTokenHelper();

    // token is expired on 45 minutes
    const currentDate = new Date();
    const expirationTime = new Date(currentDate.getTime() + 15 * 60000);

    const verificationTokenType = "forgot-password";

    // make token for reset pssword
    await prisma.verificationTokens.create({
      data: {
        name: name,
        email: email,
        expired: expirationTime,
        token: token,
        verificationTokenType: verificationTokenType,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    await sendEmailVerificationResetPasswordService(
      userId,
      name,
      email,
      token,
      baseUrl,
      res
    );
    res.status(200).json({
      success: true,
      message: "email verification sent",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
