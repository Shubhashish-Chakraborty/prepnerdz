import { OTP_MAIL_PASSWORD, OTP_SENDERMAIL } from "../config";
import nodemailer from "nodemailer";
import prisma from "../db/prisma";
import { Response } from "express";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: OTP_SENDERMAIL,
        pass: OTP_MAIL_PASSWORD,
    },
});

export const sendOtp = async (to: string, otpGenerated: string) => {
    const inServerGeneratedOtp = otpGenerated;

    // const mailOptions = {
    //     from: OTP_SENDERMAIL,
    //     to,
    //     subject: "PrepNerdz Email Verification",
    //     text: `HERE IS YOUR OTP: ${inServerGeneratedOtp} FOR PREPNERDZ ACCOUNT VERIFICATION`,
    // };

    const mailOptions = {
        from: OTP_SENDERMAIL,
        to,
        subject: "PrepNerdz | Email Verification OTP",
        text: `Dear User,

            Thank you for signing up with PrepNerdz!

            Your One-Time Password (OTP) for verifying your email address is:

            ${inServerGeneratedOtp}

            Please enter this OTP on the verification screen to complete your registration. 

            Note: This OTP is valid for a limited time and should not be shared with anyone.

            If you did not request this, please ignore this email.

            Best regards,  
            Team PrepNerdz  
            business.prepnerdz@gmail.com`
    };

    await transporter.sendMail(mailOptions);
};


export const FINAL_MAIL_VERIFICATION = async (otpEntered: string, mail: string, res: Response) => {
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
        if (user.otpForVerification === otpEntered) {
            await prisma.user.update({
                where: {
                    email: mail
                },
                data: {
                    isMailVerified: true
                }
            })

            await prisma.user.update({
                where: {
                    email: mail
                },
                data: {
                    otpForVerification: "MAIL_VERIFICATION_DONE"
                }
            })
            res.status(200).json({
                message: `${user.username}'s EMAIL VERIFIED SUCCESFULLY!!`,
                success: true
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