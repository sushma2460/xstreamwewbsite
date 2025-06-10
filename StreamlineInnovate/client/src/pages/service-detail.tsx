import { useRoute } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle } from "lucide-react";
import { fadeInUp, fadeInLeft, fadeInRight } from "@/lib/animations";
import fivetran from "../components/fivetran.png" // Update the path to your full stack icon image
import full from "../components/full.png"; // Update the path to your full stack icon image
import kafka from "../components/kafka.png"; // Update the path to your kafka icon image


const serviceData = {
  "apache-kafka": {
    icon: <img src={kafka} alt="Kafka Icon" className="w-20 h-20 mx-auto my-auto block" />,
    title: "Apache Kafka",
    tagline: "The backbone for building real-time streaming data pipelines and applications, Apache Kafka enables seamless data flow across systems. It’s designed for high-throughput, fault-tolerant messaging, making it ideal for modern, data-driven architectures.",
    overview: "Apache Kafka is the backbone for building real-time streaming data pipelines and applications. It provides a highly scalable, fault-tolerant, and low-latency platform for handling large volumes of data with high throughput. Kafka’s distributed architecture ensures reliable message delivery and seamless data integration across diverse systems, making it ideal for critical business processes such as event sourcing, log aggregation, real-time analytics, and stream processing. By enabling organizations to process and react to data instantly, Kafka helps unlock new opportunities for innovation, operational efficiency, and enhanced customer experiences in today’s data-driven world.",
    benefits: [
      "Handle millions of messages per second with minimal latency",
      "Support event-driven architectures and microservices",
      "Ensure high availability and durability",
    ],
    useCases: [
      { title: "Fraud Detection", description: "Real-time fraud detection in banking and financial services" },
      { title: "Real-time Analytics", description: "Live analytics dashboards for e-commerce platforms" },
      { title: "Monitoring Systems", description: "System monitoring and alerting infrastructure" },
      { title: "Event Sourcing", description: "Event-driven microservices architecture" },
    ],
  },
  "apache-flink": {
    icon: "⚡",
    title: "Apache Flink",
    tagline: "Lightning-fast stream processing with advanced analytics capabilities, Apache Flink enables real-time data computation at scale. It's built for high-performance, low-latency processing, making it ideal for complex event-driven applications and insightful analytics.",
    overview: "Apache Flink empowers businesses to continuously process and analyze streaming data in real time. Its fast, accurate, and scalable event-driven processing capabilities support complex analytics and stateful computations, enabling organizations to derive actionable insights instantly. Flink’s ability to handle high-throughput, low-latency data streams makes it ideal for use cases such as fraud detection, monitoring, and dynamic pricing, helping businesses respond proactively to changing conditions.",
    benefits: [
      "Real-time stream processing with exactly-once semantics",
      "Seamless integration with Apache Kafka and other platforms",
      "Rich APIs for batch and stream data processing",
    ],
    useCases: [
      { title: "Recommendation Engines", description: "Real-time personalized recommendations" },
      { title: "IoT Data Processing", description: "Monitoring and analyzing IoT sensor data" },
      { title: "Dynamic Pricing", description: "Real-time pricing and risk management" },
      { title: "Complex Analytics", description: "Advanced stream analytics and CEP" },
    ],
  },
  "confluent-cloud": {
    icon: "☁️",
    title: "Confluent Cloud",
    tagline: "A fully managed, cloud-native Apache Kafka service, Confluent Cloud takes the complexity out of managing Kafka infrastructure. It offers seamless scalability, enterprise-grade security, and real-time data streaming, so you can focus on building powerful, event-driven applications.",
    overview: "Confluent Cloud offers a fully managed, cloud-native Apache Kafka service designed to simplify the deployment, scaling, and maintenance of streaming data platforms. By offloading infrastructure management, it allows businesses to focus on building event-driven applications without worrying about operational overhead. Confluent Cloud ensures high availability, security, and seamless integration with cloud ecosystems, enabling faster innovation and more reliable real-time data pipelines.",
    benefits: [
      "Easy Kafka deployment without infrastructure overhead",
      "Enterprise-grade security and compliance",
      "Automatic scaling and updates",
    ],
    useCases: [
      { title: "Cloud Migration", description: "Seamless Kafka workload migration to cloud" },
      { title: "Global Data Sync", description: "Multi-region data synchronization" },
      { title: "Customer Engagement", description: "Real-time customer engagement platforms" },
      { title: "Event Streaming", description: "Enterprise event streaming platforms" },
    ],
  },
  "full-stack-development": {
    icon: <img src={full} alt="Full Stack Icon" className="w-16 h-16 mx-auto my-auto block" />,
    title: "Full Stack Development",
    tagline: "End-to-end software solutions built with modern technologies across front-end and back-end. Our full stack expertise ensures seamless integration, responsive design, and scalable architecture tailored to meet your business needs from concept to deployment.",
    overview: "We specialize in developing scalable and maintainable web and mobile applications by leveraging modern front-end frameworks and robust back-end technologies. Our approach ensures responsive user experiences, efficient performance, and seamless integration with various APIs and services. Whether building customer-facing apps or enterprise solutions, we focus on clean architecture and best practices to deliver products that grow with your business needs.",
    benefits: [
      "UI/UX design and development",
      "API design and integration",
      "DevOps and deployment pipelines",
    ],
    useCases: [
      { title: "Retail & E-commerce", description: "Modern e-commerce platforms and retail solutions" },
      { title: "Finance & Banking", description: "Secure financial applications and fintech solutions" },
      { title: "Healthcare", description: "Healthcare management and telemedicine platforms" },
      { title: "Logistics", description: "Supply chain and logistics management systems" },
    ],
  },
  "fivetran": {
    icon: <img src={fivetran} alt="Fivetran Icon" className="w-16 h-16 mx-auto my-auto block" />,
    title: "Fivetran",
    tagline: "Automated data integration with seamless connectors, Fivetran enables reliable, low-maintenance data pipelines. It simplifies data movement across sources and destinations, ensuring analytics-ready data with minimal engineering effort.",
    overview: "Fivetran automates data integration by providing reliable, real-time replication of data from a wide range of sources into your data warehouse or data lake. Its fully managed connectors simplify complex ETL processes, ensuring data accuracy and consistency without the need for manual intervention. By streamlining data pipelines, Fivetran enables organizations to accelerate analytics and decision-making with up-to-date, trusted data.",
    benefits: [
      "Over 150 pre-built connectors for all major data sources",
      "Fully managed pipelines with auto schema migrations",
      "Reduce engineering overhead and speed up analytics readiness",
    ],
    useCases: [
      { title: "Marketing Analytics", description: "Unified marketing performance dashboards" },
      { title: "Sales Reporting", description: "Real-time sales performance analysis" },
      { title: "Financial Consolidation", description: "Automated financial data aggregation" },
      { title: "Data Warehousing", description: "Modern data warehouse population" },
    ],
  },
  "ai-ml": {
    icon: "🧠",
    title: "AI / Machine Learning",
    tagline: "Leverage AI and Machine Learning to deliver smart solutions for predictive analytics and automation. These technologies help forecast trends, optimize processes, and improve efficiency, enabling better decision-making and reducing costs.",
    overview: "Our AI and Machine Learning services help businesses unlock valuable insights from their data, automate routine tasks, and build predictive models that drive smarter, data-driven decisions. By combining advanced algorithms with domain expertise, we create tailored solutions for forecasting, classification, anomaly detection, and process optimization, empowering organizations to enhance efficiency, reduce costs, and innovate continuously.",
    benefits: [
      "Custom ML model development",
      "Natural language processing",
      "Computer vision and image recognition",
      "AI-powered chatbots and automation",
    ],
    useCases: [
      { title: "Churn Prediction", description: "Predict and prevent customer churn" },
      { title: "Document Processing", description: "Intelligent document analysis and extraction" },
      { title: "Quality Control", description: "Automated quality control in manufacturing" },
      { title: "Recommendation Systems", description: "Personalized product recommendations" },
    ],
  },
};

