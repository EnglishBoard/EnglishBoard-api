const fetch = require("node-fetch");

const sendEmail = async (req, res) => {
  const { name, subject, message, email } = req.body;

  if (!name || !subject || !message) {
    return res.status(400).json({ error: true, message: "Missing required fields" });
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "api-key": process.env.BRAVE_PASS, // tu API Key de Brevo
      },
      body: JSON.stringify({
        sender: { email: process.env.CONTACT_EMAIL, name }, // el remitente es tu correo de Brevo
        to: [{ email: process.env.CONTACT_EMAIL }], // destino final
        replyTo: email ? { email } : undefined, // si el usuario dejó su email
        subject: `[EnglishBoard] ${subject}`,
        textContent: `
          Name: ${name}
          Email: ${email || "Anonymous"}
          Subject: ${subject}

          Message:
          ${message}
        `,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Brevo API error: ${response.status} - ${errorText}`);
    }

    res.status(200).json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: true, message: "Failed to send email" });
  }
};

module.exports = { sendEmail };
