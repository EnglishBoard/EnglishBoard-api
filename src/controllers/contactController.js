const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {
  const { name, subject, message, email } = req.body;

  if (!name || !subject || !message) {
    return res.status(400).json({ error: true, message: "Missing required fields" });
  }

  try {
    // Transporter confiable para Gmail con App Password
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: true, // true para 465, false para 587
      auth: {
        user: process.env.CONTACT_EMAIL,
        pass: process.env.CONTACT_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.CONTACT_EMAIL}>`, // siempre el correo autenticado
      to: process.env.CONTACT_EMAIL, // destino
      replyTo: email || undefined, // si el usuario puso email, va acá
      subject: `[EnglishBoard] ${subject}`,
      text: `
        Name: ${name}
        Email: ${email || "Anonymous"}
        Subject: ${subject}

        Message:
        ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: true, message: "Failed to send email" });
  }
};

module.exports = { sendEmail };
