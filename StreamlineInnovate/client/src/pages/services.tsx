import { motion } from "framer-motion";
import ServiceCard from "@/components/service-card";
import {
  Activity,
  Zap,
  Cloud,
  Code,
  Database,
  Brain,
} from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const services = [
  {
    icon: Activity,
    title: "Apache Kafka",
    description:
      "Build scalable, fault-tolerant real-time data streaming applications. Handle millions of messages per second with minimal latency.",
    slug: "apache-kafka",
  },
  {
    icon: Zap,
    title: "Apache Flink",
    description:
      "Process data streams at lightning speed with advanced analytics and event processing capabilities for mission-critical applications.",
    slug: "apache-flink",
  },
  {
    icon: Cloud,
    title: "Confluent Cloud",
    description:
      "Fully managed cloud platform that simplifies Kafka deployments with enterprise-grade security and automatic scaling.",
    slug: "confluent-cloud",
  },
  {
    icon: Code,
    title: "Full Stack Development",
    description:
      "End-to-end software solutions with modern front-end and back-end technologies tailored to your business requirements.",
    slug: "full-stack-development",
  },
  {
    icon: Database,
    title: "Fivetran",
    description:
      "Automated data integration with over 150 pre-built connectors and fully managed pipelines with auto schema migrations.",
    slug: "fivetran",
  },
  {
    icon: Brain,
    title: "AI / Machine Learning",
    description:
      "Custom ML models, natural language processing, computer vision, and AI-powered automation solutions.",
    slug: "ai-ml",
  },
];

export default function Services() {
  return (
    <div className="pt-32 pb-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="text-center mb-16"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-secondary mb-6"
          >
            Our Services
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-500 max-w-3xl mx-auto"
          >
            Comprehensive technology solutions to power your digital
            transformation journey.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.slug}
              {...service}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
