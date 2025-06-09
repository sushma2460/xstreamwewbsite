import { motion } from "framer-motion";
import { Lightbulb, Handshake, Award, Target,LightbulbIcon } from "lucide-react";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from "@/lib/animations";
import mission from "../pages/mission.png";
import vision from "../pages/vision.png";

export default function About() {
  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We stay at the forefront of technology, constantly exploring new ways to solve complex business challenges.",
    },
    {
      icon: Handshake,
      title: "Partnership",
      description: "We build long-term relationships with our clients, becoming trusted partners in their digital transformation journey.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We deliver exceptional quality in every project, ensuring our solutions exceed expectations and drive real business value.",
    },
  ];

  const stats = [
    { value: "50+", label: "Projects Delivered" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "24/7", label: "Support Available" },
    { value: "5+", label: "Years Experience" },
  ];

  return (
    <div className="pt-32 pb-20">
      {/* About Hero */}
      <div className="bg-gradient-to-r from-secondary to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            About Xstream Minds
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            

We empower digital transformation by harnessing the power of real-time data streaming, cloud solutions, and AI technologies. Our mission is to help businesses innovate faster, operate smarter, and stay ahead in a rapidly evolving digital world.
          </motion.p>
        </div>
      </div>

      {/* About Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Mission */}
        {/* Mission */}
<div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
  <motion.div
    variants={fadeInLeft}
    initial="initial"
    whileInView="animate"
    viewport={{ once: true }}
  >
    <h2 className="text-4xl font-bold text-secondary mb-6">Our Mission</h2>
    <p className="text-lg text-gray-600 leading-relaxed mb-6">
      At Xstream Minds, we enable digital transformation through cutting-edge data streaming, cloud, and AI technologies. We empower businesses to become more agile, data-driven, and innovative.
    </p>
    <p className="text-lg text-gray-600 leading-relaxed">
      Our team of passionate technologists, developers, and strategists is dedicated to solving complex problems with elegant solutions.
    </p>
  </motion.div>

  <motion.div
    variants={fadeInRight}
    initial="initial"
    whileInView="animate"
    viewport={{ once: true }}
    className="bg-gray-100 rounded-xl h-96 flex items-center justify-center"
  >
    <div className="text-center">
      <img
        src={mission}
        alt="Mission Icon"
        className="w-32 h-32 object-contain mb-4 mx-auto "
      />
      <p className="text-gray-600">Our Mission</p>
    </div>
  </motion.div>
</div>

        {/* Vision */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            variants={fadeInLeft}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="bg-gray-100 rounded-xl h-96 flex items-center justify-center order-2 lg:order-1"
          >
            <div className="text-center">
             <img
        src={vision}
        alt="Vision Icon"
        className="w-32 h-32 object-contain mb-4 mx-auto"
      />

              <p className="text-gray-600">Excellence in Innovation</p>
            </div>
          </motion.div>
          <motion.div
            variants={fadeInRight}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-4xl font-bold text-secondary mb-6">Our Vision</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              To be a global leader in real-time data solutions and AI-driven innovation, helping organizations worldwide harness the power of data to create competitive advantages.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We envision a future where every business decision is informed by real-time insights and intelligent automation.
            </p>
          </motion.div>
        </div>

        {/* Team Section */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl font-bold text-secondary mb-6"
          >
            Our Team
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-500 max-w-3xl mx-auto"
          >
            A passionate group of technologists, developers, and strategists dedicated to solving complex problems with elegant solutions.
          </motion.p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-8 bg-white rounded-xl shadow-lg"
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <value.icon className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-secondary mb-4">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Why Clients Trust Us */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="bg-gray-100 p-12 rounded-2xl"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-secondary mb-6">Why Clients Trust Xstream Minds</h2>
            <p className="text-xl text-gray-500">
              We deliver results that matter to your business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
