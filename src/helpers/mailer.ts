import User from "@/models/userModel";
import bcrypt from 'bcryptjs';
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }: any) => {
    //e.log("email, emailType, userId:", email, emailType, userId)

    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10);
        if (emailType === "VERIFY") {
            const updatedUser = await User.findByIdAndUpdate(userId, { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 }, { new: true });
            //e.log("updatedUser:", updatedUser);

        } else if (emailType === "RESET") {
            const updatedUser = await User.findByIdAndUpdate(userId, { forgorPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 }, { new: true });
            //e.log("updatedUser:", updatedUser);
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS
            }
        });

        const mailOptions = {
            from: "siddik.prgmr@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email " : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "confirmresetpassword"}?token=${hashedToken}
            </p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);
        //e.log("mailResponse:", mailResponse)
        return {
            subject: `${emailType === "VERIFY" ? "verify your email" : "Reset your password"}`,
            link: `${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "confirmresetpassword"}?token=${hashedToken}`
        };

    } catch (error: any) {
        //e.log("error:", error)
        throw new Error(error.message);
    }
}