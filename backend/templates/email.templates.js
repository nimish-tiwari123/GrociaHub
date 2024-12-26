const forgotPasswordTemplate = (resetLink) => ({
  subject: "Reset Your Password",
  html: `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 0;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            min-height: 100vh;
            width: 100%;
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
          }
          .outer-wrapper {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            padding: 20px;
          }
          .container {
            width: 100%;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            text-align: center;
          }
          h2 {
            color: #4CAF50;
            margin-bottom: 20px;
          }
          p {
            font-size: 16px;
            color: #555;
            margin-bottom: 20px;
          }
          .button {
            background-color: #4CAF50;
            color: #ffffff;
            padding: 15px 30px;
            font-size: 16px;
            text-decoration: none;
            border-radius: 5px;
            text-align: center;
            display: inline-block;
            margin: 20px 0;
            cursor: pointer;
          }
          .button:hover {
            background-color: #45a049;
            color: #ffffff;
          }
          .footer {
            font-size: 14px;
            color: #888;
            text-align: center;
            margin-top: 30px;
          }
          /* Mobile Responsiveness */
          @media only screen and (max-width: 600px) {
            body {
              padding: 10px;
            }
            .container {
              padding: 20px;
            }
            .button {
              width: 100%;
            }
          }
        </style>
      </head>
      <body>
        <div class="outer-wrapper">
          <div class="container">
            <h2>Password Reset Request</h2>
            <p>Hello, <br />
              We received a request to reset your password. Click the button below to reset your password:
            </p>
            <a href="${resetLink}" class="button">Reset Password</a>
            <p class="footer">
              If you did not request a password reset, please ignore this email.<br />
              Best regards,<br />
              The Team at Grocia Hub
            </p>
          </div>
        </div>
      </body>
    </html>
  `,
});

module.exports = { forgotPasswordTemplate };
