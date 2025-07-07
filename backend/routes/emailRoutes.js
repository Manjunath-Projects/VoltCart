import express from "express";
import nodemailer from "nodemailer";
import Email from "../models/Email.js";
import fs from "fs";
import path from "path";
import { getSubscribers } from "../controllers/orderController.js";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();
const htmlTemplatePath = path.join(__dirname, 'usermail.html');
const htmlToSend = fs.readFileSync(htmlTemplatePath, 'utf8');
// const Recipients = ['']

router.post("/subscribers", getSubscribers);

router.post("/sendemail", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const existingEmail = await Email.findOne({ email });
    if (!existingEmail) {
      const savedEmail = new Email({ email });
      await savedEmail.save();
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, 
      },
    });

    const mailOptions = {
      from: `"RajFits Cloth Store" <${process.env.EMAIL_USER}>`,
      to: email,// Recipients
      subject: "🎁 Thanks for Subscribing to RajFits!",
      text: "Welcome to our Clothing Store! Here is your special offer.",
      html: htmlToSend,
    };

    await transporter.sendMail(mailOptions);
res.status(200).json({ success: true, message: "Subscribed successfully. Check Email for Coupon" });
    console.log(`Subscription email sent successfully`);
  } catch (error) {
    console.error("Error sending email:", error);
res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

export default router;