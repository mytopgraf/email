import nodemailer from "nodemailer";

export default async ({ req, res }) => {
    try {
        const { email, subject, message } = JSON.parse(req.body);

        if (!email || !subject || !message) {
            return res.json({ success: false, error: "Missing required fields" });
        }

		const transport = nodemailer.createTransport({
		  host: "sandbox.smtp.mailtrap.io",
		  port: 2525,
		  auth: {
			user: "b8d54aff3c73a1",
			pass: "b0f38a9c56a364"
		  }
		});

        await transporter.sendMail({
            from: `"Test App" <test@app.com>`,  // От кого (можно любой email)
            to: "vasya.butilkin2020@gmail.com",  // Кому
            subject: "Hi test",
            text: "Hi test"
        });

        return res.json({ success: true, message: "Email sent successfully!" });

    } catch (error) {
        return res.json({ success: false, error: error.message });
    }
};
