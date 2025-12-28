const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

// Configure your sender email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "yourcompany@gmail.com",
    pass: "your_app_password" // Use App Password for Gmail
  }
});

exports.sendCompletionEmail = functions.https.onCall(async (data, context) => {
  const mailOptions = {
    from: "ErrandBoy <yourcompany@gmail.com>",
    to: data.to,
    subject: data.subject,
    html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>ErrandBoy Delivery Receipt</title>
        <style>
            body {
            font-family: 'Segoe UI', Arial, sans-serif;
            background-color: #f6f9fc;
            color: #333;
            margin: 0;
            padding: 0;
            }
            .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 12px rgba(0,0,0,0.1);
            }
            .header {
            background: linear-gradient(135deg, #0d47a1, #1976d2);
            color: white;
            padding: 24px;
            text-align: center;
            }
            .header h1 {
            margin: 0;
            font-size: 24px;
            }
            .body {
            padding: 24px;
            }
            .body h2 {
            color: #1976d2;
            font-size: 18px;
            margin-bottom: 8px;
            }
            .body p {
            margin: 6px 0;
            line-height: 1.5;
            }
            .details {
            background: #f0f4f9;
            padding: 16px;
            border-radius: 8px;
            margin-top: 10px;
            }
            .details p {
            margin: 4px 0;
            }
            .footer {
            background: #e3f2fd;
            padding: 16px;
            text-align: center;
            font-size: 13px;
            color: #555;
            }
            .footer a {
            color: #1976d2;
            text-decoration: none;
            }
        </style>
        </head>
        <body>
        <div class="container">
            <div class="header">
            <h1>Delivery Receipt</h1>
            <p>Thank you for choosing ErrandBoy!</p>
            </div>
            <div class="body">
            <h2>Delivery Summary</h2>
            <div class="details">
                <p><strong>Delivery No:</strong> ${data.delivery_no}</p>
                <p><strong>Status:</strong> Completed</p>
                <p><strong>Description:</strong> ${data.description}</p>
                <p><strong>Drop-off:</strong> ${data.dropoff}</p>
                <p><strong>Total Fee:</strong> ₦${Number(data.totalFee).toLocaleString()}</p>
            </div>

            <h2>Driver Details</h2>
            <div class="details">
                <p><strong>Name:</strong> ${data.driverName}</p>
                <p><strong>Phone:</strong> ${data.driverPhone}</p>
            </div>

            <p style="margin-top: 20px;">
                You can always track your order history by logging into your
                <a href="https://en2ovateSite.com">ErrandBoy account</a>.
            </p>
            </div>
            <div class="footer">
            <p>Powered by <strong>ErrandBoy</strong> © ${new Date().getFullYear()}</p>
            <p><a href="mailto:support@en2ovateSite.com">support@en2ovateSite.com</a></p>
            </div>
        </div>
        </body>
        </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new functions.https.HttpsError("internal", "Email send failed");
  }
});
