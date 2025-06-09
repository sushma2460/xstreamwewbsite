import { motion } from "framer-motion";
import HeroSection from "@/components/hero-section";
import ServiceCard from "@/components/service-card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Activity,
  Zap,
  Cloud,
  Code,
  Database,
  Brain,
  Settings,
  Users,
  Rocket,
  Shield,
} from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const services = [
  {
    icon: Activity,
    title: "Apache Kafka",
    description:
      "Build scalable, fault-tolerant real-time data streaming applications to power your business with reliable event-driven architectures.",
    slug: "apache-kafka",
  },
  {
    icon: Zap,
    title: "Apache Flink",
    description:
      "Process data streams at lightning speed with Flink's advanced analytics and event processing capabilities for mission-critical applications.",
    slug: "apache-flink",
  },
  {
    icon: Cloud,
    title: "Confluent Cloud",
    description:
      "Simplify your Kafka deployments with Confluent's fully managed cloud platform—bringing reliability, scalability, and security.",
    slug: "confluent-cloud",
  },
  {
    icon: Code,
    title: "Full Stack Development",
    description:
      "Deliver end-to-end software solutions with modern front-end and back-end technologies tailored to your business needs.",
    slug: "full-stack-development",
  },
  {
    icon: Database,
    title: "Fivetran",
    description:
      "Automate your data pipelines effortlessly with Fivetran's seamless connectors, ensuring up-to-date data for accurate insights.",
    slug: "fivetran",
  },
  {
    icon: Brain,
    title: "AI / Machine Learning",
    description:
      "Leverage intelligent AI and machine learning models to predict trends, automate processes, and empower smarter decisions.",
    slug: "ai-ml",
  },
];

const whyChooseUs = [
  {
    icon: Settings,
    title: "Deep Expertise",
    description: "Real-time streaming and cloud technologies",
  },
  {
    icon: Users,
    title: "Customized Solutions",
    description: "Full stack development aligned with your goals",
  },
  {
    icon: Rocket,
    title: "Cutting-Edge AI",
    description: "Advanced AI and data integration capabilities",
  },
  {
    icon: Shield,
    title: "Proven Success",
    description: "Trusted by enterprises to deliver innovation",
  },
];

export default function Home() {
  return (
    <div>
      <HeroSection />

      {/* Services Preview Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-secondary mb-6"
            >
              Our Core Services
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-500 max-w-3xl mx-auto"
            >
              Cutting-edge technology solutions designed to transform your
              business operations and drive growth.
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
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-secondary mb-6"
            >
              Why Choose Xstream Minds
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-500 max-w-3xl mx-auto"
            >
              Trusted by enterprises worldwide to deliver scalable and
              innovative solutions.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <item.icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-500">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Ready to Transform Your Business?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-300 mb-8"
            >
              Let's discuss how our real-time data solutions can accelerate your
              digital transformation.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link href="/contact">
                <Button className="cta-button text-lg px-8 py-4">
                  Start Your Journey
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
