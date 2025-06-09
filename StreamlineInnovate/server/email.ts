import nodemailer from 'nodemailer';

// Create transporter with Gmail (you can change this to your preferred email service)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

export async function sendOTPEmail(email: string, otp: string): Promise<boolean> {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: email,
      subject: 'Xstream Minds Admin Login - OTP Verification',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #FF6B35 0%, #F54D26 100%); padding: 40px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Xstream Minds</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Admin Login Verification</p>
          </div>
          
          <div style="padding: 40px; background: white;">
            <h2 style="color: #333; margin-bottom: 20px;">Your OTP Code</h2>
            <p style="color: #666; font-size: 16px; line-height: 1.5; margin-bottom: 30px;">
              Someone is trying to access the admin dashboard. If this was you, please use the following OTP code to complete your login:
            </p>
            
            <div style="background: #f8f9fa; border: 2px dashed #FF6B35; border-radius: 8px; padding: 30px; text-align: center; margin: 30px 0;">
              <div style="font-size: 32px; font-weight: bold; color: #FF6B35; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                ${otp}
              </div>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-bottom: 20px;">
              <strong>Important:</strong> This OTP will expire in 10 minutes for security reasons.
            </p>
            
            <p style="color: #999; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              If you didn't request this login, please ignore this email. Your account remains secure.
            </p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; text-align: center;">
            <p style="color: #999; font-size: 12px; margin: 0;">
              © 2024 Xstream Minds. All rights reserved.
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending OTP email:', error);
    return false;
  }
}

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}