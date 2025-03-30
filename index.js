import nodemailer from "nodemailer"

export default async ({ req, res }) => {
    try {
        const { email, subject, message } = JSON.parse(req.body);

        if (!email || !subject || !message) {
            return res.json({ success: false, error: "Missing required fields" });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,  // Email-логин (переменная среды)
                pass: process.env.EMAIL_PASS   // Пароль или App Password (Gmail)
            }
        });

        await transporter.sendMail({
            from: `"Your App" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: "Hi Test",
            text: "Hi Test"
        });

        return res.json({ success: true, message: "Email sent successfully!" });

    } catch (error) {
        return res.json({ success: false, error: error.message });
    }
};
