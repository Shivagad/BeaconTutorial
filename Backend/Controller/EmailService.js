import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Handlebars from "handlebars";
import * as dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sendOTPEmail = async (req, res) => {
    // console.log(req.body);
    const { name, email, otp } = req.body;
    const templatePath = path.join(__dirname, "../views", 'SignupOTP.hbs');
    const templateSource = fs.readFileSync(templatePath, "utf-8");
    const template = Handlebars.compile(templateSource);
    let htmlContent = template({ name, email, otp });

    const mailOptions = {
        from: `Beacon Tutorial <${process.env.MAIL_USER}>`,
        to: email,
        subject: "Your OTP Verification Code",
        html: htmlContent,
    };
    try {
        await transporter.sendMail(mailOptions);
        // console.log("OTP email sent successfully.");
        res.status(200).json({success:true, message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending OTP email:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
};

export const sendSignUpSuccessfulEmail = async (req, res) => {
    // console.log(req.body);
    const { name, email } = req.body;
    const templatePath = path.join(__dirname, "../views", 'SignupSuccess.hbs');
    const templateSource = fs.readFileSync(templatePath, "utf-8");
    const template = Handlebars.compile(templateSource);
    let htmlContent = template({ name });

    const mailOptions = {
        from: `Beacon Tutorials <${process.env.MAIL_USER}>`,
        to: email,
        subject: "Welcome to Our Platform",
        html: htmlContent,
    };

    try {
        await transporter.sendMail(mailOptions);
        // console.log("OTP email sent successfully.");
        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending OTP email:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
};



export const sendScholarregSuccessfull = async (req, res) => {
    // console.log(req.body);
    const { firstName, lastName, email } = req.body;
    const templatePath = path.join(__dirname, "../views", 'ScholarshipregSuccess.hbs');
    const templateSource = fs.readFileSync(templatePath, "utf-8");
    const template = Handlebars.compile(templateSource);
    let htmlContent = template({ firstName, lastName });

    const mailOptions = {
        from: `Beacon Tutorial <${process.env.MAIL_USER}>`,
        to: email,
        subject: "Congratulation you have Successfully Register For Beacon Tutorial Scholarship Test",
        html: htmlContent,
    };

    try {
        await transporter.sendMail(mailOptions);
        // // console.log("OTP email sent successfully.");
        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        // console.error("Error sending OTP email:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
};

export const sendInquiryForm = async (inquiryData, toEmail) => {    
    const templatePath = path.join(__dirname, "../views", 'InquiryFormSuccess.hbs');
    const templateSource = fs.readFileSync(templatePath, "utf-8");
    const template = Handlebars.compile(templateSource);
    let htmlContent = template({ inquiryData });

    const mailOptions = {
        from: `Beacon Tutorial <${process.env.MAIL_USER}>`,
        to: toEmail,
        subject: inquiryData.subject,
        html: htmlContent,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};




export const ContactUsEmail = async (req, res) => {
    try {
      const { name, phone, email, subject } = req.body;
      // console.log(req.body);

      if (!name || !phone || !email || !subject) {
        return res.status(400).json({ message: "All fields are required." });
      }

      const templatePath = path.join(__dirname, "../views", "ContactUsEmail.hbs");
      const templateSource = fs.readFileSync(templatePath, "utf-8");
      const template = Handlebars.compile(templateSource);
      
      const htmlContent = template({ name, phone, email, subject });

      const mailOptions = {
        from: `Beacon Tutorials <${process.env.MAIL_USER}>`,  // Your authenticated email
        to: process.env.MAIL_USER,  // Admin email
        subject: `New Inquiry from ${name}`,  // Make it clear for the admin
        html: htmlContent,
      };
      // console.log(mailOptions);
      await transporter.sendMail(mailOptions);
      // console.log("Contact email sent successfully.");
      res.status(200).json({ message: "Email sent successfully", success: true });
    } catch (error) {
      console.error("Error sending Contact Us email:", error);
      res.status(500).json({ message: "Failed to send email", success: false });
    }
};
