import nodemailer from "nodemailer";

export default async ({ req, res, context }) => {
    try {
        context.log("Parsing request body...");
        const { email, subject, message } = JSON.parse(req.body);
        context.log("Email details parsed:", { email, subject, message });

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,  // Логин из Mailtrap
                pass: process.env.MAILTRAP_PASS   // Пароль из Mailtrap
            }
        });

        

        context.log("Transporter created. Sending email...");

        await transport.sendMail({
            from: "<test@gmail.com>",  
            to: process.env.EMAIL_USER,  // Кому
            subject: "Hi test",
            text: "Hi test"
        });

        context.log(process.env.MAILTRAP_USER)
        context.log(process.env.MAILTRAP_PASS)
        context.log(process.env.EMAIL_USER)
        
        
        context.log("Email sent successfully!");
        return res.json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        context.log("Error sending email:", error.message);
        return res.json({ success: false, error: error.message });
    }
};
