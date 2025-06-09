import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Users, GraduationCap, Rocket, Heart, Home, Book, Calendar, MapPin, Clock } from "lucide-react";
import { insertJobApplicationSchema } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { InsertJobApplication, JobPosting } from "@shared/schema";

export default function Career() {
  const { toast } = useToast();
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [showApplication, setShowApplication] = useState(false);

  const form = useForm<InsertJobApplication>({
    resolver: zodResolver(insertJobApplicationSchema),
    defaultValues: {
      jobPostingId: 0,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      resumeUrl: "",
      coverLetter: "",
    },
  });

  // Fetch active job postings
  const { data: jobs = [], isLoading } = useQuery<JobPosting[]>({
    queryKey: ["/api/jobs/active"],
  });

  const applicationMutation = useMutation({
    mutationFn: async (data: InsertJobApplication) => {
      const response = await apiRequest("POST", "/api/jobs/apply", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted!",
        description: "Thank you for applying. We'll review your application and get back to you soon.",
      });
      form.reset();
      setShowApplication(false);
      setSelectedJob(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const benefits = [
    {
      icon: Users,
      title: "Collaborative Culture",
      description: "Work in an inclusive environment that values diverse perspectives and encourages collaboration.",
    },
    {
      icon: GraduationCap,
      title: "Continuous Learning",
      description: "Access to training programs, conferences, and opportunities to learn cutting-edge technologies.",
    },
    {
      icon: Rocket,
      title: "Innovation Focus",
      description: "Work with the latest technologies like Kafka, Flink, AI/ML, and cloud platforms.",
    },
  ];

  const perks = [
    { icon: Heart, title: "Health Insurance", description: "Comprehensive health coverage" },
    { icon: Home, title: "Flexible Work", description: "Remote and hybrid options" },
    { icon: Book, title: "Learning Budget", description: "Annual education allowance" },
    { icon: Calendar, title: "Paid Time Off", description: "Generous vacation policy" },
  ];

  const handleApply = (job: JobPosting) => {
    setSelectedJob(job);
    form.setValue("jobPostingId", job.id);
    setShowApplication(true);
  };

  const onSubmit = (data: InsertJobApplication) => {
    applicationMutation.mutate(data);
  };

  return (
    <div className="pt-32 pb-20">
      {/* Career Hero */}
      <div className="bg-gradient-to-r from-secondary to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Join Our Team
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Build your career with cutting-edge technologies and make an impact on exciting projects
          </motion.p>
        </div>
      </div>

      {/* Career Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Why Work With Us */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold text-secondary mb-6"
            >
              Why Work With Us?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-500 max-w-3xl mx-auto"
            >
              Join a collaborative environment where innovation thrives and careers flourish.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 bg-white rounded-xl shadow-lg"
              >
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-secondary mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Open Positions */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold text-secondary mb-6"
            >
              Open Positions
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-500"
            >
              Explore exciting opportunities to grow your career with us.
            </motion.p>
          </div>

          {isLoading ? (
            <div className="text-center py-8">Loading job openings...</div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No job openings available at the moment. Please check back later.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {jobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-l-4 border-primary hover:shadow-lg transition-shadow">
                    <CardContent className="p-8">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="mb-4 md:mb-0">
                          <h3 className="text-2xl font-bold text-secondary mb-2">{job.title}</h3>
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
                            <Clock size={12} />
                            Posted: {new Date(job.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Button
                          className="cta-button whitespace-nowrap"
                          onClick={() => handleApply(job)}
                        >
                          Apply Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="bg-gray-100 p-12 rounded-2xl mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-secondary mb-6">Benefits & Perks</h2>
            <p className="text-xl text-gray-500">
              We believe in taking care of our team members.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {perks.map((perk, index) => (
              <motion.div
                key={perk.title}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <perk.icon className="text-white" size={24} />
                </div>
                <h3 className="font-bold text-secondary mb-2">{perk.title}</h3>
                <p className="text-gray-600 text-sm">{perk.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Application Process */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-secondary mb-6">How to Apply</h2>
          <p className="text-xl text-gray-500 mb-8 max-w-3xl mx-auto">
            Ready to join our team? Send your resume and cover letter to careers@xstreamminds.com or use our online application form.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:careers@xstreamminds.com"
              className="cta-button inline-block px-8 py-4 text-lg font-semibold rounded-lg text-center"
            >
              Email Application
            </a>
            <a
              href="mailto:hr@xstreamminds.com"
              className="border-2 border-secondary text-secondary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-secondary hover:text-white transition-all inline-block"
            >
              HR Questions
            </a>
          </div>
        </motion.div>

        {/* Job Application Dialog */}
        <Dialog open={showApplication} onOpenChange={setShowApplication}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                Apply for {selectedJob?.title}
              </DialogTitle>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="resumeUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Resume URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Link to your resume (Google Drive, Dropbox, etc.)" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="coverLetter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cover Letter</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={4}
                          placeholder="Tell us why you're interested in this position..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    className="cta-button flex-1"
                    disabled={applicationMutation.isPending}
                  >
                    {applicationMutation.isPending ? "Submitting..." : "Submit Application"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowApplication(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
