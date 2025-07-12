import { Request, Response } from "express";
import nodemailer from "nodemailer";
import { OTP_MAIL_PASSWORD } from "../config";
import prisma from "../db/prisma";

export const sendMessageToMail = async (req: Request, res: Response) => {
    try {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone || !message) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }

        // You're sending a message from yourself to yourself — just with the content composed using the data the user submitted.

        // Create a transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "business.prepnerdz@gmail.com", // replace with your email
                pass: OTP_MAIL_PASSWORD,
            },
        });

        // Compose the email
        const mailOptions = {
            from: "business.prepnerdz@gmail.com",
            to: "business.prepnerdz@gmail.com",
            replyTo: email,
            subject: "New Message from Contact Form",
            html: `
    <h3>You have a new message:</h3>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Message:</strong><br/>${message}</p>
  `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Message sent successfully!" });

    } catch (error) {
        console.error("Email send error:", error);
        res.status(500).json({
            message: "Something Went Wrong, Please Try Again Later"
        });
    }
};

export const sendMessageToDB = async (req: Request, res: Response) => {
    try {
        const { fullName, email, contactNumber, message } = req.body;

        // adding data to database!!
        const getInTouch = await prisma.contactUsResponse.create({
            data: {
                fullName,
                email,
                contactNumber,
                message
            }
        });

        // res.status(200).json({
        //     message: `successfully ${getInTouch.firstName}'s Get in Touch Data Recorded!!`,
        //     fullName: `${firstName} ${lastName}`,
        // })

        res.status(200).json({ message: "Message sent successfully!" });


    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something Went Wrong, Please Try Again Later"
        });
    }
}