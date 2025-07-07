import { Request, Response } from "express";
import nodemailer from "nodemailer";
import { OTP_MAIL_PASSWORD } from "../config";

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
                user: "studywithshubh88@gmail.com", // replace with your email
                pass: OTP_MAIL_PASSWORD,
            },
        });

        // Compose the email
        const mailOptions = {
            from: "studywithshubh88@gmail.com",
            to: "studywithshubh88@gmail.com",
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
