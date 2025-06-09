import { users, contactSubmissions, jobApplications, jobPostings, adminSessions, type User, type InsertUser, type ContactSubmission, type InsertContactSubmission, type JobApplication, type InsertJobApplication, type JobPosting, type InsertJobPosting, type AdminSession, type InsertAdminSession } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  createJobPosting(posting: InsertJobPosting): Promise<JobPosting>;
  getJobPostings(): Promise<JobPosting[]>;
  getActiveJobPostings(): Promise<JobPosting[]>;
  deleteJobPosting(id: number): Promise<boolean>;
  createJobApplication(application: InsertJobApplication): Promise<JobApplication>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  getJobApplications(): Promise<JobApplication[]>;
  createAdminSession(session: InsertAdminSession): Promise<AdminSession>;
  getAdminSession(email: string, otp: string): Promise<AdminSession | undefined>;
  verifyAdminSession(email: string, otp: string): Promise<boolean>;
  cleanExpiredSessions(): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private jobApplications: Map<number, JobApplication>;
  private jobPostings: Map<number, JobPosting>;
  private adminSessions: Map<number, AdminSession>;
  private currentUserId: number;
  private currentContactId: number;
  private currentJobId: number;
  private currentJobPostingId: number;
  private currentSessionId: number;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    this.jobApplications = new Map();
    this.jobPostings = new Map();
    this.adminSessions = new Map();
    this.currentUserId = 1;
    this.currentContactId = 1;
    this.currentJobId = 1;
    this.currentJobPostingId = 1;
    this.currentSessionId = 1;

    // Initialize with some job postings
    this.initializeJobPostings();
  }

  private initializeJobPostings() {
    // Add initial job postings directly to the map
    const jobs = [
      {
        id: this.currentJobPostingId++,
        title: "Sales Specialist",
        description: "Drive business growth by building relationships with enterprise clients and presenting our technical solutions.",
        location: "Remote",
        type: "Full-time",
        experience: "3+ years exp",
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: this.currentJobPostingId++,
        title: "Software Engineer (Full Stack)",
        description: "Develop modern web applications using React, Node.js, and cloud technologies in an agile environment.",
        location: "Hybrid",
        type: "Full-time", 
        experience: "2+ years exp",
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: this.currentJobPostingId++,
        title: "Data Analyst",
        description: "Analyze complex datasets, create insights, and work with data streaming technologies to support business decisions.",
        location: "Remote",
        type: "Full-time",
        experience: "1+ years exp", 
        isActive: true,
        createdAt: new Date(),
      }
    ];

    jobs.forEach(job => this.jobPostings.set(job.id, job));
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.currentContactId++;
    const contactSubmission: ContactSubmission = {
      ...submission,
      company: submission.company || null,
      service: submission.service || null,
      id,
      createdAt: new Date(),
    };
    this.contactSubmissions.set(id, contactSubmission);
    return contactSubmission;
  }

  async createJobPosting(posting: InsertJobPosting): Promise<JobPosting> {
    const id = this.currentJobPostingId++;
    const jobPosting: JobPosting = {
      ...posting,
      isActive: posting.isActive ?? true,
      id,
      createdAt: new Date(),
    };
    this.jobPostings.set(id, jobPosting);
    return jobPosting;
  }

  async getJobPostings(): Promise<JobPosting[]> {
    return Array.from(this.jobPostings.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getActiveJobPostings(): Promise<JobPosting[]> {
    return Array.from(this.jobPostings.values())
      .filter(posting => posting.isActive)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createJobApplication(application: InsertJobApplication): Promise<JobApplication> {
    const id = this.currentJobId++;
    const jobApplication: JobApplication = {
      ...application,
      phone: application.phone || null,
      resumeUrl: application.resumeUrl || null,
      coverLetter: application.coverLetter || null,
      id,
      createdAt: new Date(),
    };
    this.jobApplications.set(id, jobApplication);
    return jobApplication;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getJobApplications(): Promise<JobApplication[]> {
    return Array.from(this.jobApplications.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async deleteJobPosting(id: number): Promise<boolean> {
    return this.jobPostings.delete(id);
  }

  async createAdminSession(session: InsertAdminSession): Promise<AdminSession> {
    const id = this.currentSessionId++;
    const adminSession: AdminSession = {
      ...session,
      id,
      isVerified: session.isVerified || false,
      createdAt: new Date(),
    };
    this.adminSessions.set(id, adminSession);
    return adminSession;
  }

  async getAdminSession(email: string, otp: string): Promise<AdminSession | undefined> {
    return Array.from(this.adminSessions.values()).find(
      session => session.email === email && session.otp === otp && session.expiresAt > new Date()
    );
  }

  async verifyAdminSession(email: string, otp: string): Promise<boolean> {
    const session = await this.getAdminSession(email, otp);
    if (session && !session.isVerified) {
      session.isVerified = true;
      this.adminSessions.set(session.id, session);
      return true;
    }
    return false;
  }

  async cleanExpiredSessions(): Promise<void> {
    const now = new Date();
    const sessions = Array.from(this.adminSessions.entries());
    for (const [id, session] of sessions) {
      if (session.expiresAt <= now) {
        this.adminSessions.delete(id);
      }
    }
  }
}

export const storage = new MemStorage();