export default function ServiceDetail() {
  const [match, params] = useRoute("/services/:slug");
  
  if (!match || !params?.slug) {
    return <div>Service not found</div>;
  }

  const service = serviceData[params.slug as keyof typeof serviceData];
  
  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <div className="pt-32 pb-20">
      {/* Service Hero */}
      <div className="bg-gradient-to-r from-secondary to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl mb-8"
          >
            {service.icon}
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            {service.title}
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            {service.tagline}
          </motion.p>
        </div>
      </div>

      {/* Service Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {/* Overview */}
            <motion.div
              variants={fadeInLeft}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg mb-8"
            >
              <h2 className="text-3xl font-bold text-secondary mb-6">Overview</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {service.overview}
              </p>
            </motion.div>

            {/* Benefits */}
            <motion.div
              variants={fadeInLeft}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg mb-8"
            >
              <h2 className="text-3xl font-bold text-secondary mb-6">Benefits</h2>
              <ul className="space-y-4">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="text-primary h-6 w-6 mr-4 mt-1 flex-shrink-0" />
                    <span className="text-gray-600 text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Use Cases */}
            <motion.div
              variants={fadeInLeft}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <h2 className="text-3xl font-bold text-secondary mb-6">Use Cases</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {service.useCases.map((useCase, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-bold text-secondary mb-2">{useCase.title}</h3>
                    <p className="text-gray-600">{useCase.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sticky CTA Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              variants={fadeInRight}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="sticky top-32"
            >
              <div className="bg-primary p-8 rounded-xl text-white">
                <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                <p className="mb-6">
                  Have questions or want a tailored solution for your business?
                </p>
                <Link href="/contact">
                  <Button className="bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold w-full">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
