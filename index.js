const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");


module.exports = async function (req, res) {
  const TOKEN = process.env.TOKEN;
  const EMAIL_USER = process.env.EMAIL_USER;

  if (!TOKEN || !EMAIL_USER) {
    return res.json({ error: "Missing required environment variables." }, 400);
  }

  const transport = Nodemailer.createTransport(
    MailtrapTransport({
      token: TOKEN,
      testInboxId: 3571286,
    })
  );

  const sender = {
    address: "hello@example.com",
    name: "Mailtrap Test",
  };

  try {
    const info = await transport.sendMail({
      from: sender,
      to: [EMAIL_USER],
      subject: "You are awesome!",
      text: "Congrats for sending test email with Mailtrap!",
      category: "Integration Test",
      sandbox: true,
    });

    return res.json({ success: true, message: "Email sent", info }, 200);
  } catch (error) {
    return res.json({ error: error.message }, 500);
  }
};
