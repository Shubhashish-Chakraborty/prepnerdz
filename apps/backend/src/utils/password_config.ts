import { Response } from "express";
import { OTP_SENDERMAIL, OTP_MAIL_PASSWORD } from "../config";
import nodemailer from "nodemailer";
import bcrypt from 'bcrypt';
import prisma from "../db/prisma";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: OTP_SENDERMAIL,
        pass: OTP_MAIL_PASSWORD,
    },
});

export const sendOtp_forgotPassword = async (to: string, otpGenerated: string) => {
    const inServerGeneratedOtp = otpGenerated;

    // const mailOptions = {
    //     from: OTP_SENDERMAIL,
    //     to,
    //     subject: "Otp For Password Reset for PrepNerdz",
    //     text: `HERE IS YOUR OTP: ${inServerGeneratedOtp} FOR Password Reset FOR PrepNerdz`,
    // };

    const mailOptions = {
        from: OTP_SENDERMAIL,
        to,
        subject: "PrepNerdz | Password Reset OTP",
        text: `Dear User,

            We received a request to reset your password for your PrepNerdz account.

            Your One-Time Password (OTP) for password reset is:

            ${inServerGeneratedOtp}

            Please enter this OTP on the password reset page to proceed.

            Note: This OTP is valid for a limited time and should not be shared with anyone.

            If you did not request a password reset, please ignore this email or contact our support team.

            Best regards,  
            Team PrepNerdz  
            business.prepnerdz@gmail.com`
    };


    await transporter.sendMail(mailOptions);
};

export const resetPassword = async (otpEntered: string, mail: string, newPassword: string, res: Response) => {
    const user = await prisma.user.findFirst({
        where: {
            email: mail
        }
    })

    if (!user) {
        res.status(401).json({
            message: "USER NOT FOUND!"
        })
        return;
    }
    else {
        if (user.otpForResetPassword === otpEntered) {
            const newHashedPassword = await bcrypt.hash(newPassword, 10);

            await prisma.user.update({
                where: {
                    email: mail
                },
                data: {
                    password: newHashedPassword
                }
            })

            await prisma.user.update({
                where: {
                    email: mail
                },
                data: {
                    otpForResetPassword: "PASSWORD_RESET_DONE"
                }
            })

            res.status(200).json({
                message: `${user.username}'s New Password Set Successfully!!`
            })
            return;
        }
        else {
            res.status(400).json({
                message: "INVALID OTP ENTERED!"
            })
            return;
        }
    }
}