const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {
  const { name, subject, message, email } = req.body;

  if (!name || !subject || !message) {
    return res.status(400).json({ error: true, message: "Missing required fields" });
  }

  try {
    // Transporter confiable para Brevo (Sendinblue)
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_USER, // tu email registrado en Brevo
        pass: process.env.BREVO_PASS, // tu API key de Brevo
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.BREVO_USER}>`, // siempre el correo autenticado
      to: process.env.CONTACT_EMAIL, // destino final (ej: el profe)
      replyTo: email || undefined,
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
