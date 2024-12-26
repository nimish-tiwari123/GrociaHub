const nodemailer = require("nodemailer");
const { emailTemplates } = require("../templates");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendForgotPasswordEmail = async (email, token) => {
  const resetLink = `${process.env.CLIENT_URL}/auth/create-password/${token}`;
  const template = emailTemplates.forgotPasswordTemplate(resetLink);

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: template.subject,
    text: template.html,
    headers: {
      "Content-Type": "text/html",
    },
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Forgot password email sent to: ${email}`);
  } catch (error) {
    console.log(error);
    throw new Error("Error sending forgot password email");
  }
};

module.exports = { sendForgotPasswordEmail };
