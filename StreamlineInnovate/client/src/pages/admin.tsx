import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Briefcase, Users, Mail, Plus, Calendar, MapPin, Clock, Trash2, Shield, Eye, EyeOff } from "lucide-react";
import { insertJobPostingSchema, adminLoginSchema, verifyOtpSchema } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { InsertJobPosting, JobPosting, JobApplication, ContactSubmission, AdminLogin, VerifyOtp } from "@shared/schema";

export default function Admin() {
  const { toast } = useToast();
  const [showJobForm, setShowJobForm] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<InsertJobPosting>({
    resolver: zodResolver(insertJobPostingSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      type: "",
      experience: "",
      isActive: true,
    },
  });

  // Fetch job postings
  const { data: jobPostings = [], isLoading: jobsLoading } = useQuery<JobPosting[]>({
    queryKey: ["/api/jobs"],
  });

  // Fetch job applications
  const { data: jobApplications = [], isLoading: applicationsLoading } = useQuery<JobApplication[]>({
    queryKey: ["/api/jobs/applications"],
  });

  // Fetch contact submissions
  const { data: contactSubmissions = [], isLoading: contactLoading } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/contact"],
  });

  const createJobMutation = useMutation({
    mutationFn: async (data: InsertJobPosting) => {
      const response = await apiRequest("POST", "/api/jobs", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Job Posted!",
        description: "The job posting has been created successfully.",
      });
      form.reset();
      setShowJobForm(false);
      queryClient.invalidateQueries({ queryKey: ["/api/jobs"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create job posting. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertJobPosting) => {
    createJobMutation.mutate(data);
  };

  return (
    <div className="pt-32 pb-20 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="mb-8"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl font-bold text-secondary mb-4"
          >
            Admin Dashboard
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-600"
          >
            Manage job postings, view applications, and contact submissions.
          </motion.p>
        </motion.div>

        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="jobs" className="flex items-center gap-2">
              <Briefcase size={16} />
              Job Management
            </TabsTrigger>
            <TabsTrigger value="applications" className="flex items-center gap-2">
              <Users size={16} />
              Applications ({jobApplications.length})
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <Mail size={16} />
              Contact Forms ({contactSubmissions.length})
            </TabsTrigger>
          </TabsList>

          {/* Job Management Tab */}
          <TabsContent value="jobs" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-secondary">Job Postings</h2>
              <Button
                onClick={() => setShowJobForm(!showJobForm)}
                className="cta-button flex items-center gap-2"
              >
                <Plus size={16} />
                Post New Job
              </Button>
            </div>

            {showJobForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-4">Create New Job Posting</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Title *</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="e.g. Software Engineer" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location *</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="e.g. Remote, New York" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Type *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select job type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Full-time">Full-time</SelectItem>
                                <SelectItem value="Part-time">Part-time</SelectItem>
                                <SelectItem value="Contract">Contract</SelectItem>
                                <SelectItem value="Internship">Internship</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="experience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Experience Required *</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="e.g. 2+ years exp" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Description *</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={4}
                              placeholder="Describe the role, responsibilities, and requirements..."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-4">
                      <Button
                        type="submit"
                        className="cta-button"
                        disabled={createJobMutation.isPending}
                      >
                        {createJobMutation.isPending ? "Creating..." : "Post Job"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowJobForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Form>
              </motion.div>
            )}

            {jobsLoading ? (
              <div className="text-center py-8">Loading job postings...</div>
            ) : (
              <div className="grid gap-4">
                {jobPostings.map((job) => (
                  <Card key={job.id} className="border-l-4 border-primary">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-secondary mb-2">{job.title}</h3>
                          <p className="text-gray-600 mb-4">{job.description}</p>
                          <div className="flex flex-wrap gap-2 mb-2">
                            <Badge variant="outline" className="flex items-center gap-1">
                              <MapPin size={12} />
                              {job.location}
                            </Badge>
                            <Badge variant="outline">{job.type}</Badge>
                            <Badge variant="outline">{job.experience}</Badge>
                          </div>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Calendar size={12} />
                            Posted: {new Date(job.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={job.isActive ? "default" : "secondary"}>
                            {job.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <h2 className="text-2xl font-semibold text-secondary">Job Applications</h2>
            {applicationsLoading ? (
              <div className="text-center py-8">Loading applications...</div>
            ) : jobApplications.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-500">No job applications yet.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {jobApplications.map((application) => (
                  <Card key={application.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-secondary">
                            {application.firstName} {application.lastName}
                          </h3>
                          <p className="text-gray-600">{application.email}</p>
                          {application.phone && (
                            <p className="text-gray-600">{application.phone}</p>
                          )}
                        </div>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock size={12} />
                          {new Date(application.createdAt).toLocaleDateString()}
                        </Badge>
                      </div>
                      {application.coverLetter && (
                        <div className="mb-4">
                          <h4 className="font-medium text-secondary mb-2">Cover Letter:</h4>
                          <p className="text-gray-600 bg-gray-50 p-3 rounded">
                            {application.coverLetter}
                          </p>
                        </div>
                      )}
                      {application.resumeUrl && (
                        <div>
                          <a
                            href={application.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            View Resume →
                          </a>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Contact Forms Tab */}
          <TabsContent value="contacts" className="space-y-6">
            <h2 className="text-2xl font-semibold text-secondary">Contact Form Submissions</h2>
            {contactLoading ? (
              <div className="text-center py-8">Loading contact submissions...</div>
            ) : contactSubmissions.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <Mail className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-500">No contact submissions yet.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {contactSubmissions.map((submission) => (
                  <Card key={submission.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-secondary">
                            {submission.firstName} {submission.lastName}
                          </h3>
                          <p className="text-gray-600">{submission.email}</p>
                          {submission.company && (
                            <p className="text-gray-600">Company: {submission.company}</p>
                          )}
                          {submission.service && (
                            <Badge variant="outline" className="mt-2">
                              {submission.service}
                            </Badge>
                          )}
                        </div>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock size={12} />
                          {new Date(submission.createdAt).toLocaleDateString()}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="font-medium text-secondary mb-2">Message:</h4>
                        <p className="text-gray-600 bg-gray-50 p-3 rounded">
                          {submission.message}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}