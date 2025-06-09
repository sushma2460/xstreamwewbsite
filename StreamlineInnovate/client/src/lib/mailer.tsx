import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "Gmail", // or use "smtp.mailgun.org", etc.
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // app password or actual password
  },
});

export const sendContactEmail = async (formData: {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  service?: string;
  message: string;
}) => {
  const mailOptions = {
    from: `"Website Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.CONTACT_RECEIVER, // your receiving email
    subject: "New Contact Form Submission",
    html: `
      <h3>New Message from ${formData.firstName} ${formData.lastName}</h3>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Company:</strong> ${formData.company || "N/A"}</p>
      <p><strong>Service:</strong> ${formData.service || "N/A"}</p>
      <p><strong>Message:</strong><br/>${formData.message}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
