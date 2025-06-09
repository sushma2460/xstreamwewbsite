import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema, insertJobApplicationSchema, insertJobPostingSchema, adminLoginSchema, verifyOtpSchema, type AdminLogin, type VerifyOtp } from "@shared/schema";
import { sendOTPEmail, generateOTP } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const submission = insertContactSubmissionSchema.parse(req.body);
      const created = await storage.createContactSubmission(submission);
      res.json({ success: true, id: created.id });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(400).json({ error: "Invalid form data" });
    }
  });

  // Get contact submissions (for admin)
  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Create job posting (for admin)
  app.post("/api/jobs", async (req, res) => {
    try {
      const posting = insertJobPostingSchema.parse(req.body);
      const created = await storage.createJobPosting(posting);
      res.json({ success: true, id: created.id });
    } catch (error) {
      console.error("Job posting error:", error);
      res.status(400).json({ error: "Invalid job posting data" });
    }
  });

  // Get job postings
  app.get("/api/jobs", async (req, res) => {
    try {
      const postings = await storage.getJobPostings();
      res.json(postings);
    } catch (error) {
      console.error("Error fetching job postings:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get active job postings (for career page)
  app.get("/api/jobs/active", async (req, res) => {
    try {
      const postings = await storage.getActiveJobPostings();
      res.json(postings);
    } catch (error) {
      console.error("Error fetching active job postings:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Job application submission
  app.post("/api/jobs/apply", async (req, res) => {
    try {
      const application = insertJobApplicationSchema.parse(req.body);
      const created = await storage.createJobApplication(application);
      res.json({ success: true, id: created.id });
    } catch (error) {
      console.error("Job application error:", error);
      res.status(400).json({ error: "Invalid application data" });
    }
  });

  // Get job applications (for admin)
  app.get("/api/jobs/applications", async (req, res) => {
    try {
      const applications = await storage.getJobApplications();
      res.json(applications);
    } catch (error) {
      console.error("Error fetching job applications:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Admin login - send OTP
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { email, password } = adminLoginSchema.parse(req.body);
      
      // Simple admin credentials check (in production, use proper authentication)
      if (email !== "admin@xstreamminds.com" || password !== "admin123") {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Clean expired sessions
      await storage.cleanExpiredSessions();

      // Generate OTP and create session
      const otp = generateOTP();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      await storage.createAdminSession({
        email,
        otp,
        isVerified: false,
        expiresAt,
      });

      // Send OTP email
      const emailSent = await sendOTPEmail(email, otp);
      
      if (!emailSent) {
        return res.status(500).json({ message: "Failed to send OTP email" });
      }

      res.json({ message: "OTP sent to your email", email });
    } catch (error) {
      console.error("Error in admin login:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Verify OTP
  app.post("/api/admin/verify-otp", async (req, res) => {
    try {
      const { email, otp } = verifyOtpSchema.parse(req.body);
      
      const verified = await storage.verifyAdminSession(email, otp);
      
      if (!verified) {
        return res.status(401).json({ message: "Invalid or expired OTP" });
      }

      res.json({ message: "Login successful", authenticated: true });
    } catch (error) {
      console.error("Error verifying OTP:", error);
      res.status(500).json({ message: "OTP verification failed" });
    }
  });

  // Delete job posting
  app.delete("/api/admin/job-postings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteJobPosting(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Job posting not found" });
      }

      res.json({ message: "Job posting deleted successfully" });
    } catch (error) {
      console.error("Error deleting job posting:", error);
      res.status(500).json({ message: "Failed to delete job posting" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
