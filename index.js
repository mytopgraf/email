import { Response } from "node-appwrite";
import sgMail from "@sendgrid/mail";

export default async function ({ req, res, log, error, input, env }) {
    try {
        // Устанавливаем API-ключ SendGrid
        sgMail.setApiKey(env.SENDGRID_API_KEY);

        // Парсим входные данные (Appwrite передаёт input как строку)
        const { to, subject, text } = JSON.parse(input || "{}");

        if (!to || !subject || !text) {
            return new Response(JSON.stringify({
                success: false,
                message: "Missing required fields: to, subject, text"
            }), 400);
        }

        // Формируем сообщение
        const msg = {
            to: to, // Email получателя
            from: "your@email.com", // Укажите email, зарегистрированный в SendGrid
            subject: subject,
            text: text,
            html: `<p>${text}</p>`,
        };

        // Отправляем письмо
        await sgMail.send(msg);

        return new Response(JSON.stringify({
            success: true,
            message: "Email sent successfully!"
        }), 200);
    } catch (err) {
        error(err.message);
        return new Response(JSON.stringify({
            success: false,
            error: err.message
        }), 500);
    }
}
