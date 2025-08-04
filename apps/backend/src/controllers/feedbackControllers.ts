import { Request, Response } from "express";
import nodemailer from "nodemailer";
import { OTP_MAIL_PASSWORD } from "../config";
import prisma from "../db/prisma";

export const submitFeedback = async (req: Request, res: Response) => {
    try {
        const { fullName, email, category, rating, title, description, screenshot, resourceId } = req.body;

        if (!fullName || !category || !title || !description) {
            res.status(400).json({ message: "Full name, category, title, and description are required" });
            return;
        }

        // Validate rating if provided
        if (rating && (rating < 1 || rating > 5)) {
            res.status(400).json({ message: "Rating must be between 1 and 5" });
            return;
        }

        // Validate category
        const validCategories = ['BUG', 'SUGGESTION', 'CONTENT_ISSUE', 'GENERAL', 'MENTORSHIP'];
        if (!validCategories.includes(category)) {
            res.status(400).json({ message: "Invalid category" });
            return;
        }

        // Save feedback to database
        const feedback = await prisma.feedback.create({
            data: {
                fullName,
                email: email || null,
                category: category as any,
                rating: rating || null,
                title,
                description,
                screenshot: screenshot || null,
                resourceId: resourceId || null
            }
        });

        // Send email notification
        await sendFeedbackEmail({
            fullName,
            email,
            category,
            rating,
            title,
            description,
            screenshot,
            resourceId
        });

        res.status(200).json({ 
            message: "Feedback submitted successfully!",
            feedbackId: feedback.id
        });

    } catch (error) {
        console.error("Feedback submission error:", error);
        res.status(500).json({
            message: "Something went wrong, please try again later"
        });
    }
};

const sendFeedbackEmail = async (feedbackData: {
    fullName: string;
    email?: string;
    category: string;
    rating?: number;
    title: string;
    description: string;
    screenshot?: string;
    resourceId?: string;
}) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "business.prepnerdz@gmail.com",
                pass: OTP_MAIL_PASSWORD,
            },
        });

        const categoryLabels = {
            BUG: "🐛 Bug Report",
            SUGGESTION: "💡 Suggestion",
            CONTENT_ISSUE: "📄 Content Issue",
            GENERAL: "📝 General Feedback",
            MENTORSHIP: "👨‍🏫 Mentorship"
        };

        const mailOptions = {
            from: "business.prepnerdz@gmail.com",
            to: "business.prepnerdz@gmail.com",
            replyTo: feedbackData.email || "business.prepnerdz@gmail.com",
            subject: `New Feedback: ${categoryLabels[feedbackData.category as keyof typeof categoryLabels]} - ${feedbackData.title}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
                        New Feedback Received
                    </h2>
                    
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #007bff; margin-top: 0;">${categoryLabels[feedbackData.category as keyof typeof categoryLabels]}</h3>
                        <h4 style="color: #333; margin-bottom: 10px;">${feedbackData.title}</h4>
                        
                        <div style="margin: 15px 0;">
                            <strong>From:</strong> ${feedbackData.fullName}
                            ${feedbackData.email ? `<br><strong>Email:</strong> ${feedbackData.email}` : ''}
                        </div>
                        
                        ${feedbackData.rating ? `
                        <div style="margin: 15px 0;">
                            <strong>Rating:</strong> ${'⭐'.repeat(feedbackData.rating)} (${feedbackData.rating}/5)
                        </div>
                        ` : ''}
                        
                        <div style="margin: 15px 0;">
                            <strong>Description:</strong><br>
                            <div style="background: white; padding: 15px; border-radius: 5px; margin-top: 5px;">
                                ${feedbackData.description.replace(/\n/g, '<br>')}
                            </div>
                        </div>
                        
                        ${feedbackData.screenshot ? `
                        <div style="margin: 15px 0;">
                            <strong>Screenshot:</strong><br>
                            <a href="${feedbackData.screenshot}" target="_blank">View Screenshot</a>
                        </div>
                        ` : ''}
                        
                        ${feedbackData.resourceId ? `
                        <div style="margin: 15px 0;">
                            <strong>Related Resource ID:</strong> ${feedbackData.resourceId}
                        </div>
                        ` : ''}
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px; color: #666; font-size: 14px;">
                        <p>This feedback was submitted via the PrepNerdz feedback system.</p>
                        <p>Submitted on: ${new Date().toLocaleString()}</p>
                    </div>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

    } catch (error) {
        console.error("Email send error:", error);
        // Don't throw error here as we don't want to fail the feedback submission if email fails
    }
}; 