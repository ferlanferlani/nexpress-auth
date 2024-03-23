import { sendEmailVerificationResetPasswordService } from "../../services/nodemailer/sendEmailVerificationResetPasswordService.js";
import prisma from "../../services/prismaService.js";
export const forgotPasswordRepository = async (
  userId,
  name,
  email,
  token,
  verificationTokenType,
  res
) => {
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

    const protocol = req.protocol;
    const hostname = req.hostname;
    const port = req.socket.localPort;

    const baseUrl = `${protocol}://${hostname}:${port}`;

    // token is expired on 45 minutes
    const currentDate = new Date();
    const expirationTime = new Date(currentDate.getTime() + 15 * 60000);

    // make token for reset pssword
    const tokenCreated = await prisma.verificationTokens.create({
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
    const sendEmailResponse = await sendEmailVerificationResetPasswordService(
      userId,
      name,
      email,
      baseUrl,
      res
    );
    res.status(200).json({
      success: true,
      token: tokenCreated,
      resposense: sendEmailResponse,
      message: "Email sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
