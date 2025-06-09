import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-gray-900 to-black">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.h1
          variants={fadeInUp}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Accelerate Your{" "}
          <span className="text-primary">Digital Transformation</span> with
          Real-Time Data Solutions
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto"
        >
          Harness the power of Apache Kafka, Flink, AI/ML, and more to drive
          innovation and streamline your business.
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/services">
            <Button className="cta-button text-lg px-8 py-4">
              Explore Our Services
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white text-lg px-8 py-4"
            >
              Contact Us
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
